"use client"

import { Button } from "@/components/ui/button"
import {Loader2, PlusCircle} from 'lucide-react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import {useEffect} from 'react';
import {showActionErrors} from '@/lib/utils';
import {Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger} from '@/components/ui/drawer';
import {useIsMobile} from '@/hooks/use-mobile';
import {useBusinessDiscountStore} from '@/store/business-discount';
import {useCreateBusinessDiscount} from '@/hooks/api/business';
import {BusinessDiscountSchema, BusinessDiscountValues} from '@/lib/schemas/business';
import {BusinessDiscountForm} from '@/components/business-discount/business-discount-form';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {BusinessDiscountList} from '@/components/business-discount/business-discount-list';
import {ScrollArea} from '@/components/ui/scroll-area';

const initialValues: Partial<BusinessDiscountValues> = {
	value: 0,
	type: undefined,
	starts_at: undefined,
	ends_at: undefined,
	is_active: false
}
export function BusinessDiscountDialog() {
	const { opened, setOpenDialog, openDialog, closeDialog } = useBusinessDiscountStore();
	const isMobile = useIsMobile();
	const { mutateAsync: createBusinessDiscount, isPending: isCreatingBusinessDiscount } = useCreateBusinessDiscount();
	
	const form = useForm<BusinessDiscountValues>({
		resolver: zodResolver(BusinessDiscountSchema),
		defaultValues: initialValues,
		mode: 'onSubmit'
	})
	
	useEffect(() => {
		if (!opened) {
			form.reset(initialValues);
			closeDialog();
		}
	}, [opened]);
	
	
	const handleSave = async (data: BusinessDiscountValues) => {
		const toastId = toast.loading("Guardando descuento...")
		
		try {
			const result = await createBusinessDiscount(data)
			if (!result.success) {
				showActionErrors(result.errors, toastId)
				return;
			}
			toast.success("Descuento guardada con éxito", { id: toastId })
			// closeDialog();
			form.reset()
			// onSuccess?.()
		} catch (err) {
			console.error(err)
			toast.error("Error al guardar la descuento", { id: toastId })
		}
	}
	if (isMobile) {
		return (
			<Drawer open={opened} onOpenChange={setOpenDialog}>
				<DrawerTrigger asChild>
					<div className="flex text-xs cursor-pointer text-blue-800 font-semibold">
						Gestione descuentos
					</div>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader className="text-left">
						<DrawerTitle>Gestione sus descuentos</DrawerTitle>
						<DrawerDescription>
							Adicione o elimine las descuentos que usará para sus productos o servicios
						</DrawerDescription>
					</DrawerHeader>
					<div className="no-scrollbar overflow-y-auto px-4">
						 <div className="flex items-end justify-between gap-2 overflow-y-auto overscroll-contain py-2">
							<BusinessDiscountForm form={form}/>
							<Button
								size="sm"
								disabled={isCreatingBusinessDiscount}
								onClick={form.handleSubmit(handleSave)}
							>
								{(isCreatingBusinessDiscount) && <Loader2 className="h-4 w-4 animate-spin"/>}
								{(isCreatingBusinessDiscount) ? 'Guardando...' : 'Guardar'}
							</Button>
						 </div>
						<ScrollArea>
							<BusinessDiscountList/>
						</ScrollArea>
					</div>
				</DrawerContent>
			</Drawer>
	)
	}
	return (
		<Dialog open={opened} onOpenChange={setOpenDialog}>
			<DialogTrigger asChild>
				<div className='flex text-xs cursor-pointer text-blue-800 font-semibold'>
					Gestione descuentos
				</div>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Gestione sus descuentos</DialogTitle>
					<DialogDescription>
						Adicione o elimine las descuentos que usará para sus productos o servicios
					</DialogDescription>
				</DialogHeader>
				<div className="no-scrollbar overflow-y-auto">
					 <div className="flex items-end justify-between gap-2 overflow-y-auto overscroll-contain py-2">
						<BusinessDiscountForm form={form}/>
						 <Button
							 size="icon"
							 disabled={isCreatingBusinessDiscount}
							 onClick={form.handleSubmit(handleSave)}
							 title='Crear descuento'
						 >
							 {isCreatingBusinessDiscount ? <Loader2 className="h-4 w-4 animate-spin"/> : <PlusCircle className="h-4 w-4"/>}
						 </Button>
					 </div>
					<ScrollArea className='min-h-72'>
						<BusinessDiscountList/>
					</ScrollArea>
				</div>
			</DialogContent>

		</Dialog>
		)
}
