'use server';
import {ActionResponse, Driver, PaginationRequest, ResultList } from '@/types';
import {createClient} from '@/lib/supabase/server';
import {formatSupabaseFunctionErrors, formatSupabasePostgrestErrors, formatZodErrors, shuffleArray} from '@/lib/utils';
import {municipalityDistances} from '@/lib/data/locations';
import {Business, BusinessCategory, BusinessSection} from "@/types/business";
import {BusinessFiltersSchema, BusinessFiltersValues} from "@/lib/schemas/business";

export const getBusinesses = async (
    params: BusinessFiltersValues & PaginationRequest
): Promise<ActionResponse<ResultList<Business>>> => {

  // 🔹 Solo validamos filtros (no paginación)
  const filtersParsed = BusinessFiltersSchema.safeParse({
    province: params.province,
    municipality: params.municipality,
    rating: params.rating,
    vehicleType: params.vehicleType,
  })

  if (!filtersParsed.success) {
    return { success: false, errors: formatZodErrors(filtersParsed.error) }
  }

  const supabase = await createClient()

  // 🔹 page y limit salen directo de params
  const page = params.page ?? 0
  const limit = params.limit

  const { province, municipality, rating, vehicleType } = filtersParsed.data

  const from = page * limit
  const to = from + limit - 1

  let query = supabase
      .from("businesses")
      .select(
          `
      *,
      vehicles:vehicles!inner(
        id,
        vehicle_type
      ),
      sections:business_sections(section:sections(id, name, slug)),
      categories:business_categories(category:categories(id, name, slug))
    `,
          { count: "exact" }
      )
      .eq("is_active", true)

  if (province) query = query.eq("province", province)
  if (municipality) query = query.eq("municipality", municipality)
  if (rating) query = query.gte("rating", rating)

  // 🔥 Filtro por tabla relacionada
  if (vehicleType) {
    query = query.eq("vehicles.vehicle_type", vehicleType)
  }

  const { data, error, count } = await query.range(from, to)

  if (error) {
    return { success: false, errors: await formatSupabaseFunctionErrors(error) }
  }

  const flattened = (data ?? []).map(b => ({
    ...b,
    vehicles: b.vehicles ?? [],
    sections: b.sections?.map((s: any) => s.section) ?? [],
    categories: b.categories?.map((c: any) => c.category) ?? [],
  }))

  return {
    success: true,
    data: {
      data: flattened,
      pagination: {
        currentPage: page + 1,
        itemsPerPage: limit,
        totalItems: count || 0,
        hasMore: flattened.length === limit,
      },
    },
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
