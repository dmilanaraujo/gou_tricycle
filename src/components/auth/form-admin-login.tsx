'use client';

import {useForm} from 'react-hook-form';
import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {zodResolver} from '@hookform/resolvers/zod';
import {loginEmail, loginPhone} from '@/lib/actions/auth';
import React, {useState} from 'react';
import {toast} from 'sonner';
import {LoaderCircle} from 'lucide-react';
import {PhoneInput} from '@/components/ui/phone-input';
import {useLoadingRouter} from '@/providers/navigation-loading-provider';
import {EmailLoginFormValues, EmailLoginSchema, PhoneLoginFormValues, PhoneLoginSchema} from '@/lib/schemas/auth';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';

export function AdminLoginForm() {
	const router = useLoadingRouter();
	const [errorAuth] = useState('');
	const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('email');
	
	const formEmail = useForm<EmailLoginFormValues>({
		resolver: zodResolver(EmailLoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const formPhone = useForm<PhoneLoginFormValues>({
		resolver: zodResolver(PhoneLoginSchema),
		defaultValues: {
			phone: '',
			password: '',
		},
	});
	// React.useEffect(() => {
	//     console.log('form.formState.errors',form.formState.errors);
	// }, [form.formState.errors])
	const {isSubmitting: isSubmittingEmail} = formEmail.formState;
	const {isSubmitting: isSubmittingPhone} = formPhone.formState;
	
	async function onSubmitEmail(values: EmailLoginFormValues) {
		try {
			
			const loginData = {
				password: values.password,
				email: values.email,
			};
			console.log('loginData', loginData);
			const response = await loginEmail(loginData);
			if (!response.success) {
				response.errors?.forEach((error) => {
					if (error.code == 'email_not_confirmed') {
						router.push('/inactive-profile');
						return;
					}
					toast.error('Error', {
						description: error.message,
					});
				});
				return;
			}
			router.push('/me');
		}
		catch (e) {
			toast.error('Error', {
				// @ts-expect-error only
				description: e.message
			});
		}
	}
	
	async function onSubmitPhone(values: PhoneLoginFormValues) {
		try {
			
			const loginData = {
				password: values.password,
				phone: values.phone,
			};
			console.log('loginData', loginData);
			const response = await loginPhone(loginData);
			if (!response.success) {
				response.errors?.forEach((error) => {
					if (error.code == 'phone_not_confirmed') {
						router.push('/inactive-profile');
						return;
					}
					toast.error('Error', {
						description: error.message,
					});
				});
				return;
			}
			router.push('/me');
		}
		catch (e) {
			toast.error('Error', {
				// @ts-expect-error only
				description: e.message
			});
		}
	}
	
	return (
		<div className="w-full">
			<div className="flex flex-col items-center gap-2 text-center pb-6">
				<h1 className="text-4xl font-bold text-slate-900 mb-2">Iniciar sesión como administrador</h1>
				<p className="text-muted-foreground text-sm text-balance">
					Inicie sesión si es un administrador
				</p>
			</div>
			<Tabs defaultValue={loginMethod} className="w-full" onValueChange={(value) => setLoginMethod(value as 'phone' | 'email')}>
				<TabsList variant='line' className="grid w-full grid-cols-2">
					<TabsTrigger value="email">Correo electrónico</TabsTrigger>
					<TabsTrigger value="phone">Teléfono</TabsTrigger>
				</TabsList>
				
				<TabsContent value="email" className="mt-4">
					<Form {...formEmail}>
						<form onSubmit={formEmail.handleSubmit(onSubmitEmail)}>
							<div className="grid gap-4">
								<FormField
									control={formEmail.control}
									name="email"
									render={({field}) => (
										<FormItem>
											<FormLabel className="sr-only">Email</FormLabel>
											<FormControl>
												<Input
													placeholder="Entre el correo electrónico"
													type="email"
													{...field}
													disabled={formEmail.formState.isLoading}
												/>
											</FormControl>
											<FormMessage/>
										</FormItem>
									)}
								/>
								
								<div className="grid">
									<FormField
										control={formEmail.control}
										name="password"
										render={({field}) => (
											<FormItem className="space-y-0 mt-0">
												<FormLabel className="sr-only">Contraseña:</FormLabel>
												<FormControl>
													<Input
														placeholder="Entre la contraseña"
														{...field}
														disabled={formEmail.formState.isLoading}
														type={'password'}
													/>
												</FormControl>
												<FormMessage/>
											</FormItem>
										)}
									/>
								</div>
								
								{!!errorAuth && (
									<div className="flex justify-center font-bold">
                                      <span className={'bg-red-300 text-red-500 w-full text-center'}>
                                        {errorAuth}
                                      </span>
									</div>
								)}
								
								<Button type="submit" className="w-full" disabled={isSubmittingEmail}>
									{isSubmittingEmail ? (
										<span className="flex items-center">
                                            <LoaderCircle className="mr-3 animate-spin"/>
                                            Enviando...
                                        </span>
									) : 'Entrar'}
								</Button>
							</div>
						</form>
					</Form>
				</TabsContent>
				
				<TabsContent value="phone" className="mt-4">
					<Form {...formPhone}>
						<form onSubmit={formPhone.handleSubmit(onSubmitPhone)}>
							<div className="grid gap-4">
								<FormField
									control={formPhone.control}
									name="phone"
									render={({field}) => (
										<FormItem>
											<FormLabel className="sr-only">Teléfono</FormLabel>
											<FormControl>
												<PhoneInput
													value={field.value}
													onChange={field.onChange}
													defaultCountry="CU"
													countries={['CU']}
													international={false}
													placeholder="Entre el teléfono"
													className="!text-lg"
												/>
											</FormControl>
											<FormMessage/>
										</FormItem>
									)}
								/>
								
								<div className="grid">
									<FormField
										control={formPhone.control}
										name="password"
										render={({field}) => (
											<FormItem className="space-y-0 mt-0">
												<FormLabel className="sr-only">Contraseña:</FormLabel>
												<FormControl>
													<Input
														placeholder="Entre la contraseña"
														{...field}
														disabled={formPhone.formState.isLoading}
														type={'password'}
													/>
												</FormControl>
												<FormMessage/>
											</FormItem>
										)}
									/>
								</div>
								
								{!!errorAuth && (
									<div className="flex justify-center font-bold">
                                      <span className={'bg-red-300 text-red-500 w-full text-center'}>
                                        {errorAuth}
                                      </span>
									</div>
								)}
								
								<Button type="submit" className="w-full" disabled={isSubmittingPhone}>
									{isSubmittingPhone ? (
										<span className="flex items-center">
                                            <LoaderCircle className="mr-3 animate-spin"/>
                                            Enviando...
                                        </span>
									) : 'Entrar'}
								</Button>
							</div>
						</form>
					</Form>
				</TabsContent>
			</Tabs>
		</div>
	);
}
