'use server';
import {ActionResponse, Business, BusinessCategory, BusinessDiscount, PaginationRequest, Product, ResultList} from '@/types';
import {createClient} from '@/lib/supabase/server';
import {formatSupabaseFunctionErrors, formatSupabasePostgrestErrors, formatZodErrors, slugify} from '@/lib/utils';
import {
  BusinessCategorySchema,
  BusinessCategoryValues,
  BusinessDiscountSchema,
  BusinessDiscountValues,
  BusinessFiltersSchema,
  BusinessFiltersValues, BusinessFormValues, BusinessSchema, BusinessSettingsCatalogSchema, BusinessSettingsCatalogValues, UpdateBusinessValues
} from '@/lib/schemas/business';
import {UpdateBusinessSchema} from '@/lib/schemas/business';
import {cache} from 'react';

const constraintMap = {
  'businesses_section_id_fkey': 'La sección no existe',
  'businesses_slug_key': 'Ya existe un negocio con este slug',
}

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
    is_active: params.is_active,
    only_logged_user: params.only_logged_user,
  })

  if (!filtersParsed.success) {
    return { success: false, errors: formatZodErrors(filtersParsed.error) }
  }

  const supabase = await createClient()

  // 🔹 page y limit salen directo de params
  const page = params.page ?? 0
  const limit = params.limit

  const { province, municipality, rating, vehicleType, section, category, q, is_active, only_logged_user } = filtersParsed.data

  const from = page * limit
  const to = from + limit - 1

  let query = supabase
      .from("businesses")
      .select(`
        *,
        vehicles:vehicles(id, vehicle_type),
        section:sections!inner(id, name, slug),
        categories:business_system_categories(
          category:system_categories!inner(id, name, slug)
        ),
        images:business_images(*),
        profile_business!inner(profile_id)
      `, { count: "exact" })

  if (is_active) query = query.eq("is_active", is_active)
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
  
  if (only_logged_user) {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return { success: false, errors: [{ message: 'Usuario no autenticado o no se pudo obtener el usuario.' }] };
    }
    query = query.eq("profile_business.profile_id", user.id)
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
      section:sections!inner(
        id,
        name,
        slug
      ),
      categories:business_system_categories!inner(
        category:system_categories!inner(
          id,
          name,
          slug
        )
      ),
      images:business_images(*),
      hours:business_hours(*)
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
      section: data.section ?? null,
      categories: data.categories?.map((c: any) => c.category) ?? [],
      images: data.images ?? [],
      hours: data.hours ?? [],
    },
  };
};

export const getBusinessByIdCached = cache(getBusinessById);

// Cachea solo para el mismo request (obtener solo el data)
export const getBusinessByIdCachedData = cache(async (id: string) => {
  const res = await getBusinessByIdCached(id)
  
  if (!res.success) return null
  return res.data ?? null
})

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
      categories:business_system_categories(
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

export const getBusinessBySlugCached = cache(getBusinessBySlug);

// Cachea solo para el mismo request (obtener solo el data)
export const getBusinessBySlugCachedData = cache(async (id: string) => {
  const res = await getBusinessBySlugCached(id)
  
  if (!res.success) return null
  return res.data ?? null
})

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

export async function createBusiness(input: BusinessFormValues): Promise<ActionResponse<Business>> {
  try {
    const validatedFields = BusinessSchema.safeParse(input);
    
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
        .from("businesses")
        .insert({
          name: input.name,
          description: input.description,
          province: input.province,
          municipality: input.municipality,
          address: input.address,
          section_id: input.section_id || null,
          whatsapp: input.whatsapp,
        })
        .select("*");
    
    // todo - Con el trigger trg_link_profile_business (fn_link_profile_business) se crea la relacion entre el profile y el business insertado
    
    if (error) {
      return { success: false, errors: formatSupabasePostgrestErrors(error, constraintMap) }
    }
    return { success: true, data: data?.[0] };
  } catch (error) {
    console.log('Unexpected error in createBusiness:', error);
    throw new Error('Error no especificado');
  }
}

export const updateBusiness = async (params: UpdateBusinessValues): Promise<ActionResponse<Business>> => {
  const validatedFields = UpdateBusinessSchema.safeParse(params);
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
        .from("businesses")
        .update(cleanData)
        .eq("id", params.id)
        .select("*");
    
    if (error) {
      return { success: false, errors: formatSupabasePostgrestErrors(error, constraintMap) }
    }
    return { success: true, data: data?.[0] };
  } catch (error) {
    console.log('Unexpected error in updateBusiness:', error);
    throw new Error('Ha ocurrido un error no especificado');
  }
};

export async function deleteBusiness(id: string): Promise<ActionResponse<void>> {
  try {
    if (!id) {
      return { success: false, errors: [{ message: 'Debe proporcionar el ID para eliminar.' }] };
    }
    
    const supabase = await createClient();
    
    const { error } = await supabase
        .from("businesses")
        .delete()
        .eq("id", id);
    
    if (error) {
      return { success: false, errors: formatSupabasePostgrestErrors(error, constraintMap) }
    }
    return { success: true };
  } catch (error) {
    console.log('Unexpected error in deleteBusiness:', error);
    throw new Error('Error no especificado');
  }
}

export const updateStatusBusiness = async (businessId: string, active: boolean) => {
  try {
    const supabase = await createClient();
    
    if (!businessId) {
      return { success: false, errors: [{ message: 'ID del negocio es requerido' }] };
    }
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return { success: false, errors: [{ message: 'Usuario no autenticado o no se pudo obtener el usuario.' }] };
    }
    const { data, error } = await supabase
        .from("businesses")
        .update({
          is_active: active,
        })
        .eq("id", businessId)
        .select("*");
    
    if (error) {
      return { success: false, errors: formatSupabasePostgrestErrors(error, constraintMap) }
    }
    return { success: true, data: data?.[0] };
  } catch (error) {
    console.log('Unexpected error in updateStatusBusiness:', error);
    throw new Error('Error no especificado');
  }
}


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
