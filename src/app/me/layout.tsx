import * as React from 'react';
import { User, AuthError } from '@supabase/supabase-js';
import {createClient} from '@/lib/supabase/server';
import {LoadingOverlay} from '@/components/common/loading-overlay';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {Home} from 'lucide-react';
import {LogoutButton} from '@/components/auth/logout-button';
import {getProfile} from '@/lib/actions/profile';
import {isProfileComplete} from '@/lib/utils';
import {redirect} from 'next/navigation';
import {UserButton} from '@/components/auth/user-button';

interface ManagerLayoutProps {
  children: React.ReactNode;
}

export default async function ManagerLayout({ children }: Readonly<ManagerLayoutProps>) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  }: {
    data: { user: User| null },
    error: AuthError | null,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }
  
  const profileRes = await getProfile();
  if (!profileRes.success || !profileRes.data) {
      return null
  }
  const { data: business } = profileRes;

  if (!isProfileComplete(business)) {
      redirect('/complete-profile')
  }
  
  return (
        <div className={'flex min-h-svh w-full'}>
          <main className={'flex w-full flex-1 flex-col'}>
              <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-2 z-10 justify-between">
                  <Button asChild>
                      <Link href='/'>
                          <Home/>
                      </Link>
                  </Button>
                  <UserButton/>
                  {/*<LogoutButton/>*/}
              </header>
              <div className="flex flex-1 flex-col">
                  <LoadingOverlay/>
                  {children}
              </div>
          </main>
        </div>
  )
}
