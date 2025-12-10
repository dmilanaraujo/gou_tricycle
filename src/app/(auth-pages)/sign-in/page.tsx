import { LoginForm } from '@/components/auth/form-login';
import React from 'react';

export default async function SigninPage() {
  
  return (
      <div className="py-16 px-8 md:px-0 flex items-center justify-center">
        <LoginForm/>
      </div>
  
  );
}
