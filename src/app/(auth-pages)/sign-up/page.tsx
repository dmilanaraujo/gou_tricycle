import { SignupForm } from '@/components/auth/form-signup';
import React from 'react';

export default async function SignupPage() {
  return (
      <div className={'flex justify-center items-center'}>
        <div className='space-y-5 px-0 pb-0'>
          <SignupForm/>
        </div>
      </div>
  );
}

