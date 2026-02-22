import * as React from 'react';
import {BusinessParamsProps} from '@/types';
import {getBusinessBySlugCachedData} from '@/lib/actions/business';
import BusinessNotFound from '@/components/layout/business-not-found';
import {BusinessProvider} from '@/providers/business-provider';
import {isBusinessActive} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {LayoutDashboard} from 'lucide-react';
import {AppSidebar} from '@/components/layout/app-sidebar';
import {SidebarInset, SidebarProvider, SidebarTrigger} from '@/components/ui/sidebar';
import {Separator} from '@/components/ui/separator';
import {LoadingOverlay} from '@/components/common/loading-overlay';
import {getProfileCachedData} from '@/lib/actions/profile';

interface ManagerBusinessLayoutProps {
  children: React.ReactNode;
  params: Promise<BusinessParamsProps>
}

export default async function ManagerBusinessLayout({ params, children }: Readonly<ManagerBusinessLayoutProps>) {
    const { slug } = await params;
    const profile = await getProfileCachedData();
    const business = await getBusinessBySlugCachedData(slug);

    if (!business || !profile?.businesses?.some(b =>b.slug == slug)) {
      return <BusinessNotFound/>
    }
  
    if (!isBusinessActive(business)) {
      return (
          <section className='pt-8 flex max-w-4xl flex-col items-center gap-6 self-center text-center pb-8 sm:pb-6'>
              <h1 className='text-3xl leading-[1.29167] font-semibold text-balance sm:text-4xl lg:text-5xl'>
                  Su negocio aún no ha sido activado
              </h1>
              <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
                  Espere a que sea activado o contáctenos para atender su petición.
              </p>
              <Button asChild>
                  <Link href="/me"><LayoutDashboard/></Link>
              </Button>
          </section>
      )
    }
    
    return (
        <BusinessProvider business={business}>
            <SidebarProvider>
                <AppSidebar/>
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        <LoadingOverlay/>
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </BusinessProvider>
    )
}
