import { notFound } from "next/navigation"
import { getServiceById } from "@/lib/actions/service"
import { Product} from "@/types"
import { buildServiceMetadata } from "./service.metadata"
import { Metadata } from "next"
import ProductPageClient from "@/components/client/product-page-client";
import { getBusinessBySlugCachedData} from '@/lib/actions/business';

/* SEO */
export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ slug: string; serviceId: string }>
}): Promise<Metadata> {
    const { serviceId } = await params
    return buildServiceMetadata(serviceId)
}

/* PAGE */
export default async function Page({ params }: {
    params: Promise<{ slug: string; serviceId: string }>
}) {
    const { slug, serviceId } = await params

    const product = await getServiceById<Product>(serviceId)
    const business = await getBusinessBySlugCachedData(slug)

    if (!product || product.business_id !== business!.id) {
        notFound()
    }

    return <ProductPageClient product={product} business={business!} />
}
