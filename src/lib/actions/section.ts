"use server"

import {createClient} from '@/lib/supabase/server';
import {formatSupabasePostgrestErrors} from '@/lib/utils';
import {BusinessSection} from '@/types/business';
import {ActionResponse} from '@/types';

export const getSections = async (): Promise<ActionResponse<BusinessSection[]>> => {
    try {
        const supabase = await createClient();
        
        const { data, error } = await supabase
            .from('sections') // Ajusta al nombre de tu tabla
            .select('*');
        
        if (error) {
            return { success: false, errors: formatSupabasePostgrestErrors(error) }
        }
        return { success: true, data: data || []};
    } catch (error) {
        console.log('Unexpected error in getSections:', error);
        throw new Error('Error no especificado');
    }
};

