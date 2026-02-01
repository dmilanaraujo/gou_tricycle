import {BusinessCategory} from "@/types/business";

export type ServiceItems = {
    id: string
    name: string
    image_url: string
    price: number
    final_price: number
    // category: BusinessCategory | null
    discount_label?: string
    is_featured: boolean
}