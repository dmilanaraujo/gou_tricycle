'use server';
import {ActionResponse, Driver} from '@/types';
import {createClient} from '@/lib/supabase/server';
import {formatSupabaseFunctionErrors} from '@/lib/utils';
import {cookies} from 'next/headers';

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


