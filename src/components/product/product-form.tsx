'use client'

import {UseFormReturn} from 'react-hook-form'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {ReusableForm} from '@/components/common/reusable-form'
import * as React from 'react'
import {Textarea} from '@/components/ui/textarea'
import {Switch} from '@/components/ui/switch'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {useGetBusinessCategories} from '@/hooks/api/business';
import {Business, Product} from '@/types';
import {ProductFormValues} from '@/lib/schemas/product';
import {ImagesForm} from '@/components/common/form-images';

interface ProductFormProps {
	form: UseFormReturn<ProductFormValues>
	isEdit?: boolean
	profile: Business
	product?: Product
}

export const ProductForm = ({form, profile, isEdit, product}: ProductFormProps) => {
	const { data: categories, isLoading: isLoadingCategories } = useGetBusinessCategories(profile.id);
	return (
			<ReusableForm form={form}>
				<div className="space-y-6 p-4">
					
					{/* Header */}
					<div className="flex items-center w-full">
						<FormLabel className="font-semibold">Datos del Producto</FormLabel>
					</div>
					
					{/* Info básica */}
					<div className="grid grid-cols-1 gap-4 items-start">
						<FormField
							control={form.control}
							name="name"
							render={({field}) => (
								<FormItem>
									<FormLabel>Nombre<span className="text-red-600">*</span></FormLabel>
									<FormControl>
										<Input placeholder="Shampoo herbal" {...field} />
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
						
						<FormField
							control={form.control}
							name="description"
							render={({field}) => (
								<FormItem>
									<FormLabel>Descripción</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Descripción del producto"
											{...field}
										/>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
					</div>
					
					{/* Precios */}
					<div className="grid grid-cols-1 gap-4 items-start">
						{/* category */}
						<FormField
							control={form.control}
							name="business_category_id"
							render={({field}) => (
								<FormItem>
									<FormLabel>Categoría</FormLabel>
									<Select
										value={field.value ?? ''}
										onValueChange={field.onChange}
										
									>
										<FormControl>
											<SelectTrigger className={'w-full'}>
												<SelectValue placeholder="Seleccionar categoría" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{ categories?.map(c => (
											 <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
											 )) }
										</SelectContent>
									</Select>
									<FormMessage/>
								</FormItem>
							)}
						/>
					</div>
					
					{/* Media */}
					{/*<div className="grid grid-cols-1 gap-4 items-start">*/}
					{/*	<FormField*/}
					{/*		control={form.control}*/}
					{/*		name="image_url"*/}
					{/*		render={({field}) => (*/}
					{/*			<FormItem>*/}
					{/*				<FormLabel>Imagen (URL)</FormLabel>*/}
					{/*				<FormControl>*/}
					{/*					<Input placeholder="https://img..." {...field} />*/}
					{/*				</FormControl>*/}
					{/*				<FormMessage/>*/}
					{/*			</FormItem>*/}
					{/*		)}*/}
					{/*	/>*/}
					{/*</div>*/}
					
					{/* Flags */}
					<div className="grid grid-cols-1 gap-4 items-start">
						
						{/* is_featured */}
						<FormField
							control={form.control}
							name="is_featured"
							render={({field}) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
									<div className="space-y-0.5">
										<FormLabel>Producto destacado</FormLabel>
										<div className="text-sm text-muted-foreground">
											Mostrar como producto destacado
										</div>
									</div>
									<FormControl>
										<Switch
											checked={field.value ?? false}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						
						{/* product_discounts_id */}
						<FormField
							control={form.control}
							name="product_discounts_id"
							render={({field}) => (
								<FormItem>
									<FormLabel>Descuento</FormLabel>
									<Select
										value={field.value ?? ''}
										onValueChange={field.onChange}
									>
										<FormControl>
											<SelectTrigger className={'w-full'}>
												<SelectValue placeholder="Seleccionar descuento" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{/* discounts.map(d => (
											 <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
											 )) */}
										</SelectContent>
									</Select>
									<FormMessage/>
								</FormItem>
							)}
						/>
					</div>
					
					{/* Hidden discriminator */}
					<FormField
						control={form.control}
						name="item_type"
						render={({field}) => (
							<input type="hidden" {...field} value="product" />
						)}
					/>
					{isEdit &&
                        <ImagesForm
                            bucket='service_images'
                            images={product?.images || []}
                            extraMetadata={{ service_id: product?.id! }}
                            extraPath={`/${product?.id!}`}
                        />
					}
				</div>
				
			</ReusableForm>
	)
}
