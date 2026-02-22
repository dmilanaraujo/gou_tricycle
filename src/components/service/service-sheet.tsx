"use client"

import { Button } from "@/components/ui/button"
import { Loader2, PlusIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { ServiceForm } from "@/components/service/service-form"
import { useCreateService, useUpdateService } from "@/hooks/api/service"
import {useEffect} from 'react';
import {ServiceFormValues, ServiceSchema} from '@/lib/schemas/service';
import {useServiceStore} from '@/store/service';
import {showActionErrors} from '@/lib/utils';
import {Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger} from '@/components/ui/drawer';
import {useIsMobile} from '@/hooks/use-mobile';
import {useBusiness} from '@/providers/business-provider';

const initialValues: Partial<ServiceFormValues> = {
	id: '',
	name: '',
	description: '',
	price: 0,
}
export function ServiceSheet() {
	const { openSheet, setOpenSheet, isEditing, closeSheet, openForCreate, editingService } = useServiceStore();
	const isMobile = useIsMobile();
	const business = useBusiness();
	const { mutateAsync: createService, isPending: isCreatingService } = useCreateService();
	const { mutateAsync: updateService, isPending: isUpdatingService } = useUpdateService();
	
	const form = useForm<ServiceFormValues>({
		resolver: zodResolver(ServiceSchema),
		defaultValues: initialValues,
		mode: 'onBlur'
	})
	
	useEffect(() => {
		if (!openSheet) {
			form.reset(initialValues);
			closeSheet();
		}
	}, [openSheet]);
	
	useEffect(() => {
		if (editingService) {
			form.reset(editingService);
		}
	}, [editingService]);
	
	const handleSave = async (data: ServiceFormValues) => {
		const toastId = toast.loading("Guardando servicio...")
		
		try {
			let result;
			if (isEditing()) {
				result = await updateService({  ...editingService, ...data})
			} else {
				result = await createService({...data, business_id: business.id})
			}
			if (!result.success) {
				showActionErrors(result.errors, toastId)
				return;
			}
			toast.success("Servicio guardado con éxito", { id: toastId })
			closeSheet();
			form.reset()
			// onSuccess?.()
		} catch (err) {
			console.error(err)
			toast.error("Error al guardar la servicio", { id: toastId })
		}
	}
	
	const handleSaveAndContinue = async (data: ServiceFormValues) => {
		const toastId = toast.loading("Guardando servicio...")
		
		try {
			const result = await createService(data);
			if (!result.success) {
				showActionErrors(result.errors, toastId)
				return;
			}
			toast.success("Servicio guardado con éxito", { id: toastId })
			form.reset()
			// onSuccess?.()
		} catch (err) {
			console.error(err)
			toast.error("Error al guardar la servicio", { id: toastId })
		}
	}
	
	return (
		<Drawer open={openSheet} onOpenChange={setOpenSheet} direction={isMobile ? 'bottom' : 'right'} dismissible={false}>
			<DrawerTrigger asChild>
				<Button onClick={openForCreate} className={'cursor-pointer'}>
					<PlusIcon className="h-4 w-4" />
					<span className="hidden lg:inline">Adicionar Servicio</span>
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{!isEditing() ? 'Registrar Servicio' : 'Modificar Servicio'}</DrawerTitle>
					{/*<DrawerDescription>Set your daily activity goal.</DrawerDescription>*/}
				</DrawerHeader>
				<div className="no-scrollbar overflow-y-auto p-4">
					<ServiceForm form={form}/>
				</div>
				
				<DrawerFooter className="flex flex-row justify-end items-center gap-2 border-t shadow-sm pt-4 shrink-0">
					<Button
						size="sm"
						variant="outline"
						disabled={isCreatingService || isUpdatingService}
						onClick={() => closeSheet()}
					>
						Cancelar
					</Button>
					{!isEditing() && (
						<Button
							size="sm"
							disabled={isCreatingService}
							// onClick={handleSaveAndContinue}
							onClick={form.handleSubmit(handleSaveAndContinue)}
						>
							{isCreatingService && <Loader2 className="h-4 w-4 animate-spin"/>}
							{isCreatingService ? 'Guardando...' : 'Guardar y Continuar'}
						</Button>
					)}
					<Button
						size="sm"
						disabled={isCreatingService || isUpdatingService}
						onClick={form.handleSubmit(handleSave)}
					>
						{(isCreatingService || isUpdatingService) && <Loader2 className="h-4 w-4 animate-spin"/>}
						{(isCreatingService || isUpdatingService) ? 'Guardando...' : 'Guardar'}
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
