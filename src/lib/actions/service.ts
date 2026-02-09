"use server"

import {ActionResponse, ImportResult, PaginationRequest, Product, ResultList, Service, SortRequest} from '@/types';
import {
    ServiceFormValues,
    ServiceSchema,
    ServicesFilterSchema,
    ServicesFilterValues
} from '@/lib/schemas/service';
import {formatSupabaseFunctionErrors, formatSupabasePostgrestErrors, formatZodErrors} from '@/lib/utils';
import {createClient} from '@/lib/supabase/server';
import {ImportPayloadSchema, ImportPayloadValues} from '@/lib/schemas/product';
import {z} from 'zod';

const constraintMap = {
    'services_business_id_fkey': 'El negocio que desea asociar no existe',
    'idx_services_business_external_unique': 'Ya existe un producto o servicio con el mismo identificador',
};

export async function listServices(params: ServicesFilterValues & PaginationRequest & SortRequest): Promise<ActionResponse<ResultList<Service>>> {
   try{
       const validatedFields = ServicesFilterSchema.safeParse(params);
       
       if (!validatedFields.success) {
           const errors = formatZodErrors(validatedFields.error);
           return { success: false, errors };
       }
       
       const supabase = await createClient();

       const { data: { user } } = await supabase.auth.getUser();
       if (!user) {
           return { success: false, errors: [{ message: 'customErrors.non_logged_user' }] };
       }

       const {
           statusFilters,
           columnId,
           value,
           business_id
       } = validatedFields.data;

       const {
           page,
           limit,
           sorting
       } = params;


        let query = supabase
            .from("services")
            .select('*, images:service_images(*), discount:product_discounts(*)', { count: "exact" })
            .eq('item_type', 'service');
       
       if (!!business_id) {
           query = query.eq('business_id', business_id);
       }
       
       if (!!columnId && !!value) {
           query = query.ilike(columnId, `%${value}%`);
       }
    
        if (statusFilters) {
            const { active, inactive } = statusFilters;
            if (active && !inactive) {
                query = query.eq('is_active', true);
            } else if (inactive && !active) {
                query = query.eq('is_active', false);
            }
        }
       
       sorting?.forEach((sort => {
           query = query.order(sort.id.trim(), { ascending: !sort.desc });
       }))
       
       const from = (page || 0) * limit;
       const to = from + limit - 1;
       query = query.range(from, to);
       
       const { data, count, error } = await query;

       if (error) {
           return { success: false, errors: formatSupabasePostgrestErrors(error, constraintMap) }
       }
       
       const result = {
           data: data || [],
           pagination: {
               currentPage: page || 1,
               itemsPerPage: limit,
               totalItems: count || 0,
           },
       };
       
        return { success: true, data: result };
   } catch (error) {
       console.log('Unexpected error in listServices:', error);
       throw new Error('Error no especificado');
   }
}

export const getServiceById = async<T = Service | Product> (id: string): Promise<T|null> => {
    try {
        const supabase = await createClient();
        
        const { data, error } = await supabase
            .from("services")
            .select("*, images:service_images(*), discount:product_discounts(*)")
            .eq("id", id)
            .single();
        
        if (error) {
            const errors = await formatSupabaseFunctionErrors(error);
            console.error(errors);
            return null;
        }
        return data;
    } catch (error) {
        console.log("Unexpected error in getServiceById:", error);
        throw new Error("customErrors.unspecified_error");
    }
};


export async function createService(input: ServiceFormValues): Promise<ActionResponse<Service>> {
    try {
        const validatedFields = ServiceSchema.safeParse(input);
        
        if (!validatedFields.success) {
            const errors = formatZodErrors(validatedFields.error);
            return { success: false, errors };
        }
        
        const supabase = await createClient();
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
            return { success: false, errors: [{ message: 'Usuario no autenticado o no se pudo obtener el usuario.' }] };
        }
        
        const { data, error } = await supabase
            .from("services")
            .insert({
                name: input.name,
                description: input.description,
                price: input.price,
                price_usd: input.price_usd,
                product_discounts_id: input.product_discounts_id || null,
                sku: input.sku,
                item_type: 'service',
                business_id: user.id,
            })
            .select("*");
        
        if (error) {
            return { success: false, errors: formatSupabasePostgrestErrors(error, constraintMap) }
        }
        return { success: true, data: data?.[0] };
    } catch (error) {
        console.log('Unexpected error in createService:', error);
        throw new Error('Error no especificado');
    }
}

export async function updateService(input: Partial<ServiceFormValues>): Promise<ActionResponse<Service>> {
    try {
        const supabase = await createClient();
    
        if (!input.id) {
            return { success: false, errors: [{ message: 'ID del servicio es requerido para actualizar' }] };
        }
    
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
            return { success: false, errors: [{ message: 'Usuario no autenticado o no se pudo obtener el usuario.' }] };
        }
        const { data, error } = await supabase
            .from("services")
            .update({
                name: input.name,
                description: input.description,
                price: input.price,
                product_discounts_id: input.product_discounts_id || null,
            })
            .eq("id", input.id)
            .select("*");
        
        if (error) {
            return { success: false, errors: formatSupabasePostgrestErrors(error, constraintMap) }
        }
        return { success: true, data: data?.[0] };
    } catch (error) {
        console.log('Unexpected error in updateService:', error);
        throw new Error('Error no especificado');
    }
}

export async function deleteServices(ids: string[]): Promise<ActionResponse<void>> {
    try {
        if (!Array.isArray(ids) || ids.length === 0) {
            return { success: false, errors: [{ message: 'Debe proporcionar al menos un ID para eliminar.' }] };
        }
    
        const supabase = await createClient();
    
        const { error } = await supabase
            .from("services")
            .delete()
            .in("id", ids);
        
        if (error) {
            return { success: false, errors: formatSupabasePostgrestErrors(error, constraintMap) }
        }
        return { success: true };
    } catch (error) {
        console.log('Unexpected error in deleteServices:', error);
        throw new Error('Error no especificado');
    }
}

export const updateStatusService = async (serviceId: string, active: boolean) => {
    try {
        const supabase = await createClient();
        
        if (!serviceId) {
            return { success: false, errors: [{ message: 'ID del servicio es requerido' }] };
        }
        
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
            return { success: false, errors: [{ message: 'Usuario no autenticado o no se pudo obtener el usuario.' }] };
        }
        const { data, error } = await supabase
            .from("services")
            .update({
                is_active: active,
            })
            .eq("id", serviceId)
            .select("*");
        
        if (error) {
            return { success: false, errors: formatSupabasePostgrestErrors(error, constraintMap) }
        }
        return { success: true, data: data?.[0] };
    } catch (error) {
        console.log('Unexpected error in updateStatusService:', error);
        throw new Error('Error no especificado');
    }
}

export async function importServices(payload: ImportPayloadValues): Promise<ImportResult> {
    try {
        const parsed = ImportPayloadSchema.safeParse(payload)
        
        if (!parsed.success) {
            return {
                success: false,
                created: 0,
                updated: 0,
                total: 0,
                // errors: ["Datos inválidos", JSON.stringify(parsed.error.flatten())],
                errors: ["Datos inválidos", JSON.stringify(z.treeifyError(parsed.error))],
            }
        }
        
        const { services } = parsed.data
        const supabase = await createClient();

        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
            return {
                success: false,
                created: 0,
                updated: 0,
                total: 0,
                errors: ['Usuario no autenticado o no se pudo obtener el usuario.']
            };
        }
        
        const withoutExternalId = services.filter(
            (s) => !s.sku || s.sku.trim() === ""
        )
        
        const withExternalId = services.filter(
            (s) => s.sku && s.sku.trim() !== ""
        )
        
        let createdCount = 0
        let updatedCount = 0
        const errors: string[] = []
        
        // 1) INSERT sin sku (siempre nuevos)
        if (withoutExternalId.length > 0) {
            const insertData = withoutExternalId.map((s) => ({
                name: s.name,
                description: s.description,
                price: s.price,
                price_usd: s.price_usd,
                item_type: s.item_type,
                // is_active: s.is_active,
                is_featured: s.is_featured,
                sku: null,
                business_id: user.id
            }))
            
            const { error } = await supabase
                .from("services")
                .insert(insertData)
            
            if (error) {
                errors.push(`Error al insertar nuevos: ${error.message}`)
            } else {
                createdCount += withoutExternalId.length
            }
        }
        
        // 2) Con sku → UPSERT lógico
        if (withExternalId.length > 0) {
            const externalIds = withExternalId
                .map((s) => s.sku!.trim())
                .filter(Boolean)
            
            const { data: existingServices, error: fetchError } = await supabase
                .from("services")
                .select("id, sku")
                .in("sku", externalIds)
            
            if (fetchError) {
                errors.push(`Error al buscar existentes: ${fetchError.message}`)
            } else {
                const existingExternalIds = new Set(
                    (existingServices ?? []).map((s) => s.sku)
                )
                
                const toCreate: typeof withExternalId = []
                const toUpdate: typeof withExternalId = []
                
                for (const service of withExternalId) {
                    const eid = service.sku!.trim()
                    if (existingExternalIds.has(eid)) {
                        toUpdate.push(service)
                    } else {
                        toCreate.push(service)
                    }
                }
                
                // INSERT nuevos con sku
                if (toCreate.length > 0) {
                    const insertData = toCreate.map((s) => ({
                        name: s.name,
                        description: s.description,
                        price: s.price,
                        price_usd: s.price_usd,
                        item_type: s.item_type,
                        // is_active: s.is_active,
                        is_featured: s.is_featured,
                        sku: s.sku!.trim(),
                        business_id: user.id
                    }))
                    
                    const { error } = await supabase
                        .from("services")
                        .insert(insertData)
                    
                    if (error) {
                        errors.push(`Error al insertar con sku: ${error.message}`)
                    } else {
                        createdCount += toCreate.length
                    }
                }
                
                // UPDATE existentes
                for (const service of toUpdate) {
                    const eid = service.sku!.trim()
                    
                    const { error } = await supabase
                        .from("services")
                        .update({
                            name: service.name,
                            description: service.description,
                            price: service.price,
                            price_usd: service.price_usd,
                            item_type: service.item_type,
                            // is_active: service.is_active,
                            is_featured: service.is_featured,
                        })
                        .eq("sku", eid)
                    
                    if (error) {
                        errors.push(`Error al actualizar ${eid}: ${error.message}`)
                    } else {
                        updatedCount++
                    }
                }
            }
        }
        
        if (errors.length > 0) {
            return {
                success: false,
                created: createdCount,
                updated: updatedCount,
                total: services.length,
                errors,
            }
        }
        
        return {
            success: true,
            created: createdCount,
            updated: updatedCount,
            total: services.length,
        }
    } catch (error) {
        console.error("Import error:", error)
        return {
            success: false,
            created: 0,
            updated: 0,
            total: 0,
            errors: ["Error interno del servidor"],
        }
    }
}
