"use client"

import { Button } from "@/components/ui/button"
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
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

const initialValues: Partial<ServiceFormValues> = {
	id: '',
	name: '',
	description: '',
	price: 0,
}
export function ServiceSheet() {
	const { openSheet, setOpenSheet, isEditing, closeSheet, openForCreate, editingService } = useServiceStore();
	
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
				result = await createService(data)
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
		<Sheet open={openSheet} onOpenChange={setOpenSheet}>
			<SheetTrigger asChild>
				<Button onClick={openForCreate}>
					<PlusIcon className="h-4 w-4" />
					<span className="hidden lg:inline">Adicionar Servicio</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="right" className="w-full flex flex-col max-h-screen">
				<div className="flex flex-col h-full">
					<SheetHeader className="border-b shadow-xs">
						<SheetTitle>{!isEditing() ? "Registrar Servicio" : "Modificar Servicio"}</SheetTitle>
					</SheetHeader>
					
					<div className="flex-1 overflow-y-auto overscroll-contain py-2">
						<ServiceForm form={form} isEdit={!!editingService}/>
					</div>
					
					<SheetFooter className="flex flex-row justify-end items-center gap-2 border-t shadow-sm pt-4 shrink-0">
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
								{isCreatingService && <Loader2 className="h-4 w-4 animate-spin" />}
								{isCreatingService ? 'Guardando...' : "Guardar y Continuar"}
							</Button>
						)}
						<Button
							size="sm"
							disabled={isCreatingService || isUpdatingService}
							onClick={form.handleSubmit(handleSave)}
						>
							{(isCreatingService || isUpdatingService) && <Loader2 className="h-4 w-4 animate-spin" />}
							{(isCreatingService || isUpdatingService) ? "Guardando..." : "Guardar"}
						</Button>
					</SheetFooter>
				</div>
			</SheetContent>
		</Sheet>
	)
}
