import { LoginForm } from '@/components/auth/form-login';
import React from 'react';

export default async function SigninPage() {
  
  return (
      <div className={'flex justify-center items-center'}>
            <div className='space-y-5 p-0'>
              <LoginForm/>
            </div>
      </div>
  );
}
