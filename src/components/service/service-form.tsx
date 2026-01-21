'use client'

import {UseFormReturn} from 'react-hook-form'
import {FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {ReusableForm} from '@/components/common/reusable-form';
import * as React from 'react';
import {ServiceFormValues} from '@/lib/schemas/service';
import {Textarea} from '@/components/ui/textarea';

interface ServiceFormProps
{
	form: UseFormReturn<ServiceFormValues>;
	isEdit?: boolean
}

export const ServiceForm = ({form}: ServiceFormProps) => {
	
	return (
		<>
			<ReusableForm form={form}>
				<div className="space-y-6 p-6">
					
					<div className="flex items-center w-full">
						<FormLabel className="font-semibold">Datos del Servicio</FormLabel>
					</div>
					
					<div className="grid grid-cols-1 gap-4 items-start">
						<FormField
							control={form.control}
							name="name"
							render={({field}) => (
								<FormItem>
									<FormLabel>Nombre*</FormLabel>
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
					
					</div>

				</div>
			</ReusableForm>
		
		</>
	)
}
