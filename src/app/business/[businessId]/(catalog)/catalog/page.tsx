import { notFound } from "next/navigation"
import { getServiceById } from "@/lib/actions/service"
import {Business, Product} from "@/types"
import { Metadata } from "next"
import ProductPageClient from "@/components/client/product-page-client";
import {getBusinessById} from "@/lib/actions/business";
import {listProducts} from "@/lib/actions/product";
import {applyDiscount} from "@/lib/utils";
import BusinessCatalog from "@/components/client/business-catalog";
import NavBar from "@/components/layout/nav-bar";
import FooterSection from "@/components/layout/footer-section";

/* PAGE */
export default async function Page({
                                       params,
                                   }: {
    params: Promise<{ businessId: string }>
}) {
    const { businessId } = await params

    const res = await getBusinessById(businessId)
    const response = await listProducts({business_id: businessId, page: 0, limit: 1000})

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
                category: p.category
            }
        }) : [];

    return (
        <BusinessCatalog products={allProducts} business={res.data}/>
    )
}
