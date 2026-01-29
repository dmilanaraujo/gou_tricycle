import {z} from 'zod'
import {VehicleTypeEnum} from '@/types';

export const BusinessFiltersSchema = z.object({
	province: z.string().optional(),
	municipality: z.string().optional(),
	rating: z.number().optional(),
	vehicleType: z.enum(VehicleTypeEnum).optional(),
	section: z.string().optional().nullable(),
	category: z.string().optional().nullable(),
	q: z.string().optional().nullable(),
})

const SlugSchema = z.string().slugify();

export const BusinessCategorySchema = z.object({
	id: z.number().optional(),
	name: z.string({ error: 'El nombre es requerido'}),
	icon: z.string().optional(),
	// slug: z.string().optional(), // se genera
}).transform((data) => ({
	...data,
	slug: SlugSchema.parse(data.name),
}))

export type BusinessFiltersValues = z.infer<typeof BusinessFiltersSchema>
export type BusinessCategoryValues = z.infer<typeof BusinessCategorySchema>
