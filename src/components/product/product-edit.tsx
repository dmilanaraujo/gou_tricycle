"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { useUpdateProduct } from "@/hooks/api/product"
import {showActionErrors} from '@/lib/utils';
import {ProductFormValues, ProductSchema} from '@/lib/schemas/product';
import {ProductForm} from '@/components/product/product-form';
import {Product} from '@/types';

export function ProductEdit({ product }: { product: Product }) {
	const { mutateAsync: updateProduct, isPending: isUpdatingProduct } = useUpdateProduct();
	
	const form = useForm<ProductFormValues>({
		resolver: zodResolver(ProductSchema),
		defaultValues: product,
		mode: 'onBlur'
	})
	
	
	const handleSave = async (data: ProductFormValues) => {
		const toastId = toast.loading("Actualizando producto...")
		
		try {
			const result = await updateProduct({
				id: product.id,
				description: product.description,
				price: product.price,
				product_discounts_id: product.product_discounts_id,
				business_category_id: product.business_category_id,
				is_featured: product.is_featured,
				...data
			})
			if (!result.success) {
				showActionErrors(result.errors, toastId)
				return;
			}
			toast.success("Producto actualizado con éxito", { id: toastId })
		} catch (err) {
			console.error(err)
			toast.error("Error al guardar la producto", { id: toastId })
		}
	}
	
	return (
		<div className=''>
			<div className="no-scrollbar overflow-y-auto px-0">
				<div className="flex-1 overflow-y-auto overscroll-contain py-2">
					<ProductForm form={form}/>
				</div>
			</div>
			
			<div className="flex justify-end py-4">
				<Button
					size="sm"
					disabled={isUpdatingProduct}
					onClick={form.handleSubmit(handleSave)}
					className={'w-full md:w-auto'}
				>
					{isUpdatingProduct && <Loader2 className="h-4 w-4 animate-spin"/>}
					{isUpdatingProduct ? 'Guardando...' : 'Guardar'}
				</Button>
			</div>
		</div>
	)
}
