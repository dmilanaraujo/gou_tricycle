import {z} from 'zod'
import {VehicleTypeEnum} from '@/types';
import {isAfterOrEqual, isAfterToday} from '@/lib/utils';
import {startOfDay} from 'date-fns';

export const BusinessFiltersSchema = z.object({
	province: z.string().optional(),
	municipality: z.string().optional(),
	rating: z.number().optional(),
	vehicleType: z.enum(VehicleTypeEnum).optional(),
	section: z.string().optional().nullable(),
	category: z.string().optional().nullable(),
	q: z.string().optional().nullable(),
})

export const BusinessCategorySchema = z.object({
	id: z.number().optional(),
	name: z.string({ error: 'El nombre es requerido'}).min(1, "El nombre es requerido"),
	icon: z.string().optional(),
})

export const BusinessDiscountSchema = z.object({
	id: z.number().optional(),
	type: z.enum(['percentage', 'fixed'], {
		error: 'El tipo es requerido',
	}),
	value: z.coerce.number({ message: 'El valor es requerido' }).refine((val) => val !== 0, {
		message: "El valor no puede ser 0",
	}),
	starts_at: z.date({ error: 'La fecha de inicio es requerida'}).refine((val) => isAfterOrEqual(val), {
		message: "Debe ser mayor o igual al día de hoy",
	}),
	ends_at: z.date({ error: 'La fecha de fin es requerida'}).refine((val) => isAfterToday(val), {
		message: "Debe ser mayor o igual al día de hoy",
	}),
	is_active: z.boolean().optional(),
})
.refine((data) => startOfDay(data.ends_at) > startOfDay(data.starts_at), {
	message: "La fecha de fin debe ser posterior o igual a la de inicio",
	path: ["ends_at"],
});

export type BusinessFiltersValues = z.infer<typeof BusinessFiltersSchema>
export type BusinessCategoryValues = z.infer<typeof BusinessCategorySchema>
export type BusinessDiscountValues = z.infer<typeof BusinessDiscountSchema>

export type BusinessDiscountInput = z.input<typeof BusinessDiscountSchema>;
export type BusinessDiscountOutput = z.output<typeof BusinessDiscountSchema>;
