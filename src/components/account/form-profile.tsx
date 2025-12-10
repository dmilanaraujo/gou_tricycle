'use client';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateUserSchema, UpdateUserValues} from '@/lib/schemas/auth';
import {updateUser} from '@/lib/actions/auth';
import {toast} from 'sonner';
import {User} from '@supabase/auth-js';
import {LoaderCircle} from 'lucide-react';
import React from 'react';
import {useRouter} from 'next/navigation';

export function ProfileForm({ user }: { user: User; }) {
	const router = useRouter();
	const form = useForm<UpdateUserValues>({
		resolver: zodResolver(UpdateUserSchema),
		defaultValues: {
			phone: user.phone || '',
			alias: user.user_metadata.first_name  || '',
		},
	});
	
	const { isValid, isSubmitting, isDirty} = form.formState;
	
	// 2. Define a submit handler.
	async function onSubmit(values: UpdateUserValues) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		try {
			const response = await updateUser(values);
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
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='alias'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Alias</FormLabel>
									<FormControl>
										<Input placeholder='Entre su alias' {...field} />
									</FormControl>
									{/*<FormDescription>*/}
									{/*	This is your public display name.*/}
									{/*</FormDescription>*/}
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type='submit' className='w-full' disabled={!isValid || isSubmitting || !isDirty}>
						{isSubmitting ? (
							<span className="flex items-center">
							<LoaderCircle  className="mr-3 animate-spin"/>
								{'Enviando...'}
						</span>
						) : 'Actualizar'
						}
					</Button>
				</form>
			</Form>
	);
}
