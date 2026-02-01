"use server"

import {ActionResponse} from '@/types';
import {createClient} from '@/lib/supabase/server';
import {formatSupabasePostgrestErrors, formatZodErrors} from '@/lib/utils';
import {BusinessSystemCategory} from '@/types/business';
import {CategoryFormValues, CategorySchema} from '@/lib/schemas/category';

const constraintMap = {

};

export async function listCategories(sectionId?: string): Promise<ActionResponse<BusinessSystemCategory[]>> {
   try {
       const supabase = await createClient()
       
       let query = supabase
        .from("system_categories")
        .select("*", { count: "exact" });
       
       if (sectionId != null) {
           query = query.eq("section_id", sectionId);
       }
    
       const { data, error } = await query;
       
       if (error) {
           return { success: false, errors: formatSupabasePostgrestErrors(error, constraintMap) }
       }
       
       return { success: true, data };
   } catch (error) {
       console.log('Unexpected error in listCategories:', error);
       throw new Error('Error no especificado');
   }
}

export async function createCategory(input: CategoryFormValues): Promise<ActionResponse<BusinessSystemCategory>> {
    try {
        const validatedFields = CategorySchema.safeParse(input);
        
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
            .from("system_categories")
            .insert(validatedFields.data)
            .select("*");
        
        if (error) {
            return { success: false, errors: formatSupabasePostgrestErrors(error, constraintMap) }
        }
        return { success: true, data: data?.[0] };
    } catch (error) {
        console.log('Unexpected error in createCategory:', error);
        throw new Error('Error no especificado');
    }
}

export async function updateCategory(input: Partial<CategoryFormValues>): Promise<ActionResponse<BusinessSystemCategory>> {
    try {
        const supabase = await createClient();
        
        if (!input.id) {
            return { success: false, errors: [{ message: 'ID de la categoria de tarifa de vehículo es requerido para actualizar' }] };
        }
        
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
            return { success: false, errors: [{ message: 'Usuario no autenticado o no se pudo obtener el usuario.' }] };
        }
        const { data, error } = await supabase
            .from("system_categories")
            .update(input)
            .eq("id", input.id)
            .select("*");
        
        if (error) {
            return { success: false, errors: formatSupabasePostgrestErrors(error, constraintMap) }
        }
        return { success: true, data: data?.[0] };
    } catch (error) {
        console.log('Unexpected error in updateCategory:', error);
        throw new Error('Error no especificado');
    }
}

export async function deleteCategories(ids: number[]): Promise<ActionResponse<void>> {
    try {
        if (!Array.isArray(ids) || ids.length === 0) {
            return { success: false, errors: [{ message: 'Debe proporcionar al menos un ID para eliminar.' }] };
        }
        
        const supabase = await createClient();
        
        const numericIds = ids.map(id => Number(id));
        
        const { error } = await supabase
            .from("system_categories")
            .delete()
            .in("id", numericIds);
        
        if (error) {
            return { success: false, errors: formatSupabasePostgrestErrors(error, constraintMap) }
        }
        return { success: true };
    } catch (error) {
        console.log('Unexpected error in deleteCategory:', error);
        throw new Error('Error no especificado');
    }
}
