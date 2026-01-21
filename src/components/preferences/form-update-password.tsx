"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from 'react';
import {updatePassword,} from '@/lib/actions/auth';
import {LoaderCircle} from 'lucide-react';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {useForm} from 'react-hook-form';
import {UpdatePasswordSchema, UpdatePasswordValues} from '@/lib/schemas/auth';
import {zodResolver} from '@hookform/resolvers/zod';
import {toast} from 'sonner';

export function UpdatePasswordForm() {
	
	const form = useForm<UpdatePasswordValues>({
		resolver: zodResolver(UpdatePasswordSchema),
		defaultValues: {
			password: '',
			confirm_password: ''
		},
		mode: 'all'
	});
	
	const { isValid, isSubmitting} = form.formState;
	
	// 2. Define a submit handler.
	async function onSubmit(values: UpdatePasswordValues) {
		// Do something with the form values.
		try {
			const response = await updatePassword(values);
			if (!response.success) {
				response.errors?.forEach((error) => {
					toast.error('Error', {
						description: error.message,
					});
				});
				return;
			}
			toast.success('Hecho', {
				description: 'Datos actualizados correctamente',
			});
		} catch (e) {
			toast.error('Error', {
				// @ts-expect-error only
				description: e.message
			});
		}
		
	}
	
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="grid grid-cols-1 gap-4">
					<FormField
						control={form.control}
						name="password"
						render={({field}) => (
							<FormItem>
								<FormLabel>Nueva contraseña</FormLabel>
								<FormControl>
									<Input type="password" placeholder="Ingrese la nueva contraseña" {...field} />
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirm_password"
						render={({field}) => (
							<FormItem>
								<FormLabel>Confirmar contraseña</FormLabel>
								<FormControl>
									<Input type="password" placeholder="Confirme la nueva contraseña" {...field} />
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit" className="w-full" disabled={!isValid || isSubmitting}>
					{isSubmitting ? (
						<span className="flex items-center">
						<LoaderCircle  className="mr-3 animate-spin"/>
							Enviando...
					</span>
					) : 'Actualizar contraseña' }
				</Button>
			</form>
		</Form>
	);
}
