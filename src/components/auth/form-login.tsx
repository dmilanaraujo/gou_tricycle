'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel, FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '@/lib/actions/auth';
import React, {useState} from 'react';
import {toast} from 'sonner';
import {LoaderCircle} from 'lucide-react';
import {PhoneInput} from '@/components/ui/phone-input';
import * as z from 'zod';
import Link from "next/link";
import {useLoadingRouter} from '@/providers/navigation-loading-provider';
import {LoginSchema} from '@/lib/schemas/auth';


export function LoginForm() {
  const router = useLoadingRouter();
  // const siteTheme = useTheme().resolvedTheme as CaptchaTheme | undefined
  const [errorAuth] = useState('');
  
  type LogInFormValues = z.infer<typeof LoginSchema>;
  
  const form = useForm<LogInFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      phone: '',
      password: '',
      // captcha_token: ''
    },
  });
  
  const { isSubmitting } = form.formState;

  async function onSubmit(values: LogInFormValues) {
    try {
      const response = await login(values);
        if (!response.success) {
            response.errors?.forEach((error) => {
                if (error.code == 'phone_not_confirmed') {
                    toast.success('Información', {
                        description: 'Un código de verificación ha sido enviado a su WhatsApp',
                    });
                    router.push("/confirm-signup");
                    return;
                }
                toast.error('Error', {
                    description: error.message,
                });
            });
            return;
        }
      router.push("/me");
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
          <div className='grid gap-4'>
              <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-4xl font-bold text-slate-900 mb-2">Iniciar sesión</h1>
                  <p className="text-muted-foreground text-sm text-balance">
                      Inicie sesión si ya es un chofer registrado
                  </p>
              </div>
              <div className='grid'>
                  <FormField
                      control={form.control}
                      name="phone"
                      render={({field}) => (
                          <FormItem>
                              <FormLabel className="sr-only">Teléfono</FormLabel>
                              <FormControl>
                                  <PhoneInput value={field.value} onChange={field.onChange} defaultCountry="CU" countries={['CU']}
                                              international={false} placeholder='Entre el teléfono'
                                              className="!text-lg"/>
                              </FormControl>
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
              </div>
              <div className='grid'>
                  <FormField
                      control={form.control}
                      name='password'
                      render={({field}) => (
                          <FormItem className="space-y-0 mt-0">
                              <FormLabel className="sr-only">Contraseña:</FormLabel>
                              <FormControl>
                                  <Input
                                      placeholder='Entre la contraseña'
                                      {...field}
                                      disabled={form.formState.isLoading}
                                      type={'password'}
                                  />
                              </FormControl>
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
              </div>
              {/*<Link href="/forgot-password" className="text-sm block underline text-muted-foreground text-right">*/}
              {/*    Ha olvidado su contraseña?*/}
              {/*</Link>*/}
              {/*<div className='grid gap-2'>*/}
              {/*    <FormField*/}
              {/*        control={form.control}*/}
              {/*        name="captcha_token"*/}
              {/*        render={({field}) => (*/}
              {/*            <FormItem>*/}
              {/*                <FormControl>*/}
              {/*                    <Turnstile*/}
              {/*                        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}*/}
              {/*                        // options={{ theme: siteTheme, size: 'normal', language: locale }}*/}
              {/*                        options={{theme: siteTheme, size: 'flexible', language: locale}}*/}
              {/*                        onSuccess={(token) => {*/}
              {/*                            field.onChange(token)*/}
              {/*                        }}*/}
              {/*                        onError={() => {*/}
              {/*                            field.onChange('')*/}
              {/*                            form.setError("captcha_token", {*/}
              {/*                                message: t('customErrors.captcha_error')*/}
              {/*                            })*/}
              {/*                        }}*/}
              {/*                        onExpire={() => {*/}
              {/*                            field.onChange('')*/}
              {/*                            form.setError("captcha_token", {*/}
              {/*                                message: t('customErrors.captcha_expired')*/}
              {/*                            })*/}
              {/*                        }}*/}
              {/*                    />*/}
              {/*                </FormControl>*/}
              {/*            </FormItem>*/}
              {/*        )}*/}
              {/*    />*/}
              {/*</div>*/}
              {!!errorAuth && (
                  <div className='flex justify-center font-bold'>
                      <span className={'bg-red-300 text-red-500 w-full text-center'}>
                        {errorAuth}
                      </span>
                  </div>
              )}
              <Button type='submit' className='w-full' disabled={isSubmitting}>
                  {isSubmitting ? (
                      <span className="flex items-center">
                            <LoaderCircle className="mr-3 animate-spin"/>
                            Enviando...
                      </span>
                  ) : 'Entrar' }
              </Button>
               <div className='flex justify-center mt-4 text-sm space-x-2'>
                    ¿No está registrado?
                </div>
                <Button asChild>
                    <Link href='/sign-up' className={'w-full bg-success'}>
                        Regístrese aquí
                    </Link>
                </Button>

              {/*<div className="space-y-5">*/}
              {/*    <p className="text-sm text-center">*/}
              {/*        ¿Aún no tiene cuenta?*/}
              {/*        <Link href="#" className="ml-1 underline text-muted-foreground">{t('login.form.signup')}</Link>*/}
              {/*    </p>*/}
              {/*</div>*/}
          </div>
      </form>
    </Form>
  );
}
