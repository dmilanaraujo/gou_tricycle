'use client'

import {UseFormReturn} from 'react-hook-form'
import {FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {ReusableForm} from '@/components/common/reusable-form';
import * as React from 'react';
import {ServiceFormValues} from '@/lib/schemas/service';
import {Textarea} from '@/components/ui/textarea';
import {ImagesForm} from '@/components/common/form-images';
import {Business, Service} from '@/types';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Loader2} from 'lucide-react';
import {useGetBusinessDiscounts} from '@/hooks/api/business';
import {useProfile} from '@/providers/profile-provider';

interface ServiceFormProps
{
	form: UseFormReturn<ServiceFormValues>;
}

export const ServiceForm = ({form}: ServiceFormProps) => {
	const profile = useProfile();
	const { data: discounts, isLoading: isLoadingDiscounts } = useGetBusinessDiscounts(profile.id);
	return (
		<>
			<ReusableForm form={form}>
				<div className="space-y-6 p-4">
					
					<div className="flex items-center w-full">
						<FormLabel className="font-semibold">Datos del Servicio</FormLabel>
					</div>
					
					<div className="grid grid-cols-1 gap-4 items-start">
						<FormField
							control={form.control}
							name="name"
							render={({field}) => (
								<FormItem>
									<FormLabel>Nombre<span className="text-red-600">*</span></FormLabel>
									<FormControl>
										<Input placeholder="ABC-123" {...field} />
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
										<Textarea placeholder="Agregue una descripción para detallar su servicio" {...field} />
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
		
		</>
	)
}
