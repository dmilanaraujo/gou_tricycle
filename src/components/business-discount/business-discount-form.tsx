'use client'

import {UseFormReturn} from 'react-hook-form'
import {FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {ReusableForm} from '@/components/common/reusable-form';
import * as React from 'react';
import {BusinessDiscountValues} from '@/lib/schemas/business';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

interface BusinessDiscountFormProps
{
	form: UseFormReturn<BusinessDiscountValues>;
}

export const BusinessDiscountForm = ({form}: BusinessDiscountFormProps) => {
	return (
		<ReusableForm form={form}>
			<div className="space-y-6">
				<div className="grid grid-cols-1 gap-4 items-start">
					<div className='flex gap-2'>
						<FormField
							control={form.control}
							name="value"
							render={({field}) => (
								<FormItem>
									<FormLabel>Valor<span className="text-red-600">*</span></FormLabel>
									<FormControl>
										<Input placeholder="10" type={'number'} {...field} />
									</FormControl>
									<FormMessage/>
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
											<SelectItem value='fixed'>Fijo</SelectItem>
											<SelectItem value='percentage'>Porciento</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage/>
								</FormItem>
							)}
						/>
						{/*<FormField*/}
						{/*	control={form.control}*/}
						{/*	name="starts_at"*/}
						{/*	render={({field}) => (*/}
						{/*		<FormItem>*/}
						{/*			<FormLabel>Inicia</FormLabel>*/}
						{/*			<FormControl>*/}
						{/*				<Input placeholder="10" type={'date'} {...field} />*/}
						{/*			</FormControl>*/}
						{/*			<FormMessage/>*/}
						{/*		</FormItem>*/}
						{/*	)}*/}
						{/*/>*/}
						{/*<FormField*/}
						{/*	control={form.control}*/}
						{/*	name="ends_at"*/}
						{/*	render={({field}) => (*/}
						{/*		<FormItem>*/}
						{/*			<FormLabel>Inicia</FormLabel>*/}
						{/*			<FormControl>*/}
						{/*				<Input placeholder="10" type={'date'} {...field} />*/}
						{/*			</FormControl>*/}
						{/*			<FormMessage/>*/}
						{/*		</FormItem>*/}
						{/*	)}*/}
						{/*/>*/}
					</div>
				
				</div>
			
			</div>
		
		</ReusableForm>
	)
}
