import { z } from 'zod'
import {VehicleTypeEnum} from '@/types';

export const BusinessFiltersSchema = z.object({
	province: z.string().optional(),
	municipality: z.string().optional(),
	rating: z.number().optional(),
	vehicleType: z.enum(VehicleTypeEnum).optional(),
})


export type BusinessFiltersValues = z.infer<typeof BusinessFiltersSchema>
