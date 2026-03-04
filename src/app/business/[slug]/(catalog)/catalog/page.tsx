import {getBusinessBySlugCachedData} from '@/lib/actions/business';
import {listProducts} from "@/lib/actions/product";
import {applyDiscount} from "@/lib/utils";
import BusinessCatalog from "@/components/client/business-catalog";

/* PAGE */
export default async function Page({
                                       params,
                                   }: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    const business = await getBusinessBySlugCachedData(slug)
    const response = await listProducts({business_id: business?.id, page: 0, limit: 1000})

    const rawProducts = response.success
        ? response.data
        : {data: []}

    const allProducts = rawProducts ? rawProducts.data
        .map(p => {
            const price = p.price ?? 0
            const price_usd = p.price_usd ?? 0
            const name = p.name ?? ""

            const { finalPrice, finalPriceUsd, label } = applyDiscount(price, price_usd, p.discount)
            const primaryImage = p.images?.find(img => img.primary)

            return {
                id: p.id,
                business_id: p.business_id ?? "",
                name: name,
                description: p.description,
                image_url: primaryImage?.path ?? "",
                price: price,
                final_price: finalPrice,
                price_usd: price_usd,
                final_price_usd: finalPriceUsd,
                discount_label: label ?? undefined,
                is_featured: p.is_featured,
                category: p.category,
                stock: p.stock,
                um: p.um,
                um_value: p.um_value,
                min_buy: p.min_buy,
                format: p.format,
                format_value: p.format_value,
            }
        }) : [];

    return (
        <BusinessCatalog products={allProducts} business={business!}/>
    )
}
