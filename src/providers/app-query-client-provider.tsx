'use client';
import React, { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import {getQueryClient} from '@/lib/get-query-client';

export default function AppQueryClientProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(getQueryClient());
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
