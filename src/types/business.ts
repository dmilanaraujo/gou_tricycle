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
    reviews: number;
    rating: number;
    deliveryTime?: number;
    deliveryFee?: number;
    promotion: PromotionType;
    featured: boolean;
    is_active: boolean;
    sections: BusinessSection[];
    categories: BusinessCategory[];
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

// export type BusinessSection = {
//     section: {
//         id: string
//         name: string
//         slug: string
//     }
// }
//
// export type BusinessCategory = {
//     category: {
//         id: string
//         name: string
//         slug: string
//     }
// }