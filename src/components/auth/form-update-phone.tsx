'use client';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	FormControl, FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import {toast} from 'sonner';
import {Loader2} from 'lucide-react';
import React from 'react';
import {useLoadingRouter} from '@/providers/navigation-loading-provider';
import {useProfile} from '@/providers/profile-provider';
import {UpdatePhoneFormValues, UpdatePhoneSchema} from '@/lib/schemas/auth';
import {ReusableForm} from '@/components/common/reusable-form';
import {useUpdatePhoneProfile} from '@/hooks/api/profile';
import {PhoneInput} from '@/components/ui/phone-input';

const formatPhone = (phone: string) => {
	return phone.startsWith('+') ? phone : `+${phone}`;
}
export function UpdatePhoneForm() {
	const profile = useProfile()
	const router = useLoadingRouter();
	
	const form = useForm<UpdatePhoneFormValues>({
		resolver: zodResolver(UpdatePhoneSchema),
		defaultValues: {
			phone: formatPhone(profile.phone),
		},
	});
	
	const { mutateAsync: updatePhoneProfile, isPending } = useUpdatePhoneProfile();
	
	// 2. Define a submit handler.
	async function handleSave(values: UpdatePhoneFormValues) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		try {
			const response = await updatePhoneProfile(values);
			if (!response.success) {
				response.errors?.forEach((error) => {
					toast.error('Error', {
						description: error.message,
					});
				});
				return;
			}
			toast.success('Hecho!', {
				description: 'Teléfono actualizado',
			});
			router.refresh()
		} catch (e) {
			toast.error('Error', {
				// @ts-expect-error only
				description: e.message
			});
		}
		
	}
	
	return (
		<div className='w-full'>
			<div className="no-scrollbar overflow-y-auto px-0">
				<ReusableForm form={form} className='w-full space-y-6'>
					<div className='grid grid-cols-1 gap-4'>
						<FormField
							control={form.control}
							name='phone'
							render={({field}) => (
								<FormItem>
									<FormLabel>Télefono<span className="text-red-600">*</span></FormLabel>
									<FormControl>
										<PhoneInput value={field.value} onChange={field.onChange} defaultCountry="CU" countries={['CU']}
										            international={false} placeholder='Entre el télefono'/>
									</FormControl>
									<FormDescription>
										Número de telénofo con que accede a su cuenta
									</FormDescription>
									<FormMessage/>
								</FormItem>
							)}
						/>
					</div>
				</ReusableForm>
			</div>
			
			<div className="flex justify-end py-4">
				<Button
					size="sm"
					disabled={isPending}
					onClick={form.handleSubmit(handleSave)}
					className={'w-full'}
				>
					{isPending && <Loader2 className="h-4 w-4 animate-spin"/>}
					{isPending ? 'Actualizando...' : 'Actualizar'}
				</Button>
			</div>
		</div>
	);
}
