'use client'

import {UseFormReturn} from 'react-hook-form'
import {FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {ReusableForm} from '@/components/common/reusable-form';
import * as React from 'react';
import {BusinessCategoryValues} from '@/lib/schemas/business';
import {IconPicker} from '@/components/ui/icon-picker';
import {IconName} from 'lucide-react/dynamic';

interface BusinessCategoryFormProps
{
	form: UseFormReturn<BusinessCategoryValues>;
}

export const BusinessCategoryForm = ({form}: BusinessCategoryFormProps) => {
	return (
			<ReusableForm form={form} className={'w-full'}>
				<div className="space-y-6">
					<div className="grid grid-cols-1 gap-4 items-start">
						<div className='flex gap-2 items-start'>
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
								name="icon"
								render={({field}) => (
									<FormItem>
										<FormLabel>Icono</FormLabel>
										<FormControl>
											<IconPicker
												className="w-fit"
												value={field.value ? field.value as IconName : undefined}
												onValueChange={field.onChange}
												triggerPlaceholder={'Seleccione'}
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
