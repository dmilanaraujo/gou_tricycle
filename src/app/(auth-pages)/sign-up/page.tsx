import { SignupForm } from '@/components/auth/form-signup';

export default async function SignupPage() {
  return (
      <div className="py-16 flex items-center justify-center bg-white">
        <SignupForm/>
      </div>
  );
}

