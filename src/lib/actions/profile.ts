'use server';
import {ActionResponse} from '@/types';
import {createClient} from '@/lib/supabase/server';
import {formatSupabaseFunctionErrors, formatSupabasePostgrestErrors, formatZodErrors} from '@/lib/utils';
import {cookies} from 'next/headers';
import {Profile} from '@/types';
import {cache} from 'react';
import {ProfileFormValues, ProfileSchema} from '@/lib/schemas/auth';

export const getProfile = async (cStore?: ReturnType<typeof cookies>): Promise<ActionResponse<Profile>> => {
  try{
    const supabase = await createClient(cStore);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, errors: [{ message: 'El usuario no está autenticado' }] }
    }
    const { data, error } = await supabase
        .from('profiles')
        .select(`
            *,
            businesses(id, slug, name, logo, is_active)
        `)
        .eq("id", user.id)
        .single();

    if (error) {
      const errors = await formatSupabaseFunctionErrors(error);
      return { success: false, errors }
    }
    return { success: true, data: data || {} as Profile };
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


export const updateProfile = async (params: ProfileFormValues): Promise<ActionResponse<Profile>> => {
  const validatedFields = ProfileSchema.safeParse(params);
  if (!validatedFields.success) {
    const errors = formatZodErrors(validatedFields.error);
    return { success: false, errors };
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
        .from("profiles")
        .update(cleanData)
        .eq("id", user.id)
        .select("*");
    
    if (error) {
      return { success: false, errors: formatSupabasePostgrestErrors(error) }
    }
    return { success: true, data: data?.[0] };
  } catch (error) {
    console.log('Unexpected error in updateProfile:', error);
    throw new Error('Ha ocurrido un error no especificado');
  }
};
