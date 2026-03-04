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
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import {toast} from 'sonner';
import {Loader2} from 'lucide-react';
import React from 'react';
import {useLoadingRouter} from '@/providers/navigation-loading-provider';
import {useProfile} from '@/providers/profile-provider';
import {ProfileFormValues, ProfileSchema} from '@/lib/schemas/auth';
import {ReusableForm} from '@/components/common/reusable-form';
import {useUpdateProfile} from '@/hooks/api/profile';

export function FormProfile() {
	const profile = useProfile()
	const router = useLoadingRouter();
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(ProfileSchema),
		defaultValues: {
			name: profile.name  || '',
		},
	});
	
	const { mutateAsync: updateProfile, isPending } = useUpdateProfile();
	
	// 2. Define a submit handler.
	async function handleSave(values: ProfileFormValues) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		try {
			const response = await updateProfile(values);
			if (!response.success) {
				response.errors?.forEach((error) => {
					toast.error('Error', {
						description: error.message,
					});
				});
				return;
			}
			toast.success('Hecho!', {
				description: 'Datos actualizados',
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
							name='name'
							render={({field}) => (
								<FormItem>
									<FormLabel>Su alias<span className="text-red-600">*</span></FormLabel>
									<FormControl>
										<Input placeholder='Entre su alias' {...field} />
									</FormControl>
									<FormDescription>
										Alias para su usuario
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
					disabled={isPending}
					onClick={form.handleSubmit(handleSave)}
					className={'w-full md:w-auto'}
				>
					{isPending && <Loader2 className="h-4 w-4 animate-spin"/>}
					{isPending ? 'Actualizando...' : 'Actualizar'}
				</Button>
			</div>
		</div>
	);
}
