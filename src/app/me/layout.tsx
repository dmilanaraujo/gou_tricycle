import * as React from 'react';
import { User, AuthError } from '@supabase/supabase-js';
import AppProvider from '@/providers/app-provider';
import {createClient} from '@/lib/supabase/server';
import {LoadingOverlay} from '@/components/common/loading-overlay';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {Home} from 'lucide-react';

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

  return (
      <AppProvider>
        <div className={'flex min-h-svh w-full'}>
          <main className={'flex w-full flex-1 flex-col'}>
            <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-2">
                <Button asChild>
                    <Link href='/'>
                        <Home/>
                    </Link>
                </Button>
            </header>
            <div className="flex flex-1 flex-col">
                <LoadingOverlay />
                {children}
            </div>
          </main>
        </div>
      </AppProvider>
  )
}
