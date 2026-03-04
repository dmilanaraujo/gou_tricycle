import React from 'react';
import {AdminLoginForm} from '@/components/auth/form-admin-login';
import Link from 'next/link';
import {Button} from '@/components/ui/button';

export default async function SigninPage() {
  
  return (
      <div className={'flex justify-center items-center'}>
          <div className='space-y-5 p-0'>
              <AdminLoginForm/>
              <div className='flex justify-center items-center text-sm'>
                  <Button variant='link'>
                      <Link href={'/sign-in'}>
                          Entrar como usuario
                      </Link>
                  </Button>
              </div>
          </div>
      </div>
  );
}
