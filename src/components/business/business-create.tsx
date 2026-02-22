"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {useLoadingRouter} from '@/providers/navigation-loading-provider';
import {BusinessFormValues, BusinessSchema} from '@/lib/schemas/business';
import {BusinessForm} from '@/components/business/business-form';
import {Button} from '@/components/ui/button';
import {Loader2} from 'lucide-react';
import {useCreateBusiness} from '@/hooks/api/business';

const initialValues: Partial<BusinessFormValues> = {
	name: '',
	province: '',
	municipality: '',
	address: '',
	whatsapp: '',
}

export function BusinessCreate() {

	const { mutateAsync: updateCreate, isPending: isCreatingBusiness } = useCreateBusiness();
	
	const router = useLoadingRouter();
	const form = useForm<BusinessFormValues>({
		resolver: zodResolver(BusinessSchema),
		defaultValues: initialValues,
	});
	
	// 2. Define a submit handler.
	async function handleSave(values: BusinessFormValues) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		try {
			const response = await updateCreate(values);
			if (!response.success) {
				response.errors?.forEach((error) => {
					toast.error('Error', {
						description: error.message,
					});
				});
				return;
			}
			toast.success('Hecho!', {
				description: 'Negocio creado',
			});
			router.push('/me')
		} catch (e) {
			toast.error('Error', {
				// @ts-expect-error only
				description: e.message
			});
		}
		
	}
	
	return (
		<div className='max-w-7xl'>
			<div className="no-scrollbar overflow-y-auto px-0">
				<BusinessForm form={form}/>
			</div>
			
			<div className="flex justify-end py-4">
				<Button
					size="sm"
					disabled={isCreatingBusiness}
					onClick={form.handleSubmit(handleSave)}
					className={'w-full md:w-auto'}
				>
					{isCreatingBusiness && <Loader2 className="h-4 w-4 animate-spin"/>}
					{isCreatingBusiness ? 'Creando...' : 'Crear'}
				</Button>
			</div>
		</div>
	)
}
