import {z} from 'zod'
import {ActiveStatus} from '@/types';
import {ServiceSchema} from '@/lib/schemas/service';

export const ProductSchema = ServiceSchema.extend({
    business_category_id: z.string().optional().nullable(),
    is_featured: z.boolean().optional(),
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

export const ImportProductSchema = ProductSchema.extend({
    item_type: z.enum(["service", "product"]).default("service"),
});

export const ImportPayloadSchema = z.object({
    services: z.array(ImportProductSchema).min(1, "Debe enviar al menos un producto o servicio"),
})

export type ProductFormValues = z.infer<typeof ProductSchema>;
export type ProductsFilterValues = z.infer<typeof ProductsFilterSchema>;
export type ImportPayloadValues = z.infer<typeof ImportPayloadSchema>;
export type ImportProductValues = z.infer<typeof ImportProductSchema>;

export interface ImportServiceRow extends ImportProductValues {
    _rowIndex: number
    _selected: boolean
    _status: "new" | "update"
    _errors: Record<string, string>
}

export const TEMPLATE_COLUMNS = [
    { header: "name", description: "Nombre del producto/servicio (requerido)" },
    { header: "description", description: "Descripción del producto/servicio" },
    { header: "price", description: "Precio (número)" },
    { header: "price_usd", description: "Precio en USD (número)" },
    { header: "item_type", description: "Tipo: Servicio o Producto" },
    // { header: "is_active", description: "Activo: SI o NO" },
    { header: "is_featured", description: "Destacado: SI o NO" },
    { header: "sku", description: "SKU - Identificador único (para actualizar existentes, Ej: PRD-0001 o SRV-0002)" },
] as const
