'use server';
import {ActionResponse} from '@/types';
import {createClient} from '@/lib/supabase/server';
import {formatSupabaseFunctionErrors, formatSupabasePostgrestErrors, formatZodErrors} from '@/lib/utils';
import {cookies} from 'next/headers';
import {UpdateProfileSchema, UpdateProfileValues} from '@/lib/schemas/auth';
import {Business} from '@/types/business';
import {cache} from 'react';
import {BusinessSettingsCatalogSchema, BusinessSettingsCatalogValues} from '@/lib/schemas/business';

const constraintMap = {
  'businesses_section_id_fkey': 'La sección no existe',
  'businesses_slug_key': 'Ya existe un negocio con este slug',
}

export const getProfile = async (cStore?: ReturnType<typeof cookies>): Promise<ActionResponse<Business>> => {
  try{
    const supabase = await createClient(cStore);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, errors: [{ message: 'El usuario no está autenticado' }] }
    }
    const { data, error } = await supabase
        .from('businesses')
        .select(`
            *,
            vehicles:vehicles(
              id,
              vehicle_type
            ),
            section:sections(id, name, slug),
            categories:business_system_categories(
              category:system_categories(id, name, slug)
            ),
            images:business_images(*)
        `)
        .eq("id", user.id)
        .single();
    
    if (error) {
      const errors = await formatSupabaseFunctionErrors(error);
      return { success: false, errors }
    }
    return { success: true, data: data || {} as Business };
  } catch (error) {
    console.log('Unexpected error in getProfile:', error);
    throw new Error('Ha ocurrido un error no especificado');
  }
};

// Cachea solo para el mismo request
export const getProfileCached = cache(getProfile);

// Cachea solo para el mismo request (obtener solo el data)
export const getProfileCachedData = cache(async () => {
  const res = await getProfileCached()
  
  if (!res.success) return null
  return res.data ?? null
})

export const updateProfile = async (params: UpdateProfileValues): Promise<ActionResponse<Business>> => {
  const validatedFields = UpdateProfileSchema.safeParse(params);
  if (!validatedFields.success) {
    // const errors = formatZodErrors(validatedFields.error);
    return { success: false, errors: [] };
  }
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, errors: [{ message: 'El usuario no está autenticado' }] }
    }
    // const { phone, alias } = validatedFields.data;
    const cleanData = Object.fromEntries(
        Object.entries(validatedFields.data).filter(([key, value]) => {
          return value !== null && value !== undefined && value !== "";
        })
    );
    
    const { data, error } = await supabase
        .from("businesses")
        .update(cleanData)
        .eq("id", user.id)
        .select("*");
    
    if (error) {
      return { success: false, errors: formatSupabasePostgrestErrors(error, constraintMap) }
    }
    return { success: true, data: data?.[0] };
  } catch (error) {
    console.log('Unexpected error in updateProfile:', error);
    throw new Error('Ha ocurrido un error no especificado');
  }
};

export const updateSettingsCatalog = async (businessId: string, params: BusinessSettingsCatalogValues): Promise<ActionResponse<Business>> => {
  const validatedFields = BusinessSettingsCatalogSchema.safeParse(params);
  if (!validatedFields.success) {
    const errors = formatZodErrors(validatedFields.error);
    return { success: false, errors };
  }
  try {
    
    const supabase = await createClient();
    if (!businessId) {
      return { success: false, errors: [{ message: 'ID del negocio es requerido para actualizar' }] };
    }
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return { success: false, errors: [{ message: 'Usuario no autenticado o no se pudo obtener el usuario.' }] };
    }
    const { slug } = validatedFields.data;
    const { data, error } = await supabase
        .from("businesses")
        .update({ slug })
        .eq("id", businessId)
        .select("*");
    
    if (error) {
      return { success: false, errors: formatSupabasePostgrestErrors(error, constraintMap) }
    }
    
    return { success: true, data: data[0] };
  } catch (error) {
    console.log('Unexpected error in updateSettingsCatalog:', error);
    throw new Error('Ha ocurrido un error no especificado');
  }
};
