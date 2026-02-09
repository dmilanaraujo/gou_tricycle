"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { useUpdateService } from "@/hooks/api/service"
import {showActionErrors} from '@/lib/utils';
import {ServiceFormValues, ServiceSchema} from '@/lib/schemas/service';
import {ServiceForm} from '@/components/service/service-form';
import {Service} from '@/types';

export function ServiceEdit({ service }: { service: Service }) {
	const { mutateAsync: updateService, isPending: isUpdatingService } = useUpdateService();
	
	const form = useForm<ServiceFormValues>({
		resolver: zodResolver(ServiceSchema),
		defaultValues: service,
		mode: 'onBlur'
	})
	
	
	const handleSave = async (data: ServiceFormValues) => {
		const toastId = toast.loading("Actualizando servicio...")
		
		try {
			const result = await updateService({
					id: service.id,
					description: service.description,
					price: service.price,
					product_discounts_id: service.product_discounts_id,
					...data
			})
			if (!result.success) {
				showActionErrors(result.errors, toastId)
				return;
			}
			toast.success("Serviceo actualizado con éxito", { id: toastId })
			
		} catch (err) {
			console.error(err)
			toast.error("Error al guardar la servicio", { id: toastId })
		}
	}
	
	return (
		<div className=''>
			<div className="no-scrollbar overflow-y-auto px-0">
				<div className="flex-1 overflow-y-auto overscroll-contain py-2">
					<ServiceForm form={form}/>
				</div>
			</div>
			
			<div className="flex justify-end py-4">
				<Button
					size="sm"
					disabled={isUpdatingService}
					onClick={form.handleSubmit(handleSave)}
					className={'w-full md:w-auto'}
				>
					{isUpdatingService && <Loader2 className="h-4 w-4 animate-spin"/>}
					{isUpdatingService ? 'Guardando...' : 'Guardar'}
				</Button>
			</div>
		</div>
	)
}
