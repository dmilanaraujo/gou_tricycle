"use client";

import { Button } from "@/components/ui/button";
import React, {useEffect, useRef, useState} from 'react';
import {resendOtpSms, verifyOtpSms} from '@/lib/actions/auth';
import {LoaderCircle} from 'lucide-react';
import {useForm} from 'react-hook-form';
import {VerifyOtpFormValues, VerifyOtpSchema} from '@/lib/schemas/auth';
import {zodResolver} from '@hookform/resolvers/zod';
import {toast} from 'sonner';
import {Form, FormControl, FormField, FormItem, FormMessage} from '@/components/ui/form';
import {REGEXP_ONLY_DIGITS} from 'input-otp';
import {InputOTP, InputOTPGroup, InputOTPSlot} from '@/components/ui/input-otp';
import {getTimeBySeconds} from '@/lib/utils';
import {useLoadingRouter} from '@/providers/navigation-loading-provider';
import Link from 'next/link';

export function ConfirmSignupForm({ phone }: { phone: string }) {
	const router = useLoadingRouter();
	const [errorAuth] = useState('');
	const [activeResend, setActiveResend] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	
	const seconds = 5 * 60; // 5 minutes in seconds
	const [counter, setCounter] = useState(seconds);
	
	const form = useForm<VerifyOtpFormValues>({
		resolver: zodResolver(VerifyOtpSchema),
		defaultValues: {
			phone,
			otp: '',
			// captcha_token: '',
		},
	});
	
	
	const startCounter = () => {
		setCounter(seconds);
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}
		intervalRef.current = setInterval(() => {
			setCounter((prevCounter) => {
				return prevCounter === 0 ? seconds : prevCounter - 1;
			});
		}, 1000);
	}
	
	const stopCounter = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
		setCounter(seconds);
	}
	
	useEffect(() => {
		startCounter();
		return () => {
			stopCounter();
		}
	}, []);
	
	useEffect(() => {
		if (counter == 0) {
			stopCounter();
			setActiveResend(true);
		}
	}, [counter]);
	
	const { isValid, isSubmitting } = form.formState;
	
	async function onSubmit(values: VerifyOtpFormValues) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log('values', values);
		try {
			const response = await verifyOtpSms(values);
			if (!response.success) {
				response.errors?.forEach((error) => {
					if (error.message == 'Token has expired or is invalid') {
						setActiveResend(true);
						stopCounter();
					}
					toast.error('Error', {
						description: error.message,
					});
				});
				return;
			}
			toast.success('Hecho!', {
				description: 'Cuenta confirmada.',
			});
			// router.push("/auth/sign-up-success");
			router.push("/me");
		} catch (e) {
			toast.error('Error', {
				// @ts-expect-error only
				description: e.message
			});
		}
		
	}
	async function handleResendOtp() {
		try {
			const response = await resendOtpSms(phone);
			if (!response.success) {
				response.errors?.forEach((error) => {
					toast.error('Error', {
						description: error.message,
					});
				});
				return;
			}
			setActiveResend(false);
			startCounter();
			toast.success('Hecho!', {
				description: 'Código de verificación reenviado',
			});
		} catch (e) {
			toast.error('Error', {
				// @ts-expect-error only
				description: t(e.message)
			});
		}
		
	}
	
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<div className='grid gap-4'>
					<div className='flex flex-col justify-center items-center pt-6 gap-2'>
						<FormField
							control={form.control}
							name='otp'
							render={({field}) => (
								<FormItem>
									{/*<FormLabel>{t('signup.form.verification_code')}:</FormLabel>*/}
									<FormControl>
										<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} {...field}>
											<InputOTPGroup className={'w-full'}>
												<InputOTPSlot index={0}/>
												<InputOTPSlot index={1}/>
												<InputOTPSlot index={2}/>
												<InputOTPSlot index={3}/>
												<InputOTPSlot index={4}/>
												<InputOTPSlot index={5}/>
											</InputOTPGroup>
										</InputOTP>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
						<div className={'flex justify-center items-center mt-2 gap-1'}>
							<Button
								type="button"
								variant="outline"
								size={'sm'}
								onClick={handleResendOtp}
								disabled={!activeResend}
							>
								Reenviar
							</Button>
							<div>
								<small>
									{getTimeBySeconds(counter)}
								</small>
							</div>
						</div>
					
					</div>
					{!!errorAuth && (
						<div className='flex justify-center font-bold'>
			                <span className={'bg-red-300 text-red-500 w-full text-center'}>
			                   {errorAuth}
				                {/*{form.formState.errors}*/}
			                </span>
						</div>
					)}
					<Button type='submit' className='w-full !text-lg h-12' disabled={!isValid || isSubmitting}>
						{isSubmitting ? (
							<span className="flex items-center">
			                    <LoaderCircle className="mr-3 animate-spin"/>
								{'Enviando...'}
			                </span>
						) : 'Aceptar'
						}
					</Button>
					<div className='flex justify-center mt-4 text-sm space-x-2'>
						¿Ya tienes una cuenta?
					</div>
					<Button asChild>
						<Link href='/sign-in' className={'w-full !text-lg h-12 bg-success'}>
							Iniciar sesión
						</Link>
					</Button>
				</div>
			</form>
		</Form>
	);
}
