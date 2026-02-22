"use client"

import { Button } from "@/components/ui/button"
import {Loader2, PlusCircle} from 'lucide-react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import {useEffect} from 'react';
import {cn, showActionErrors} from '@/lib/utils';
import {Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger} from '@/components/ui/drawer';
import {useIsMobile} from '@/hooks/use-mobile';
import {useBusinessDiscountStore} from '@/store/business-discount';
import {useCreateBusinessDiscount} from '@/hooks/api/business';
import {BusinessDiscountInput, BusinessDiscountOutput, BusinessDiscountSchema} from '@/lib/schemas/business';
import {BusinessDiscountForm} from '@/components/business-discount/business-discount-form';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {BusinessDiscountList} from '@/components/business-discount/business-discount-list';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Separator} from '@/components/ui/separator';
import {useBusiness} from '@/providers/business-provider';

const initialValues: Partial<BusinessDiscountInput> = {
	value: '',
	type: undefined,
	starts_at: undefined,
	ends_at: undefined,
	is_active: false
}
export function BusinessDiscountDialog() {
	const business = useBusiness();
	const { opened, setOpenDialog, openDialog, closeDialog } = useBusinessDiscountStore();
	const isMobile = useIsMobile();
	const { mutateAsync: createBusinessDiscount, isPending: isCreatingBusinessDiscount } = useCreateBusinessDiscount();
	
	const form = useForm<BusinessDiscountInput, any, BusinessDiscountOutput>({
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
	
	
	const handleSave = async (data: BusinessDiscountOutput) => {
		const toastId = toast.loading("Guardando descuento...")
		
		try {
			const result = await createBusinessDiscount({...data, business_id: business.id})
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
					<div className="no-scrollbar overflow-y-auto px-8">
						<div className={'flex flex-col justify-between gap-2 overflow-y-auto overscroll-contain py-2 items-center'}>
							<BusinessDiscountForm form={form}/>
							<Button
								size="sm"
								disabled={isCreatingBusinessDiscount}
								onClick={form.handleSubmit(handleSave)}
								className='cursor-pointer mt-3 w-full'
							>
								{(isCreatingBusinessDiscount) && <Loader2 className="h-4 w-4 animate-spin"/>}
								{(isCreatingBusinessDiscount) ? 'Creando...' : 'Crear'}
							</Button>
						</div>
						<Separator className={'my-2'}/>
						<ScrollArea className={'pb-8'}>
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
					<div className={'flex justify-between gap-2 overflow-y-auto overscroll-contain py-2 items-center'}>
						<BusinessDiscountForm form={form}/>
						<Button
							size="icon"
							disabled={isCreatingBusinessDiscount}
							onClick={form.handleSubmit(handleSave)}
							title='Crear descuento'
							className='cursor-pointer mt-3'
						>
							{isCreatingBusinessDiscount ? <Loader2 className="h-4 w-4 animate-spin"/> : <PlusCircle className="h-4 w-4"/>}
						</Button>
					</div>
					<Separator className={'my-2'}/>
					<ScrollArea className='min-h-72'>
						<BusinessDiscountList/>
					</ScrollArea>
				</div>
			</DialogContent>
		
		</Dialog>
	)
}
