import {VehicleTypeEnum} from "@/types/index";

export const PROMOTION_TYPES = ['nuevo', 'destacado', 'popular', 'recomendado', 'en_oferta', 'envio_gratis', 'top_valorado'] as const

export type PromotionType = typeof PROMOTION_TYPES[number]

export type Business = {
    id: string;
    phone: string;
    whatsapp: string;
    name: string;
    description: string;
    logo: string;
    banner: string;
    province: string;
    municipality: string;
    address: string;
    reviews: number;
    rating: number;
    deliveryTime?: number;
    deliveryFee?: number;
    promotion: PromotionType;
    featured: boolean;
    is_active: boolean;
    section: BusinessSection;
    categories: BusinessCategory[];
    vehicles?: {
        id: string
        vehicle_type: VehicleTypeEnum
    }[];
};

export const promotions = [
    { value: "nuevo", label: "Nuevo" },
    { value: "destacado", label: "Destacado" },
    { value: "popular", label: "Popular" },
    { value: "recomendado", label: "Recomendado" },
    { value: "en_oferta", label: "En oferta" },
    { value: "envio_gratis", label: "Envío gratis" },
    { value: "top_valorado", label: "Top valorado" },
];

export type BusinessSection = {
        id: string
        name: string
        slug: string
}

export type BusinessCategory = {
        id: string
        name: string
        slug: string
}

export type Service = {
    id?: string;
    business_id?: string;
    name?: string;
    description?: string;
    price?: number;
    is_active: boolean;
}
