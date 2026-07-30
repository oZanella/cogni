'use client';

import { Toaster } from 'react-hot-toast';

import { QueryProvider } from '@/providers/query-provider';
import { SessionProvider } from '@/providers/session-provider';
import { ThemeProvider } from '@/providers/theme-provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SessionProvider>
        <QueryProvider>
          {children}
          <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        </QueryProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
