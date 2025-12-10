import { ForgotPasswordForm } from "@/components/auth/form-forgot-password";
import Link from 'next/link';
import React from 'react';
import {Metadata} from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    robots: {
      index: false,
    },
  }
}

export default async function ForgotPasswordPage() {
  
  return (
      <div className={'flex justify-center items-center'}>
        <div>
          <div className='p-8'>
            <div className='px-0 pt-0'>
              <div className='text-2xl text-center'>Restablecer su contraseña</div>
              <div className={'md:max-w-md text-center mt-2'}>Introduce tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</div>
            </div>
            <div className='space-y-5 px-0 pb-0 pt-8'>
              <ForgotPasswordForm/>
            </div>
          </div>
          <div className="flex justify-center mt-4 text-sm space-x-2">
            ¿Ya tienes una cuenta?
            <Link
                href="/sign-in"
                className="underline underline-offset-4 ml-2"
            >
              Iniciar sesión
            </Link>
          </div>
          {/*<div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary mt-3 pt-2">*/}
          {/*  <Link href="/" className={'ml-2'}>{t('app_brand')}</Link>*/}
          {/*</div>*/}
        </div>
      </div>
  )
}
