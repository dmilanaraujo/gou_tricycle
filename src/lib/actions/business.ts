'use server';
import {ActionResponse, Business, BusinessCategory, BusinessDiscount, BusinessSystemCategory, PaginationRequest, ResultList} from '@/types';
import {createClient} from '@/lib/supabase/server';
import {formatSupabaseFunctionErrors, formatSupabasePostgrestErrors, formatZodErrors, shuffleArray, slugify} from '@/lib/utils';
import {BusinessCategorySchema, BusinessCategoryValues, BusinessDiscountSchema, BusinessDiscountValues, BusinessFiltersSchema, BusinessFiltersValues} from '@/lib/schemas/business';

const constraintCategoryMap = {
  business_categories_section_id_slug_key: 'El slug debe ser único para este negocio',
  business_categories_business_id_fkey1: 'El negocio no existe',
}

export const getBusinesses = async (
    params: BusinessFiltersValues & PaginationRequest
): Promise<ActionResponse<ResultList<Business>>> => {

  // 🔹 Solo validamos filtros (no paginación)
  const filtersParsed = BusinessFiltersSchema.safeParse({
    province: params.province,
    municipality: params.municipality,
    rating: params.rating,
    vehicleType: params.vehicleType,
    section: params.section,
    category: params.category,
    q: params.q,
  })

  if (!filtersParsed.success) {
    return { success: false, errors: formatZodErrors(filtersParsed.error) }
  }

  const supabase = await createClient()

  // 🔹 page y limit salen directo de params
  const page = params.page ?? 0
  const limit = params.limit

  const { province, municipality, rating, vehicleType, section, category, q } = filtersParsed.data

  const from = page * limit
  const to = from + limit - 1

  let query = supabase
      .from("businesses")
      .select(`
        *,
        vehicles:vehicles(id, vehicle_type),
        section:sections!inner(id, name, slug),
        categories:business_system_categories!inner(
          category:system_categories!inner(id, name, slug)
        ),
        images:business_images(*)
      `, { count: "exact" })
      .eq("is_active", true)

  if (province) query = query.eq("province", province)
  if (municipality) query = query.eq("municipality", municipality)
  if (rating) query = query.gte("rating", rating)

  // 🔹 Filtro por sección (TAB)
  if (section) {
    query = query.eq("section.slug", section)
  }

  if (category) {
    query = query.eq("categories.category.slug", category)
  }

  // 🔥 Filtro por tabla relacionada
  if (vehicleType) {
    query = query.eq("vehicles.vehicle_type", vehicleType)
  }

  if (q) {
    query = query.or(
        `name.ilike.%${q}%,description.ilike.%${q}%,phone.ilike.%${q}%,whatsapp.ilike.%${q}%`
    )
  }

  const { data, error, count } = await query.range(from, to)

  if (error) {
    return { success: false, errors: await formatSupabaseFunctionErrors(error) }
  }

  const flattened = (data ?? []).map(b => ({
    ...b,
    vehicles: b.vehicles ?? [],
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

export const getBusinessById = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
      .from("businesses")
      .select(`
      *,
      vehicles:vehicles(
        id,
        vehicle_type
      ),
      section:sections!inner(id, name, slug),
      categories:business_system_categories!inner(
        category:system_categories!inner(id, name, slug)
      ),
      images:business_images(*)
    `)
      .eq("id", id)
      .eq("is_active", true)
      .single();

  if (error || !data) {
    return { success: false, data: null };
  }

  return {
    success: true,
    data: {
      ...data,
      vehicles: data.vehicles ?? [],
      sections: data.sections?.map((s: any) => s.section) ?? [],
      categories: data.categories?.map((c: any) => c.category) ?? [],
    },
  };
};

export const getBusinessBySlug = async (slug: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
      .from("businesses")
      .select(`
      *,
      vehicles:vehicles(
        id,
        vehicle_type
      ),
      section:sections!inner(id, name, slug),
      categories:business_system_categories!inner(
        category:system_categories!inner(id, name, slug)
      ),
      images:business_images(*)
    `)
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

  if (error || !data) {
    return { success: false, data: null };
  }

  return {
    success: true,
    data: {
      ...data,
      vehicles: data.vehicles ?? [],
      sections: data.sections?.map((s: any) => s.section) ?? [],
      categories: data.categories?.map((c: any) => c.category) ?? [],
    },
  };
};

export const getBusinessReviews = async (businessId: string) => {
  const supabase = await createClient()

  return supabase
      .from("business_reviews")
      .select("id, rating, comment, created_at, user_display_name")
      .eq("business_id", businessId)
      .eq("is_approved", true)
      .order("created_at", { ascending: false })
      .limit(10)
}

export async function getBusinessCategories(businessId?: string): Promise<ActionResponse<BusinessCategory[]>> {
  try {
    const supabase = await createClient()
    
    const query = supabase
        .from("business_categories")
        .select("*", { count: "exact" })
        .eq('business_id', businessId);
    
    const { data, error } = await query;
    
    if (error) {
      return { success: false, errors: formatSupabasePostgrestErrors(error) }
    }
    
    return { success: true, data };
  } catch (error) {
    console.log('Unexpected error in getBusinessCategories:', error);
    throw new Error('Error no especificado');
  }
}


export async function createBusinessCategory(input: BusinessCategoryValues): Promise<ActionResponse<BusinessCategory>> {
  try {
    const validatedFields = BusinessCategorySchema.safeParse(input);
    
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
        .from("business_categories")
        .insert({
          ...validatedFields.data,
          slug: slugify(validatedFields.data.name),
          business_id: user.id
        })
        .select("*");
    
    if (error) {
      return { success: false, errors: formatSupabasePostgrestErrors(error, constraintCategoryMap) }
    }
    return { success: true, data: data?.[0] };
  } catch (error) {
    console.log('Unexpected error in createBusinessCategory:', error);
    throw new Error('Error no especificado');
  }
}

export async function updateBusinessCategory(input: Partial<BusinessCategoryValues>): Promise<ActionResponse<BusinessCategory>> {
  try {
    const supabase = await createClient();
    
    if (!input.id) {
      return { success: false, errors: [{ message: 'ID de la categoria del negocio es requerido para actualizar' }] };
    }
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return { success: false, errors: [{ message: 'Usuario no autenticado o no se pudo obtener el usuario.' }] };
    }
    const { data, error } = await supabase
        .from("business_categories")
        .update(input)
        .eq("id", input.id)
        .select("*");
    
    if (error) {
      return { success: false, errors: formatSupabasePostgrestErrors(error, constraintCategoryMap) }
    }
    return { success: true, data: data?.[0] };
  } catch (error) {
    console.log('Unexpected error in updateBusinessCategory:', error);
    throw new Error('Error no especificado');
  }
}

export async function deleteBusinessCategories(ids: string[]): Promise<ActionResponse<void>> {
  try {
    if (!Array.isArray(ids) || ids.length === 0) {
      return { success: false, errors: [{ message: 'Debe proporcionar al menos un ID para eliminar.' }] };
    }
    
    const supabase = await createClient();
    
    const { error } = await supabase
        .from("business_categories")
        .delete()
        .in("id", ids);
    
    if (error) {
      return { success: false, errors: formatSupabasePostgrestErrors(error) }
    }
    return { success: true };
  } catch (error) {
    console.log('Unexpected error in deleteBusinessCategories:', error);
    throw new Error('Error no especificado');
  }
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
      return { success: false, errors: formatSupabasePostgrestErrors(error, constraintCategoryMap) }
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
      return { success: false, errors: formatSupabasePostgrestErrors(error, constraintCategoryMap) }
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
