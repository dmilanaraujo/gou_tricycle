// import { AppSidebar } from "@/components/app-sidebar"
import * as React from 'react';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { User, AuthError } from '@supabase/supabase-js';
import AppProvider from '@/providers/app-provider';
import {createClient} from '@/lib/supabase/server';
import {LoadingOverlay} from '@/components/common/loading-overlay';

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
        <SidebarProvider
          style={
            {
              "--sidebar-width": "300px",
            } as React.CSSProperties
          }
        >
          {/*<AppSidebar user={user}/>*/}
          <SidebarInset>
            <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-2">
              <SidebarTrigger className="-ml-1" />
              {/*<Separator orientation="vertical" className="mr-2 h-4" />*/}
            </header>
            <div className="flex flex-1 flex-col">
                <LoadingOverlay />
                {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </AppProvider>
  )
}
