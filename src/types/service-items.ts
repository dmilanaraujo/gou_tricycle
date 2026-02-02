import {BusinessCategory} from "@/types/business";

export type ServiceItems = {
    id: string
    name: string
    image_url: string
    price: number
    final_price: number
    price_usd: number
    final_price_usd: number
    // category: BusinessCategory | null
    discount_label?: string
    is_featured: boolean
}