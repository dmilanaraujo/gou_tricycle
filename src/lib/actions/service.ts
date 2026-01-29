"use server"

import {ActionResponse, PaginationRequest, ResultList, Service, SortRequest} from '@/types';
import {
    ServiceFormValues,
    ServiceSchema,
    ServicesFilterSchema,
    ServicesFilterValues
} from '@/lib/schemas/service';
import {formatSupabasePostgrestErrors, formatZodErrors} from '@/lib/utils';
import {createClient} from '@/lib/supabase/server';

const constraintMap = {
    'services_business_id_fkey': 'El negocio que desea asociar no existe',
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
            .select('*, images:service_images(*)', { count: "exact" })
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
                business_id: user.id
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
            .update(input)
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
