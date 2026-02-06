import { notFound } from "next/navigation"
import { getServiceById } from "@/lib/actions/service"
import { Product } from "@/types"
import { buildServiceMetadata } from "./service.metadata"
import { Metadata } from "next"
import ProductPageClient from "@/components/client/product-page-client";

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

    if (!product || product.business_id !== businessId) {
        notFound()
    }

    return <ProductPageClient product={product} />
}
