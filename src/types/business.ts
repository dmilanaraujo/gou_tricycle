import {VehicleTypeEnum} from "@/types/index";
import {BucketImage} from '@/components/ui/file-upload';
import {IconName} from 'lucide-react/dynamic';

export const PROMOTION_TYPES = ['nuevo', 'destacado', 'popular', 'recomendado', 'en_oferta', 'envio_gratis', 'top_valorado'] as const

export type PromotionType = typeof PROMOTION_TYPES[number]

export type Business = {
    id: string;
    slug: string;
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
    categories: BusinessSystemCategory[];
    vehicles?: {
        id: string
        vehicle_type: VehicleTypeEnum
    }[];
    images: BucketImage[];
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

export type BusinessSystemCategory = {
        id: string
        name: string
        slug: string
}

export type BusinessCategory = {
        id: string
        name: string
        slug: string
        icon?: IconName
}

export type BusinessDiscount = {
        id: string
        type: string
        value: number
        starts_at?: string
        ends_at?: string
        is_active: boolean
}

export type Service = {
    id: string;
    business_id?: string;
    name?: string;
    description: string;
    price?: number;
    price_usd?: number;
    is_active: boolean;
    product_discounts_id?: string
    sku?: string
    images: BucketImage[];
    discount?: BusinessDiscount;
}

export type Product = Service & {
    business_category_id?: string
    is_featured: boolean;
    category?: BusinessCategory;
    um?: MeasureUnit;
    stock: number;
    um_value: number;
    min_buy: number;
}

export enum ImageType {
    logo = 'logo',
    banner = 'banner',
    normal = 'normal'
}

export enum MeasureUnit {
    kg = 'kg',
    gramo = 'gramo',
    libra = 'libra',
    onza = 'onza',
    metro = 'metro',
    cm = 'cm',
    mm = 'mm',
    litro = 'litro',
    ml = 'ml',
    galon = 'galon',
    m2 = 'm2',
    cm2 = 'cm2',
    unidad = 'unidad',
    paquete = 'paquete',
    caja = 'caja',
}
