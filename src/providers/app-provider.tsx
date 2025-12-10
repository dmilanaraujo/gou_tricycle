import React from 'react';
import {NavigationLoadingProvider} from '@/providers/navigation-loading-provider';

export default async function AppProvider({ children }: { children: React.ReactNode }) {
  return (
      <NavigationLoadingProvider>
          {children}
      </NavigationLoadingProvider>
  );
}
