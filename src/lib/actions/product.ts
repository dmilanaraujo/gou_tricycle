import {createClient} from '@/lib/supabase/server';
import {BusinessCategory} from "@/types";

export type ProductWithPricing = {
    id: string
    name: string
    image_url: string | null
    business_category_id: string
    category: BusinessCategory | null
    base_price: number
}

export async function getBusinessProducts(businessId: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("products")
        .select(`
          id,
          name,
          image_url,
          base_price,
          business_category_id,
          category:business_categories!inner(
            id,
            name,
            slug
          )
        `)
        .eq("business_id", businessId)
        .eq("is_active", true)

    if (error) throw error
    return data ?? []
}

export async function getBusinessfeaturedProducts(businessId: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("products")
        .select(`
          id,
          name,
          image_url,
          base_price,
          is_featured,
          business_category_id,
          category:business_categories!inner(
            id,
            name,
            slug
          ),
          discount:product_discounts!inner(type, value)
        `)
        .eq("business_id", businessId)
        .eq("is_active", true)

    if (error) throw error
    return data ?? []
}


// export const getBusinessProducts = async (businessId: string) => {
//     const supabase = await createClient()
//
//     const { data, error } = await supabase.rpc("get_business_products", {
//         business_id_param: businessId
//     })
//
//     if (error) {
//         throw error
//     }
//
//     return data as ProductWithPricing[]
// }

// export function groupBySection(products: ProductWithPricing[]) {
//     const map = new Map<string, BusinessCategory>()
//
//     for (const p of products) {
//         if (!map.has(p.business_category_id)) {
//             map.set(p.business_category_id, {
//                 id: p.business_category_id,
//                 name: "",
//                 products: []
//             })
//         }
//
//         map.get(p.business_category_id)!.products.push(p)
//     }
//
//     return Array.from(map.values())
// }

