'use server';
import {ActionResponse, Driver, PaginationRequest, ResultList } from '@/types';
import {createClient} from '@/lib/supabase/server';
import {formatSupabaseFunctionErrors, formatSupabasePostgrestErrors, formatZodErrors, shuffleArray} from '@/lib/utils';
import {municipalityDistances} from '@/lib/data/locations';
import {Business, BusinessCategory, BusinessSection} from "@/types/business";
import {BusinessFiltersSchema, BusinessFiltersValues} from "@/lib/schemas/business";

  export const getBusinesses = async (params: BusinessFiltersValues & PaginationRequest): Promise<ActionResponse<ResultList<Business>>> => {
    try {
      const validatedFields = BusinessFiltersSchema.safeParse(params);

      if (!validatedFields.success) {
        const errors = formatZodErrors(validatedFields.error);
        return { success: false, errors };
      }

      const supabase = await createClient();

      const {
        page,
        limit
      } = params;

      const from = (page || 0) * limit;
      const to = from + limit - 1;

      const { data, error, count } = await supabase
          .from('businesses')
          .select('*, sections:business_sections(section:sections(id, name, slug)), categories:business_categories(category:categories(id, name, slug))', { count: 'exact' })
          .gte('is_active', true)
          .range(from, to);

      if (error) {
        console.log('error supabase', error);
        const errors = await formatSupabaseFunctionErrors(error);
        return { success: false, errors }
      }

      const flattened = data.map(business => ({
        ...business,
        sections: business.sections?.map(
            (s: { section: BusinessSection }) => s.section
        ) ?? [],
        categories: business.categories?.map(
            (c: { category: BusinessCategory }) => c.category
        ) ?? [],
      }))

      let filteredBusinesses: Business[] = flattened || [];

      const result = {
        data: filteredBusinesses || [],
        pagination: {
          currentPage: page || 1,
          itemsPerPage: limit,
          totalItems: count || 0,
          hasMore: filteredBusinesses.length === limit,
        },
      };

      return { success: true, data: result };
    } catch (error) {
      console.log('Unexpected error in getDrivers:', error);
      throw new Error('Ha ocurrido un error no especificado');
    }
}

// export const updateStatus = async (online: boolean) => {
//
//   try {
//     const supabase = await createClient();
//
//     const { data: { user }, error: userError } = await supabase.auth.getUser();
//
//     if (userError || !user) {
//       return { success: false, errors: [{ message: 'Usuario no autenticado o no se pudo obtener el usuario.' }] };
//     }
//
//     const { data, error } = await supabase
//         .from("drivers")
//         .update({
//           online
//         })
//         .eq("id", user.id)
//         .select("*");
//
//     if (error) {
//       return { success: false, errors: formatSupabasePostgrestErrors(error) }
//     }
//     return { success: true, data: data?.[0] };
//   } catch (error) {
//     console.log('Unexpected error in updateStatus:', error);
//     throw new Error('Error no especificado');
//   }
// }

// export const setDefaultImage = async (path: string): Promise<ActionResponse<boolean>> => {
//
//   try {
//     const supabase = await createClient();
//
//     const { data: { user }, error: userError } = await supabase.auth.getUser();
//
//     if (userError || !user) {
//       return { success: false, errors: [{ message: 'Usuario no autenticado o no se pudo obtener el usuario.' }] };
//     }
//
//     const { error: resetError } = await supabase
//         .from("driver_images")
//         .update({ primary: false })
//         .eq("driver_id", user.id);
//
//     if (resetError) {
//       return {
//         success: false,
//         errors: formatSupabasePostgrestErrors(resetError),
//       };
//     }
//
//     const { error } = await supabase
//         .from("driver_images")
//         .update({
//           primary: true
//         })
//         .eq("driver_id", user.id)
//         .eq("path", path);
//
//     if (error) {
//       return { success: false, errors: formatSupabasePostgrestErrors(error) }
//     }
//     return { success: true, data: true };
//   } catch (error) {
//     console.log('Unexpected error in setDefaultImage:', error);
//     throw new Error('Error no especificado');
//   }
// }
