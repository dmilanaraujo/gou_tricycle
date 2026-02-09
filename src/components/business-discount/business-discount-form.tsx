'use client'

import {UseFormReturn} from 'react-hook-form'
import {FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {ReusableForm} from '@/components/common/reusable-form';
import * as React from 'react';
import {BusinessDiscountInput, BusinessDiscountOutput} from '@/lib/schemas/business';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {DatePicker} from '@/components/ui/date-picker';

interface BusinessDiscountFormProps
{
	form: UseFormReturn<BusinessDiscountInput, any, BusinessDiscountOutput>;
}

export const BusinessDiscountForm = ({form}: BusinessDiscountFormProps) => {
	return (
		<ReusableForm form={form} className={'w-full'}>
			<div className="space-y-2">
				<div className="grid grid-cols-1 gap-2 items-start">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start w-full">
						<FormField
							control={form.control}
							name="value"
							render={({field}) => (
								<FormItem>
									<FormLabel>Valor<span className="text-red-600">*</span></FormLabel>
									<FormControl>
										<Input
											min={0}
											placeholder="10"
											type={'number'}
											{...field}
											value={field.value?.toString() ?? ''}
											onChange={(e) => {
												const val = e.target.value;
												field.onChange(val === '' ? undefined : val); // mandamos string o undefined
											}}
										/>
									</FormControl>
									{/*<FormMessage/>*/}
								</FormItem>
							)}
						/>
						
						<FormField
							control={form.control}
							name="type"
							render={({field}) => (
								<FormItem>
									<FormLabel>Tipo</FormLabel>
									<Select
										value={field.value ?? ''}
										onValueChange={field.onChange}
									
									>
										<FormControl>
											<SelectTrigger className={'w-full'}>
												<SelectValue placeholder="Seleccione..."/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="fixed">Fijo</SelectItem>
											<SelectItem value="percentage">Porciento</SelectItem>
										</SelectContent>
									</Select>
									{/*<FormMessage/>*/}
								</FormItem>
							)}
						/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start w-full">
						<FormField
							control={form.control}
							name="starts_at"
							render={({field}) => (
								<FormItem>
									<FormLabel>Inicia</FormLabel>
									<FormControl>
										<DatePicker
											value={field.value ? new Date(field.value) : undefined}
											onSelect={(date) => {
												field.onChange(date);
												form.trigger('starts_at');
											}}
											placeholder={'Seleccione...'}
											className="w-full"
										/>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="ends_at"
							render={({field}) => (
								<FormItem>
									<FormLabel>Termina</FormLabel>
									<FormControl>
										<DatePicker
											value={field.value ? new Date(field.value) : undefined}
											onSelect={(date) => {
												field.onChange(date);
												form.trigger('ends_at');
											}}
											placeholder={'Seleccione...'}
											className="w-full"
										/>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
					</div>
				
				</div>
			
			</div>
		
		</ReusableForm>
	)
}
