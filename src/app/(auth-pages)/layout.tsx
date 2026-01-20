import Link from 'next/link';
import {LogoutButton} from '@/components/auth/logout-button';
import React from 'react';
import {createClient} from '@/lib/supabase/server';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {data: {user}, error} = await supabase.auth.getUser();
  
  return (
      <div className="px-8 md:px-0">
          <div className="grid min-h-svh lg:grid-cols-2">
              
              <div className="bg-muted flex flex-col gap-4 p-6 md:p-10">
                  <div className="flex justify-center gap-2 md:justify-start">
                      <Link href="/" className="flex items-center gap-2 font-medium">
                          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                              {/*<GalleryVerticalEnd className="size-4"/>*/}
                              <img
                                  src="/favicon-16x16.png"
                                  alt="Image"
                                  className="object-cover dark:brightness-[0.2] dark:grayscale"
                              />
                          </div>
                          GOU
                      </Link>
                  </div>
                  <div className="relative hidden lg:flex items-center justify-center">
                      
                      {/*<img*/}
                      {/*    src="/gou-blue.svg"*/}
                      {/*    alt="Image"*/}
                      {/*    className="object-cover dark:brightness-[0.2] dark:grayscale"*/}
                      {/*/>*/}
                  </div>
              </div>
              <div className="flex flex-col gap-4 p-4 md:p-8 max-h-screen">
                  <div className={'w-full flex justify-end'}>
                      {user && (
                          <LogoutButton/>
                      )}
                  </div>
                  <div className="flex flex-1 items-center justify-center">
                      <div className="w-full max-w-mds">
                          {children}
                      </div>
                  </div>
              </div>
          
          </div>
      
      </div>
  );
}
