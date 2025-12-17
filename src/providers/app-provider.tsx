import React from 'react';
import {NavigationLoadingProvider} from '@/providers/navigation-loading-provider';
import {ConfirmProvider} from '@/components/common/confirm-dialog-provider';

export default async function AppProvider({ children }: { children: React.ReactNode }) {
  return (
      <NavigationLoadingProvider>
          <ConfirmProvider>
              {children}
          </ConfirmProvider>
      </NavigationLoadingProvider>
  );
}
