import {BusinessCategory} from "@/types/business";

export type ServiceItems = {
    id: string
    name: string
    description: string
    image_url: string
    price: number
    final_price: string
    price_usd: number
    final_price_usd: string
    category?: BusinessCategory
    discount_label?: string
    is_featured: boolean
}