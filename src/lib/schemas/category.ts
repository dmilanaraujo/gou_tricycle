import { z } from 'zod'

export const CategorySchema = z.object({
	id: z.number().optional(),
	name: z.string({ error: 'El nombre es requerido'}),
})

export type CategoryFormValues = z.infer<typeof CategorySchema>
