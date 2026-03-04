import React from 'react';
import {NavigationLoadingProvider} from '@/providers/navigation-loading-provider';
import {ConfirmProvider} from '@/components/common/confirm-dialog-provider';
import AppQueryClientProvider from './app-query-client-provider';
import { TooltipProvider } from '@/components/ui/tooltip';

export default async function AppProvider({ children }: { children: React.ReactNode }) {
  return (
      <AppQueryClientProvider>
          <NavigationLoadingProvider>
              <TooltipProvider>
                  <ConfirmProvider>
                     {children}
                  </ConfirmProvider>
              </TooltipProvider>
          </NavigationLoadingProvider>
      </AppQueryClientProvider>
  );
}
