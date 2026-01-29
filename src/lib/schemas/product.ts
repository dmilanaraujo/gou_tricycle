import {z} from 'zod'
import {ActiveStatus} from '@/types';
import {ServiceSchema} from '@/lib/schemas/service';

export const ProductSchema = ServiceSchema.extend({
    business_category_id: z.uuid().optional(),
    image_url: z.url().optional(),
    is_featured: z.boolean().optional(),
    product_discounts_id: z.uuid().optional(),
    item_type: z.literal('product'),
});

export const ProductsFilterSchema = z.object({
    columnId: z.string().nullable().optional().nullable(),
    value: z.string().optional().nullable(),
    business_id: z.string().optional(),
    statusFilters: z.object({
        [ActiveStatus.active]: z.boolean().optional().nullable(),
        [ActiveStatus.inactive]: z.boolean().optional().nullable(),
    }).optional().nullable(),
});


export type ProductFormValues = z.infer<typeof ProductSchema>;
export type ProductsFilterValues = z.infer<typeof ProductsFilterSchema>;
