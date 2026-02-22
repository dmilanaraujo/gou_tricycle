import * as React from 'react';
import {LoadingOverlay} from '@/components/common/loading-overlay';
import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider, SidebarRail,
    SidebarTrigger
} from '@/components/ui/sidebar';
import {Separator} from '@/components/ui/separator';
import {NavUser} from '@/components/auth/nav-user';
import {LayoutDashboard, Plus} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {getProfileCachedData} from '@/lib/actions/profile';

interface ManagerLayoutProps {
  children: React.ReactNode;
}

export default async function CreateBusinessLayout({ children }: Readonly<ManagerLayoutProps>) {
  const profile = await getProfileCachedData();
  const hasBusiness = (profile?.businesses?.length || 0) > 0;
  return (
          <SidebarProvider>
              <Sidebar collapsible="icon">
                  <SidebarHeader>
                      <SidebarMenu>
                          <SidebarMenuItem>
                              {/*<BusinessSelector/>*/}
                              <SidebarMenuButton size="lg" asChild>
                                  <Button variant='outline' className='cursor-pointer'>
                                      <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                          <Plus className="size-4" />
                                      </div>
                                      <div className="grid flex-1 text-left text-sm leading-tight">
                                          <a className="truncate font-medium" href='/me/create'>{hasBusiness ? 'Crear negocio' : 'Crear su primer negocio'}</a>
                                          {/*<span className="truncate text-xs">Enterprise</span>*/}
                                      </div>
                                  </Button>
                              </SidebarMenuButton>
                          </SidebarMenuItem>
                      </SidebarMenu>
                  </SidebarHeader>
                  <SidebarContent>
                      <SidebarGroup>
                          {/*<SidebarGroupLabel>Platform</SidebarGroupLabel>*/}
                          <SidebarMenu>
                                  <SidebarMenuItem className='py-1'>
                                      <SidebarMenuButton asChild>
                                          <a href={'/me'}>
                                              <LayoutDashboard />
                                              <span>Mis negocios</span>
                                          </a>
                                      </SidebarMenuButton>
                                  </SidebarMenuItem>
                          </SidebarMenu>
                      </SidebarGroup>
                  </SidebarContent>
                  <SidebarFooter>
                      <NavUser />
                  </SidebarFooter>
                  <SidebarRail />
              </Sidebar>
              
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
  )
}
