import { getBusinessById, getBusinessReviews } from "@/lib/actions/business"
import { notFound } from "next/navigation"
import BusinessDetail from "@/components/client/business-detail";
import {applyDiscount} from "@/lib/utils";
import {listProducts} from "@/lib/actions/product";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const res = await getBusinessById(id)
    const { data: reviews } = await getBusinessReviews(id)
    const response = await listProducts({business_id: id, page: 0, limit: 10})

    const rawProducts = response.success
        ? response.data
        : {data: []}

    const allProducts = rawProducts ? rawProducts.data
        .map(p => {
            const price = p.price ?? 0
            const price_usd = p.price_usd ?? 0
            const name = p.name ?? ""

            const { finalPrice, finalPriceUsd, label } = applyDiscount(price, price_usd, p.discount)
            const primaryImage = p.images?.find(img => img.primary === true)

            return {
                id: p.id,
                name: name,
                image_url: primaryImage?.path ?? "",
                price: price,
                final_price: finalPrice,
                price_usd: price_usd,
                final_price_usd: finalPriceUsd,
                discount_label: label ?? undefined,
                is_featured: p.is_featured,
                category: p.category
            }
        }) : [];

    const featuredItems = rawProducts ? rawProducts.data
        .filter(p => p.is_featured)
        .map(p => {
            const price = p.price ?? 0
            const price_usd = p.price_usd ?? 0
            const name = p.name ?? ""

            const { finalPrice, finalPriceUsd, label } = applyDiscount(price, price_usd, p.discount)
            const primaryImage = p.images?.find(img => img.primary === true)

            return {
                id: p.id,
                name: name,
                image_url: primaryImage?.path ?? "",
                price: price,
                final_price: finalPrice,
                price_usd: price_usd,
                final_price_usd: finalPriceUsd,
                discount_label: label ?? undefined,
                is_featured: p.is_featured,
                category: p.category
            }
        }) : []

    if (!res?.success || !res.data) notFound()

    return (
        <BusinessDetail
            business={res.data}
            reviews={reviews ?? []}
            products={allProducts}
            featuredItems={featuredItems}
        />
    )
}
