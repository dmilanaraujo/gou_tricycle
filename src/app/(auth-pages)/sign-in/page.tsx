import { LoginForm } from '@/components/auth/form-login';
import React from 'react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';

export default async function SigninPage() {
  
  return (
      <div className={'flex justify-center items-center'}>
            <div className='space-y-3 p-0'>
              <LoginForm/>
              <div className='flex justify-center items-center text-sm'>
                  <Button variant='link'>
                      <Link href={'/admin/sign-in'}>
                          Entrar como admin
                      </Link>
                  </Button>
              </div>
            </div>
      </div>
  );
}
