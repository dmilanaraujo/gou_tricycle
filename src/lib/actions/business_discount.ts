'use server';
import {ActionResponse, BusinessDiscount} from '@/types';
import {createClient} from '@/lib/supabase/server';
import {formatSupabasePostgrestErrors, formatZodErrors} from '@/lib/utils';
import {BusinessDiscountSchema, BusinessDiscountValues} from '@/lib/schemas/business';

const constraintMap = {
  'product_discounts_business_id_fkey': 'El negocio no existe',
  'product_discounts_type_check': 'El tipo del descuento es percent o fixed',
  'product_discounts_value_check': 'El valor del descuento debe ser maryor que cero',
  'valid_discount_dates': 'La fecha de fin debe ser mayor a la fecha de inicio',
}

export async function getBusinessDiscounts(businessId?: string): Promise<ActionResponse<BusinessDiscount[]>> {
  try {
    const supabase = await createClient()
    
    const query = supabase
        .from("product_discounts")
        .select("*", { count: "exact" })
        .eq('business_id', businessId);
    
    const { data, error } = await query;
    
    if (error) {
      return { success: false, errors: formatSupabasePostgrestErrors(error) }
    }
    
    return { success: true, data };
  } catch (error) {
    console.log('Unexpected error in getBusinessDiscounts:', error);
    throw new Error('Error no especificado');
  }
}


export async function createBusinessDiscount(input: BusinessDiscountValues): Promise<ActionResponse<BusinessDiscount>> {
  try {
    const validatedFields = BusinessDiscountSchema.safeParse(input);
    
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
        .from("product_discounts")
        .insert({
          ...validatedFields.data,
          business_id: user.id
        })
        .select("*");
    
    if (error) {
      return { success: false, errors: formatSupabasePostgrestErrors(error, constraintMap) }
    }
    return { success: true, data: data?.[0] };
  } catch (error) {
    console.log('Unexpected error in createBusinessDiscount:', error);
    throw new Error('Error no especificado');
  }
}

export async function updateBusinessDiscount(input: Partial<BusinessDiscountValues>): Promise<ActionResponse<BusinessDiscount>> {
  try {
    const supabase = await createClient();
    
    if (!input.id) {
      return { success: false, errors: [{ message: 'ID del descuento del negocio es requerido para actualizar' }] };
    }
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return { success: false, errors: [{ message: 'Usuario no autenticado o no se pudo obtener el usuario.' }] };
    }
    const { data, error } = await supabase
        .from("product_discounts")
        .update(input)
        .eq("id", input.id)
        .select("*");
    
    if (error) {
      return { success: false, errors: formatSupabasePostgrestErrors(error, constraintMap) }
    }
    return { success: true, data: data?.[0] };
  } catch (error) {
    console.log('Unexpected error in updateBusinessDiscount:', error);
    throw new Error('Error no especificado');
  }
}

export async function deleteBusinessDiscount(ids: string[]): Promise<ActionResponse<void>> {
  try {
    if (!Array.isArray(ids) || ids.length === 0) {
      return { success: false, errors: [{ message: 'Debe proporcionar al menos un ID para eliminar.' }] };
    }
    
    const supabase = await createClient();
    
    const { error } = await supabase
        .from("product_discounts")
        .delete()
        .in("id", ids);
    
    if (error) {
      return { success: false, errors: formatSupabasePostgrestErrors(error) }
    }
    return { success: true };
  } catch (error) {
    console.log('Unexpected error in deleteBusinessDiscount:', error);
    throw new Error('Error no especificado');
  }
}
