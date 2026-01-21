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
import {AppSidebar} from '@/components/layout/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import {Separator} from '@/components/ui/separator';

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
      <SidebarProvider
          style={
              {
                  // "--sidebar-width": "350px",
                  "--sidebar-width": "50px",
              } as React.CSSProperties
          }
      >
          <AppSidebar profile={business}/>
          <SidebarInset>
              <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator
                      orientation="vertical"
                      className="mr-2 data-[orientation=vertical]:h-4"
                  />
              </header>
              <div className="flex flex-1 flex-col gap-4 p-4">
                  <LoadingOverlay/>
                  {children}
              </div>
          </SidebarInset>
      </SidebarProvider>
  )
}
