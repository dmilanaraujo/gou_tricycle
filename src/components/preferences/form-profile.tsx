'use client';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl, FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import {toast} from 'sonner';
import {LoaderCircle} from 'lucide-react';
import React from 'react';
import {useLoadingRouter} from '@/providers/navigation-loading-provider';
import {useProfile} from '@/providers/profile-provider';
import {updateProfile} from '@/lib/actions/profile';
import {ProfileFormValues, ProfileSchema} from '@/lib/schemas/auth';

export function ProfileForm() {
	const profile = useProfile()
	const router = useLoadingRouter();
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(ProfileSchema),
		defaultValues: {
			name: profile.name  || '',
			phone: profile.phone || '',
		},
	});
	
	const { isValid, isSubmitting, isDirty, errors} = form.formState;

	// 2. Define a submit handler.
	async function onSubmit(values: ProfileFormValues) {
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
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
					<Button type='submit' className='w-full' disabled={!isValid || isSubmitting || !isDirty}>
						{isSubmitting ? (
							<span className="flex items-center">
								<LoaderCircle className="mr-3 animate-spin"/>
								{'Enviando...'}
							</span>
						) : 'Actualizar'
						}
					</Button>
				</form>
			</Form>
	);
}
