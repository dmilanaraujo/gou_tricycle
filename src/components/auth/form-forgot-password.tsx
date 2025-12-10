"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {forgotPassword} from '@/lib/actions/auth';
import {LoaderCircle} from 'lucide-react';
import {useForm} from 'react-hook-form';
import {ForgotPasswordFormValues, ForgotPasswordSchema} from '@/lib/schemas/auth';
import {zodResolver} from '@hookform/resolvers/zod';
import {toast} from 'sonner';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {useLoadingRouter} from '@/providers/navigation-loading-provider';

export function ForgotPasswordForm() {
	const router = useLoadingRouter();
	const [errorAuth] = useState('');
	
	const form = useForm<ForgotPasswordFormValues>({
		resolver: zodResolver(ForgotPasswordSchema),
		defaultValues: {
			phone: '',
			// captcha_token: '',
		},
	});
	
	const { isValid, isSubmitting } = form.formState;
	
	async function onSubmit(values: ForgotPasswordFormValues) {
		try {
			const response = await forgotPassword(values, `${window.location.origin}/auth/update-password`);
			if (!response.success) {
				response.errors?.forEach((error) => {
					toast.error('Error', {
						description: error.message,
					});
				});
				return;
			}
			router.push("/");
		} catch (e) {
			toast.error('Hecho', {
				// @ts-expect-error only
				description: e.message
			});
		}
	}
	
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<div className='grid gap-4'>
					<div className='grid gap-2'>
						<FormField
							control={form.control}
							name='phone'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Teléfono:</FormLabel>
									<FormControl>
										<Input
											placeholder={'55112233'}
											{...field}
											disabled={form.formState.isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					{/*<div className='grid gap-2'>*/}
					{/*	<FormField*/}
					{/*		control={form.control}*/}
					{/*		name="captcha_token"*/}
					{/*		render={({ field }) => (*/}
					{/*			<FormItem>*/}
					{/*				<FormControl>*/}
					{/*					<Turnstile*/}
					{/*						siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}*/}
					{/*						options={{ theme: siteTheme, size: 'flexible', language: locale }}*/}
					{/*						onSuccess={(token) => {*/}
					{/*							field.onChange(token)*/}
					{/*						}}*/}
					{/*						onError={() => {*/}
					{/*							field.onChange('')*/}
					{/*							form.setError("captcha_token", {*/}
					{/*								message: t('customErrors.captcha_error')*/}
					{/*							})*/}
					{/*						}}*/}
					{/*						onExpire={() => {*/}
					{/*							field.onChange('')*/}
					{/*							form.setError("captcha_token", {*/}
					{/*								message: t('customErrors.captcha_expired')*/}
					{/*							})*/}
					{/*						}}*/}
					{/*					/>*/}
					{/*				</FormControl>*/}
					{/*				/!*<LocalizedFormMessage />*!/*/}
					{/*			</FormItem>*/}
					{/*		)}*/}
					{/*	/>*/}
					{/*</div>*/}
					{!!errorAuth && (
						<div className='flex justify-center font-bold'>
			                <span className={'bg-red-300 text-red-500 w-full text-center'}>
			                   {errorAuth}
				              {/*{form.formState.errors}*/}
			                </span>
						</div>
					)}
					<Button type='submit' className='w-full' disabled={!isValid || isSubmitting}>
						{isSubmitting ? (
							<span className="flex items-center">
			                    <LoaderCircle  className="mr-3 animate-spin"/>
								Enviando...
			                </span>
						) : 'Enviar mensaje de reinicio' }
					</Button>
				</div>
			</form>
		</Form>
	);
}
