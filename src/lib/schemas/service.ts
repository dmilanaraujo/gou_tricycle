import {z} from 'zod'
import {ActiveStatus} from '@/types';

export const ServiceSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "El nombre es obligatorio"),
    description: z.string().optional(),
    price: z.number().optional(),
    price_usd: z.number().optional(),
    product_discounts_id: z.string().optional().nullable(),
    sku: z.string().optional(),
});

export const ServicesFilterSchema = z.object({
    columnId: z.string().nullable().optional().nullable(),
    value: z.string().optional().nullable(),
    business_id: z.string().optional(),
    statusFilters: z.object({
        [ActiveStatus.active]: z.boolean().optional().nullable(),
        [ActiveStatus.inactive]: z.boolean().optional().nullable(),
    }).optional().nullable(),
});


export type ServiceFormValues = z.infer<typeof ServiceSchema>;
export type ServicesFilterValues = z.infer<typeof ServicesFilterSchema>;
