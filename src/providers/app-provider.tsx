import React from 'react';
import {NavigationLoadingProvider} from '@/providers/navigation-loading-provider';
import {ConfirmProvider} from '@/components/common/confirm-dialog-provider';
import AppQueryClientProvider from './app-query-client-provider';

export default async function AppProvider({ children }: { children: React.ReactNode }) {
  return (
      <AppQueryClientProvider>
          <NavigationLoadingProvider>
              <ConfirmProvider>
                 {children}
              </ConfirmProvider>
          </NavigationLoadingProvider>
      </AppQueryClientProvider>
  );
}
