'use server';
import {ActionResponse, Driver} from '@/types';
import {createClient} from '@/lib/supabase/server';
import {formatSupabaseFunctionErrors, formatSupabasePostgrestErrors} from '@/lib/utils';
import {cookies} from 'next/headers';
import {UpdateProfileSchema, UpdateProfileValues} from '@/lib/schemas/auth';

export const getProfile = async (cStore?: ReturnType<typeof cookies>): Promise<ActionResponse<Driver>> => {
  try{
    const supabase = await createClient(cStore);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, errors: [{ message: 'El usuario no está autenticado' }] }
    }
    const { data, error } = await supabase
        .from('drivers')
        .select('*')
        .eq("id", user.id)
        .single();
    
    if (error) {
      const errors = await formatSupabaseFunctionErrors(error);
      return { success: false, errors }
    }
    return { success: true, data: data || {} as Driver };
  } catch (error) {
    console.log('Unexpected error in getProfile:', error);
    throw new Error('Ha ocurrido un error no especificado');
  }
};

export const updateProfile = async (params: UpdateProfileValues): Promise<ActionResponse<Driver>> => {
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
        .from("drivers")
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
