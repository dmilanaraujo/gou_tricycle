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
import {useGetBusinessCategories, useGetBusinessDiscounts} from '@/hooks/api/business';
import {ProductFormValues} from '@/lib/schemas/product';
import {Loader2} from 'lucide-react';
import {useProfile} from '@/providers/profile-provider';

interface ProductFormProps {
	form: UseFormReturn<ProductFormValues>
}

export const ProductForm = ({form}: ProductFormProps) => {
	const profile = useProfile();
	const { data: categories, isLoading: isLoadingCategories } = useGetBusinessCategories(profile.id);
	const { data: discounts, isLoading: isLoadingDiscounts } = useGetBusinessDiscounts(profile.id);
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
					
					<div className="grid grid-cols-1 gap-4 items-start">
						<FormField
							control={form.control}
							name="price"
							render={({field}) => (
								<FormItem>
									<FormLabel>Precio</FormLabel>
									<FormControl>
										<Input type="number"
										       placeholder="40"
										       min={1}
										       {...field}
										       value={field.value ?? ''}
										       onChange={(e) => {
											       const value = e.target.valueAsNumber;
											       field.onChange(isNaN(value) ? undefined : value);
										       }}/>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
					
					</div>
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
												{/*<SelectValue placeholder="Seleccionar categoría"/>*/}
												
												{isLoadingCategories ? (
													<span className="flex items-center gap-2">
													  <Loader2 className="h-4 w-4 animate-spin"/>
													  Cargando categorias...
													</span>
												) : (
													 <SelectValue placeholder="Seleccionar categoría"/>
												 )}
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories?.map(c => (
												<SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage/>
								</FormItem>
							)}
						/>
					</div>
					
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
												{isLoadingDiscounts ? (
													<span className="flex items-center gap-2">
													  <Loader2 className="h-4 w-4 animate-spin"/>
													  Cargando descuentos...
													</span>
												) : (
													 <SelectValue placeholder="Seleccionar descuento"/>
												 )}
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{discounts?.map(c => (
												<SelectItem key={c.id} value={c.id}>{`${c.type} (${c.value})`}</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage/>
								</FormItem>
							)}
						/>
					</div>
				</div>
			
			</ReusableForm>
	)
}
