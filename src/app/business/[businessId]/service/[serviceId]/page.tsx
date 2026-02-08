import { notFound } from "next/navigation"
import { getServiceById } from "@/lib/actions/service"
import {Business, Product} from "@/types"
import { buildServiceMetadata } from "./service.metadata"
import { Metadata } from "next"
import ProductPageClient from "@/components/client/product-page-client";
import {getBusinessById} from "@/lib/actions/business";

/* SEO */
export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ businessId: string; serviceId: string }>
}): Promise<Metadata> {
    const { serviceId } = await params
    return buildServiceMetadata(serviceId)
}

/* PAGE */
export default async function Page({
                                       params,
                                   }: {
    params: Promise<{ businessId: string; serviceId: string }>
}) {
    const { businessId, serviceId } = await params

    const product = await getServiceById<Product>(serviceId)
    const business = await getBusinessById(businessId)

    if (!product || product.business_id !== businessId || !business.success) {
        notFound()
    }

    return <ProductPageClient product={product} business={business.data} />
}
