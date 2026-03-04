'use server';
import {ActionResponse} from '@/types';
import {createClient} from '@/lib/supabase/server';
import {fillProfileData, formatSupabaseFunctionErrors, formatSupabasePostgrestErrors, formatZodErrors, isProfileAdmin, isProfileBusinessAdmin} from '@/lib/utils';
import {cookies} from 'next/headers';
import {Profile} from '@/types';
import {cache} from 'react';
import {ProfileFormValues, ProfileSchema, ProfilesFilterValues} from '@/lib/schemas/auth';

export async function getProfiles(params: ProfilesFilterValues, includeBusiness = false): Promise<ActionResponse<Profile[]>> {
  try {
    const supabase = await createClient()
    let select = ['*'];
    if (includeBusiness) {
      select.push(`
                  businesses(
                      id,
                      slug,
                      name,
                      logo,
                      is_active,
                      section:sections(id, name, slug),
                      system_categories:business_system_categories(
                        category:system_categories!inner(id, name, slug)
                      )
                  )`
      )
    }
    let query = supabase
        .from("profiles")
        .select(select.join(','))
        .order('name', { ascending: true });
    
    const { statusFilters, name, profileId } = params;
    
    if (!!profileId) {
      query = query.eq('id', profileId);
    }
    if (!!name) {
      query = query.ilike('name', `%${name}%`);
    }
    
    if (statusFilters) {
      const { active, inactive } = statusFilters;
      if (active && !inactive) {
        query = query.eq('is_active', true);
      } else if (inactive && !active) {
        query = query.eq('is_active', false);
      }
    }
    
    const { data, error } = await query;
    
    if (error) {
      return { success: false, errors: formatSupabasePostgrestErrors(error) }
    }
    /* @ts-expect-error only */
    const profiles: Profile[] = data?.map(p => fillProfileData(p))
    
    return { success: true, data: profiles };
  } catch (error) {
    console.log('Unexpected error in getBusinessCategories:', error);
    throw new Error('Error no especificado');
  }
}

export const getProfile = async (cStore?: ReturnType<typeof cookies>): Promise<ActionResponse<Profile>> => {
  try{
    const supabase = await createClient(cStore);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, errors: [{ message: 'El usuario no está autenticado' }] }
    }
    const { data, error } = await supabase
        .from('profiles')
        .select(`*`)
        .eq("id", user.id)
        .single();

    if (error) {
      const errors = await formatSupabaseFunctionErrors(error);
      return { success: false, errors }
    }
    const profile: Profile = fillProfileData(data);
    
    return { success: true, data: profile };
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
    return { success: true, data: fillProfileData(data?.[0]) };
  } catch (error) {
    console.log('Unexpected error in updateProfile:', error);
    throw new Error('Ha ocurrido un error no especificado');
  }
};
