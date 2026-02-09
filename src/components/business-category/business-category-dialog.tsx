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
import {useBusinessCategoryStore} from '@/store/business-category';
import {useCreateBusinessCategory} from '@/hooks/api/business';
import {BusinessCategorySchema, BusinessCategoryValues} from '@/lib/schemas/business';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {BusinessCategoryList} from '@/components/business-category/business-category-list';
import {ScrollArea} from '@/components/ui/scroll-area';
import {BusinessCategoryForm} from '@/components/business-category/business-category-form';
import {Separator} from '@/components/ui/separator';

const initialValues: Partial<BusinessCategoryValues> = {
	name: '',
	icon: undefined,
}
export function BusinessCategoryDialog() {
	const { opened, setOpenDialog, closeDialog } = useBusinessCategoryStore();
	const isMobile = useIsMobile();
	const { mutateAsync: createBusinessCategory, isPending: isCreatingBusinessCategory } = useCreateBusinessCategory();
	
	const form = useForm<BusinessCategoryValues>({
		resolver: zodResolver(BusinessCategorySchema),
		defaultValues: initialValues,
		mode: 'onSubmit'
	})
	
	const { isValid } = form.formState;
	
	useEffect(() => {
		if (!opened) {
			form.reset(initialValues);
			closeDialog();
		}
	}, [opened]);
	
	
	const handleSave = async (data: BusinessCategoryValues) => {
		const toastId = toast.loading("Guardando categoria...")
		
		try {
			const result = await createBusinessCategory(data)
			if (!result.success) {
				showActionErrors(result.errors, toastId)
				return;
			}
			toast.success("Categoria guardada con éxito", { id: toastId })
			// closeDialog();
			form.reset()
			// onSuccess?.()
		} catch (err) {
			console.error(err)
			toast.error("Error al guardar la categoria", { id: toastId })
		}
	}
	if (isMobile) {
		return (
			<Drawer open={opened} onOpenChange={setOpenDialog}>
				<DrawerTrigger asChild>
					<div className="flex text-xs cursor-pointer text-blue-800 font-semibold">
						Gestione categorias
					</div>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader className="text-left">
						<DrawerTitle>Gestione sus categorias</DrawerTitle>
						<DrawerDescription>
							Adicione o elimine las categorias que usará para sus productos o servicios
						</DrawerDescription>
					</DrawerHeader>
					<div className="no-scrollbar overflow-y-auto px-8">
						 <div className={cn(
							 'flex justify-between gap-2 overflow-y-auto overscroll-contain py-2',
							 isValid ? 'items-end' : 'items-center'
						 )}>
							<BusinessCategoryForm form={form}/>
							<Button
								size="sm"
								disabled={isCreatingBusinessCategory}
								onClick={form.handleSubmit(handleSave)}
								title='Crear categoria'
								className='cursor-pointer'
							>
								{isCreatingBusinessCategory ? <Loader2 className="h-4 w-4 animate-spin"/> : <PlusCircle className="h-4 w-4"/>}
							</Button>
						 </div>
						<Separator className={'my-2'}/>
						<ScrollArea className={'pb-8'}>
							<BusinessCategoryList/>
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
					Gestione categorias
				</div>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Gestione sus categorias</DialogTitle>
					<DialogDescription>
						Adicione o elimine las categorias que usará para sus productos o servicios
					</DialogDescription>
				</DialogHeader>
				<div className="no-scrollbar overflow-y-auto">
					 <div className={cn(
						 'flex justify-between gap-2 overflow-y-auto overscroll-contain py-2',
						 isValid ? 'items-end' : 'items-center'
					 )}>
						<BusinessCategoryForm form={form}/>
						 <Button
							 size="icon"
							 disabled={isCreatingBusinessCategory}
							 onClick={form.handleSubmit(handleSave)}
							 title='Crear categoria'
							 className='cursor-pointer'
						 >
							 {isCreatingBusinessCategory ? <Loader2 className="h-4 w-4 animate-spin"/> : <PlusCircle className="h-4 w-4"/>}
						 </Button>
					 </div>
					<Separator className={'my-2'}/>
					<ScrollArea className='min-h-72'>
						<BusinessCategoryList/>
					</ScrollArea>
				</div>
			</DialogContent>

		</Dialog>
		)
}
