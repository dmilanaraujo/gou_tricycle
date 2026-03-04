import { getBusinessBySlugCachedData, getBusinessReviews} from '@/lib/actions/business'
import BusinessDetail from "@/components/client/business-detail";
import {applyDiscount} from "@/lib/utils";
import {listProducts} from "@/lib/actions/product";
import {ServiceItems} from '@/types/service-items';
import {Product} from '@/types';

export default async function Page({ params }: { params: Promise<{ slug: string }>}) {
    const { slug } = await params

    const business = await getBusinessBySlugCachedData(slug)
    const { data: reviews } = await getBusinessReviews(business!.id)
    const response = await listProducts({business_id: business!.id, page: 0, limit: 1000})

    const rawProducts = response.success
        ? response.data
        : {data: []}
    
    const mapToServiceItem = (p: Product): ServiceItems => {
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
            stock: p.stock || 0,
            min_buy: p.min_buy || 0,
            um: p.um ?? undefined,
            format: p.format ?? undefined,
            um_value: p.um_value ?? undefined,
            format_value: p.format_value ?? undefined,
        }
    }

    const allProducts = rawProducts ? rawProducts.data
        .map(mapToServiceItem) : [];

    const featuredItems = rawProducts ? rawProducts.data
        .filter(p => p.is_featured)
        .map(mapToServiceItem) : []

    return (
        <BusinessDetail
            business={business!}
            reviews={reviews ?? []}
            products={allProducts}
            featuredItems={featuredItems}
        />
    )
}
