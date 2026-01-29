"use client"

import { Button } from "@/components/ui/button"
import { Loader2, PlusIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { useCreateService, useUpdateService } from "@/hooks/api/service"
import {useEffect} from 'react';
import {useServiceStore} from '@/store/service';
import {showActionErrors} from '@/lib/utils';
import {Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger} from '@/components/ui/drawer';
import {useIsMobile} from '@/hooks/use-mobile';
import {Business} from '@/types';
import {ProductFormValues, ProductSchema} from '@/lib/schemas/product';
import {ProductForm} from '@/components/product/product-form';

const initialValues: Partial<ProductFormValues> = {
	id: '',
	name: '',
	description: '',
	price: 0,
}
export function ProductSheet({ profile }: { profile: Business }) {
	const { openSheet, setOpenSheet, isEditing, closeSheet, openForCreate, editingService } = useServiceStore();
	const isMobile = useIsMobile();
	const { mutateAsync: createProduct, isPending: isCreatingProduct } = useCreateService();
	const { mutateAsync: updateProduct, isPending: isUpdatingProduct } = useUpdateService();
	
	const form = useForm<ProductFormValues>({
		resolver: zodResolver(ProductSchema),
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
	
	const handleSave = async (data: ProductFormValues) => {
		const toastId = toast.loading("Guardando producto...")
		
		try {
			let result;
			if (isEditing()) {
				result = await updateProduct({  ...editingService, ...data})
			} else {
				result = await createProduct(data)
			}
			if (!result.success) {
				showActionErrors(result.errors, toastId)
				return;
			}
			toast.success("Producto guardado con éxito", { id: toastId })
			closeSheet();
			form.reset()
			// onSuccess?.()
		} catch (err) {
			console.error(err)
			toast.error("Error al guardar la producto", { id: toastId })
		}
	}
	
	const handleSaveAndContinue = async (data: ProductFormValues) => {
		const toastId = toast.loading("Guardando producto...")
		
		try {
			const result = await createProduct(data);
			if (!result.success) {
				showActionErrors(result.errors, toastId)
				return;
			}
			toast.success("Producto guardado con éxito", { id: toastId })
			form.reset()
			// onSuccess?.()
		} catch (err) {
			console.error(err)
			toast.error("Error al guardar la producto", { id: toastId })
		}
	}
	
	return (
		<Drawer open={openSheet} onOpenChange={setOpenSheet} direction={isMobile ? 'bottom' : 'right'}>
			<DrawerTrigger asChild>
				<Button onClick={openForCreate}>
					<PlusIcon className="h-4 w-4" />
					<span className="hidden lg:inline">Adicionar Producto</span>
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{!isEditing() ? 'Registrar Producto' : 'Modificar Producto'}</DrawerTitle>
					{/*<DrawerDescription>Set your daily activity goal.</DrawerDescription>*/}
				</DrawerHeader>
				<div className="no-scrollbar overflow-y-auto px-4">
					<div className="flex-1 overflow-y-auto overscroll-contain py-2">
						<ProductForm profile={profile} form={form} isEdit={!!editingService}/>
					</div>
				</div>
				
				<DrawerFooter className="flex flex-row justify-end items-center gap-2 border-t shadow-sm pt-4 shrink-0">
					<Button
						size="sm"
						variant="outline"
						disabled={isCreatingProduct || isUpdatingProduct}
						onClick={() => closeSheet()}
					>
						Cancelar
					</Button>
					{!isEditing() && (
						<Button
							size="sm"
							disabled={isCreatingProduct}
							// onClick={handleSaveAndContinue}
							onClick={form.handleSubmit(handleSaveAndContinue)}
						>
							{isCreatingProduct && <Loader2 className="h-4 w-4 animate-spin"/>}
							{isCreatingProduct ? 'Guardando...' : 'Guardar y Continuar'}
						</Button>
					)}
					<Button
						size="sm"
						disabled={isCreatingProduct || isUpdatingProduct}
						onClick={form.handleSubmit(handleSave)}
					>
						{(isCreatingProduct || isUpdatingProduct) && <Loader2 className="h-4 w-4 animate-spin"/>}
						{(isCreatingProduct || isUpdatingProduct) ? 'Guardando...' : 'Guardar'}
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
