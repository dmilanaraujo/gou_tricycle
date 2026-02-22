"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {useLoadingRouter} from '@/providers/navigation-loading-provider';
import {BusinessFormValues, BusinessSchema} from '@/lib/schemas/business';
import {useBusiness} from '@/providers/business-provider';
import {BusinessForm} from '@/components/business/business-form';
import {Button} from '@/components/ui/button';
import {Loader2} from 'lucide-react';
import {useUpdateBusiness} from '@/hooks/api/business';

export function BusinessEdit() {
	const business = useBusiness()
	const { mutateAsync: updateBusiness, isPending: isUpdatingBusiness } = useUpdateBusiness();
	
	const router = useLoadingRouter();
	const form = useForm<BusinessFormValues>({
		resolver: zodResolver(BusinessSchema),
		defaultValues: {
			name: business.name  || '',
			province: business.province || '',
			municipality: business.municipality || '',
			address: business.address || '',
			description: business.description || '',
			whatsapp: business.whatsapp || '',
			section_id: business.section.id || '',
		},
	});
	
	// 2. Define a submit handler.
	async function handleSave(values: BusinessFormValues) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		try {
			const response = await updateBusiness({...values, id: business.id});
			if (!response.success) {
				response.errors?.forEach((error) => {
					toast.error('Error', {
						description: error.message,
					});
				});
				return;
			}
			toast.success('Hecho!', {
				description: 'Datos actualizados',
			});
			router.refresh()
		} catch (e) {
			toast.error('Error', {
				// @ts-expect-error only
				description: e.message
			});
		}
		
	}
	
	return (
		<div className='w-full'>
			<div className="no-scrollbar overflow-y-auto px-0">
				<BusinessForm form={form}/>
			</div>
			
			<div className="flex justify-end py-4">
				<Button
					size="sm"
					disabled={isUpdatingBusiness}
					onClick={form.handleSubmit(handleSave)}
					className={'w-full md:w-auto'}
				>
					{isUpdatingBusiness && <Loader2 className="h-4 w-4 animate-spin"/>}
					{isUpdatingBusiness ? 'Guardando...' : 'Guardar'}
				</Button>
			</div>
		</div>
	)
}
