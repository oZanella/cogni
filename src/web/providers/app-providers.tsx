'use client';

import { Toaster } from 'react-hot-toast';

import { QueryProvider } from '@/web/providers/query-provider';
import { SessionProvider } from '@/web/providers/session-provider';
import { ThemeProvider } from '@/web/providers/theme-provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" forcedTheme="light" disableTransitionOnChange>
      <SessionProvider>
        <QueryProvider>
          {children}
          <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        </QueryProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
