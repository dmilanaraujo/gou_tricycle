"use server"

import {ActionResponse, PaginationRequest, ResultList, Product, SortRequest} from '@/types';
import {
    ProductFormValues,
    ProductSchema,
    ProductsFilterSchema,
    ProductsFilterValues,
} from '@/lib/schemas/product';
import {formatSupabasePostgrestErrors, formatZodErrors} from '@/lib/utils';
import {createClient} from '@/lib/supabase/server';

const constraintMap = {
    'products_business_id_fkey': 'El negocio que desea asociar no existe',
    'idx_services_business_external_unique': 'Ya existe un producto o servicio con el mismo identificador',
};

export async function listProducts(params: ProductsFilterValues & PaginationRequest & SortRequest): Promise<ActionResponse<ResultList<Product>>> {
   try{
       const validatedFields = ProductsFilterSchema.safeParse(params);
       
       if (!validatedFields.success) {
           const errors = formatZodErrors(validatedFields.error);
           return { success: false, errors };
       }
       
       const supabase = await createClient();

       const { data: { user } } = await supabase.auth.getUser();

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
            .select('*, category:business_categories(*), discount:product_discounts(*), images:service_images(*)', { count: "exact" })
            .eq('item_type', 'product');
       
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
       console.log('Unexpected error in listProducts:', error);
       throw new Error('Error no especificado');
   }
}

export async function createProduct(input: ProductFormValues): Promise<ActionResponse<Product>> {
    try {
        const validatedFields = ProductSchema.safeParse(input);
        
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
                is_featured: input.is_featured,
                business_category_id: input.business_category_id || null,
                product_discounts_id: input.product_discounts_id || null,
                sku: input.sku,
                um: input.um,
                item_type: 'product',
                business_id: user.id
            })
            .select("*");
        
        if (error) {
            return { success: false, errors: formatSupabasePostgrestErrors(error, constraintMap) }
        }
        return { success: true, data: data?.[0] };
    } catch (error) {
        console.log('Unexpected error in createProduct:', error);
        throw new Error('Error no especificado');
    }
}

export async function updateProduct(input: Partial<ProductFormValues>): Promise<ActionResponse<Product>> {
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
                price_usd: input.price_usd,
                product_discounts_id: input.product_discounts_id || null,
                business_category_id: input.business_category_id || null,
                sku: input.sku,
                is_featured: input.is_featured,
                um: input.um,
            })
            .eq("id", input.id)
            .select("*");
        
        if (error) {
            return { success: false, errors: formatSupabasePostgrestErrors(error, constraintMap) }
        }
        return { success: true, data: data?.[0] };
    } catch (error) {
        console.log('Unexpected error in updateProduct:', error);
        throw new Error('Error no especificado');
    }
}


export const updateStock = async (serviceId: string, stock: number) => {
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
                stock
            })
            .eq("id", serviceId)
            .select("*");
        
        if (error) {
            return { success: false, errors: formatSupabasePostgrestErrors(error, constraintMap) }
        }
        return { success: true, data: data?.[0] };
    } catch (error) {
        console.log('Unexpected error in updateStock:', error);
        throw new Error('Error no especificado');
    }
}
