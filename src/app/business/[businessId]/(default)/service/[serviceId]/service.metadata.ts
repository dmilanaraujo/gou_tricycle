import { getServiceById } from "@/lib/actions/service"
import { Product } from "@/types"
import type { Metadata } from "next"

export async function buildServiceMetadata(
    serviceId: string
): Promise<Metadata> {
    const product = await getServiceById<Product>(serviceId)

    if (!product) {
        return { title: "Producto no encontrado" }
    }

    return {
        title: product.name,
        description: product.description ?? "",
        openGraph: {
            title: product.name,
            description: product.description ?? "",
            images: product.images?.[0]?.path
                ? [product.images[0].path]
                : [],
        },
    }
}
