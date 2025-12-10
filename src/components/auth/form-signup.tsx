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
import {SignUpSchema} from '@/lib/schemas/auth';
import Link from 'next/link';
import {signUp} from '@/lib/actions/auth';
import {toast} from 'sonner';
import {LoaderCircle} from 'lucide-react';
import React from 'react';
import {PhoneInput} from '@/components/ui/phone-input';
import * as z from 'zod';
import {useLoadingRouter} from '@/providers/navigation-loading-provider';

export function SignupForm() {
  const router = useLoadingRouter();
  
  type SignUpFormValues = z.infer<typeof SignUpSchema>;
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
        phone: '',
        password: '',
        confirm_password: '',
        // captcha_token: '',
    },
  });
  
  const { isSubmitting } = form.formState;

  // 2. Define a submit handler.
  async function onSubmit(values: SignUpFormValues) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      try {
          const response = await signUp(values, `${process.env.NEXT_PUBLIC_SITE_URL}/confirm-signup`);
          if (!response.success) {
              response.errors?.forEach((error) => {
                  toast.error('Error', {
                      description: error.message,
                  });
              });
              return;
          }
          toast.success('Hecho', {
              description: 'Cuenta creada correctamente',
          });
          router.push("/confirm-signup");
      } catch (e) {
          toast.error('Error', {
              // @ts-expect-error only
              description: e.message
          });
      }

  }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Regístrese</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Introduzca número de teléfono y contraseña para crear a su cuenta como chofer.
                    </p>
                </div>
                <div className="grid">
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({field}) => (
                            <FormItem className="space-y-0 mt-0">
                                <FormLabel className="sr-only">Teléfono</FormLabel>
                                <FormControl>
                                    <PhoneInput value={field.value} onChange={field.onChange} defaultCountry="CU"
                                                international={false} placeholder='Entre el teléfono'
                                                className={'!text-lg !h-12'}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem className="space-y-0 mt-0">
                                <FormLabel className="sr-only">Contraseña</FormLabel>
                                <FormControl>
                                    <Input placeholder='Entre la contraseña' {...field}
                                           type={'password'} className={'!text-lg h-12'}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid">
                    <FormField
                        control={form.control}
                        name="confirm_password"
                        render={({field}) => (
                            <FormItem className="space-y-0 mt-0">
                                <FormLabel className="sr-only">Confirmar contraseña</FormLabel>
                                <FormControl>
                                    <Input placeholder='Confirmar contraseña' {...field} type={'password'}
                                           className={'!text-lg h-12'}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                {/*{ !!referral_code && (*/}
                {/*    <FormField*/}
                {/*        control={form.control}*/}
                {/*        name="referral_code"*/}
                {/*        render={({field}) => (*/}
                {/*            <FormItem className="space-y-0 mt-0">*/}
                {/*                <FormLabel className="">{t('signup.form.referral_code')}:</FormLabel>*/}
                {/*                <FormControl>*/}
                {/*                    <Input placeholder={t('signup.form.referral_code')} {...field} disabled className={'!text-lg h-12'}/>*/}
                {/*                </FormControl>*/}
                {/*                <FormMessage/>*/}
                {/*            </FormItem>*/}
                {/*        )}*/}
                {/*    />*/}
                {/*)}*/}
                {/*<div className="grid gap-2">*/}
                {/*    <FormField*/}
                {/*        control={form.control}*/}
                {/*        name="captcha_token"*/}
                {/*        render={({field}) => (*/}
                {/*            <FormItem>*/}
                {/*                <FormControl>*/}
                {/*                    <Turnstile*/}
                {/*                        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}*/}
                {/*                        options={{theme: siteTheme, size: 'flexible', language: locale}}*/}
                {/*                        onSuccess={(token) => {*/}
                {/*                            field.onChange(token)*/}
                {/*                        }}*/}
                {/*                        onError={() => {*/}
                {/*                            field.onChange('')*/}
                {/*                            form.setError('captcha_token', {*/}
                {/*                                message: t('customErrors.captcha_error')*/}
                {/*                            })*/}
                {/*                        }}*/}
                {/*                        onExpire={() => {*/}
                {/*                            field.onChange('')*/}
                {/*                            form.setError('captcha_token', {*/}
                {/*                                message: t('customErrors.captcha_expired')*/}
                {/*                            })*/}
                {/*                        }}*/}
                {/*                    />*/}
                {/*                </FormControl>*/}
                {/*                /!*<FormMessage />*!/*/}
                {/*            </FormItem>*/}
                {/*        )}*/}
                {/*    />*/}
                {/*</div>*/}
                <Button type="submit" className="w-full !text-lg h-12" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <span className="flex items-center">
                      <LoaderCircle className="mr-3 animate-spin"/>
                            Enviando...
                  </span>
                    ) : 'Crear cuenta' }
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
