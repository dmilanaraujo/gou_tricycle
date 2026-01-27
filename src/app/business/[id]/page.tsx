import { getBusinessById, getBusinessReviews } from "@/lib/actions/business"
import { notFound } from "next/navigation"
import BusinessDetail from "@/components/client/business-detail";
import {getBusinessfeaturedProducts, getBusinessProducts, ProductWithPricing} from "@/lib/actions/product";
import {applyDiscount, getPublicImageUrl} from "@/lib/utils";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const res = await getBusinessById(id)
    const { data: reviews } = await getBusinessReviews(id)
    const rawProducts = await getBusinessProducts(id)

    const featuredRaw = await getBusinessfeaturedProducts(id)
    const featuredItems = featuredRaw
        .filter(p => p.is_featured)
        .map(p => {
            const discount = p.discount?.[0] ?? null
            const { finalPrice, label } = applyDiscount(p.base_price, discount)

            return {
                id: p.id,
                name: p.name,
                image_url: getPublicImageUrl(p.image_url),
                base_price: p.base_price,
                final_price: finalPrice,
                discount_label: label ?? undefined,
            }
        })

    const products: ProductWithPricing[] = rawProducts.map(p => ({
        ...p,
        category: p.category?.[0] ?? null,
    }))


    if (!res?.success || !res.data) notFound()

    return (
        <BusinessDetail
            business={res.data}
            reviews={reviews ?? []}
            products={products ?? []}
            featuredItems={featuredItems}
        />
    )
}
