import {z} from 'zod'
import {ActiveStatus, MeasureUnit} from '@/types';
import {ServiceSchema} from '@/lib/schemas/service';

const um = z.enum([
    MeasureUnit.kg,
    MeasureUnit.gramo,
    MeasureUnit.libra,
    MeasureUnit.onza,
    MeasureUnit.metro,
    MeasureUnit.cm,
    MeasureUnit.mm,
    MeasureUnit.litro,
    MeasureUnit.ml,
    MeasureUnit.galon,
    MeasureUnit.m2,
    MeasureUnit.cm2,
    MeasureUnit.unidad,
    MeasureUnit.paquete,
    MeasureUnit.caja,
]);

export const ProductSchema = ServiceSchema.extend({
    business_category_id: z.string().optional().nullable(),
    is_featured: z.boolean().optional(),
    um: um.optional(),
    um_value: z.number().optional(),
    stock: z.number().optional(),
    min_buy: z.number().optional(),
    format: um.optional(),
    format_value: z.number().optional(),
});

export const UpdateStockSchema = z.object({
    quantity: z.coerce.number().int({ message: 'Cantidad requerida' }).positive()
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
    business_id: z.string(),
    services: z.array(ImportProductSchema).min(1, "Debe enviar al menos un producto o servicio"),
    disable_others: z.boolean()
})

export const UpdateProductStockSchema = z.object({
    item_type: z.enum(["service", "product"]).default("product").refine(val => val == 'product', {
        error: 'Debe ser de tipo producto'
    }),
    sku: z.string({ error: 'El SKU es requerido'}),
    stock: z.number({ error: 'El cantidad existencia es requerida'}).min(0, { error: 'Debe ser mayor o igual que 0'}).default(0),
})

export const ImportProductsStockSchema = z.object({
    products: z.array(UpdateProductStockSchema).min(1, "Debe enviar al menos un producto"),
})

export type ProductFormValues = z.infer<typeof ProductSchema>;
export type ProductsFilterValues = z.infer<typeof ProductsFilterSchema>;
export type ImportPayloadValues = z.infer<typeof ImportPayloadSchema>;
export type ImportProductValues = z.infer<typeof ImportProductSchema>;
export type UpdateStockInput = z.input<typeof UpdateStockSchema>;
export type UpdateStockOutput = z.output<typeof UpdateStockSchema>;
export type ImportProductsStockValues = z.output<typeof ImportProductsStockSchema>;

export interface ImportServiceRow extends ImportProductValues {
    _rowIndex: number
    _selected: boolean
    _status: "new" | "update"
    _errors: Record<string, string>
}

export type MetaDataService = {
    asd: string;
}

export const TEMPLATE_COLUMNS = [
    { header: "name", description: "Nombre del producto/servicio (requerido)" },
    { header: "description", description: "Descripción del producto/servicio" },
    { header: "price", description: "Precio (número)" },
    { header: "price_usd", description: "Precio en USD (número)" },
    { header: "item_type", description: "Tipo: Servicio o Producto" },
    // { header: "is_active", description: "Activo: SI o NO" },
    { header: "is_featured", description: "Destacado: SI o NO" },
    { header: "sku", description: "SKU - Identificador único (para actualizar existentes, Ej: PRD-00001 o SRV-00002)" },
    { header: "um", description: "Unidad medida" },
    { header: "um_value", description: "Valor UM" },
    { header: "stock", description: "Existencia (número)" },
    { header: "min_buy", description: "Compra mínima (número)" },
    { header: "format", description: "Formato UM" },
    { header: "format_value", description: "Valor formato UM" },
] as const
