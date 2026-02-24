'use server';
import {ActionResponse, BusinessCategory} from '@/types';
import {createClient} from '@/lib/supabase/server';
import {formatSupabasePostgrestErrors, formatZodErrors, slugify} from '@/lib/utils';
import {BusinessCategorySchema, BusinessCategoryValues} from '@/lib/schemas/business';

const constraintMap = {
    business_categories_section_id_slug_key: 'El slug debe ser único para este negocio',
    business_categories_business_id_fkey1: 'El negocio no existe',
}

export async function getBusinessCategories(businessId?: string): Promise<ActionResponse<BusinessCategory[]>> {
    try {
        const supabase = await createClient()
        
        const query = supabase
            .from("business_categories")
            .select("*", { count: "exact" })
            .eq('business_id', businessId);
        
        const { data, error } = await query;
        
        if (error) {
            return { success: false, errors: formatSupabasePostgrestErrors(error) }
        }
        
        return { success: true, data };
    } catch (error) {
        console.log('Unexpected error in getBusinessCategories:', error);
        throw new Error('Error no especificado');
    }
}


export async function createBusinessCategory(input: BusinessCategoryValues): Promise<ActionResponse<BusinessCategory>> {
    try {
        const validatedFields = BusinessCategorySchema.safeParse(input);
        
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
            .from("business_categories")
            .insert({
                ...validatedFields.data,
                slug: slugify(validatedFields.data.name),
                business_id: user.id
            })
            .select("*");
        
        if (error) {
            return { success: false, errors: formatSupabasePostgrestErrors(error, constraintMap) }
        }
        return { success: true, data: data?.[0] };
    } catch (error) {
        console.log('Unexpected error in createBusinessCategory:', error);
        throw new Error('Error no especificado');
    }
}

export async function updateBusinessCategory(input: Partial<BusinessCategoryValues>): Promise<ActionResponse<BusinessCategory>> {
    try {
        const supabase = await createClient();
        
        if (!input.id) {
            return { success: false, errors: [{ message: 'ID de la categoria del negocio es requerido para actualizar' }] };
        }
        
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
            return { success: false, errors: [{ message: 'Usuario no autenticado o no se pudo obtener el usuario.' }] };
        }
        const { data, error } = await supabase
            .from("business_categories")
            .update(input)
            .eq("id", input.id)
            .select("*");
        
        if (error) {
            return { success: false, errors: formatSupabasePostgrestErrors(error, constraintMap) }
        }
        return { success: true, data: data?.[0] };
    } catch (error) {
        console.log('Unexpected error in updateBusinessCategory:', error);
        throw new Error('Error no especificado');
    }
}

export async function deleteBusinessCategories(ids: string[]): Promise<ActionResponse<void>> {
    try {
        if (!Array.isArray(ids) || ids.length === 0) {
            return { success: false, errors: [{ message: 'Debe proporcionar al menos un ID para eliminar.' }] };
        }
        
        const supabase = await createClient();
        
        const { error } = await supabase
            .from("business_categories")
            .delete()
            .in("id", ids);
        
        if (error) {
            return { success: false, errors: formatSupabasePostgrestErrors(error) }
        }
        return { success: true };
    } catch (error) {
        console.log('Unexpected error in deleteBusinessCategories:', error);
        throw new Error('Error no especificado');
    }
}
