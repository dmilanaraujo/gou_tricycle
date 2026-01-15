import { z } from 'zod'
import {VehicleTypeEnum} from '@/types';

export const BusinessFiltersSchema = z.object({
	province: z.string().min(1, 'La provincia es requerida'),
	referenceMunicipality: z.string().min(1, 'El municipio es requerido'),
	filterMunicipalities: z.array(z.string().min(1)).default([]),
	// vehicleTypes: z.array(z.enum(VehicleTypeEnum)).min(1, 'Al menos un tipo de vehículo'),
})

export type BusinessFiltersValues = z.infer<typeof BusinessFiltersSchema>
