'use client';

import { Toaster } from 'react-hot-toast';

import { TooltipProvider } from '@/web/components/ui/tooltip';
import { QueryProvider } from '@/web/providers/query-provider';
import { SessionProvider } from '@/web/providers/session-provider';
import { ThemeProvider } from '@/web/providers/theme-provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" forcedTheme="light" disableTransitionOnChange>
      <SessionProvider>
        <QueryProvider>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3500,
              style: {
                background: 'var(--popover)',
                color: 'var(--popover-foreground)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: '12px 16px',
                fontSize: '0.875rem',
                boxShadow: '0 4px 16px oklch(0 0 0 / 0.08)',
              },
              success: {
                iconTheme: { primary: 'var(--primary)', secondary: 'var(--primary-foreground)' },
                style: { border: '1px solid var(--primary)' },
              },
              error: {
                iconTheme: {
                  primary: 'var(--destructive)',
                  secondary: 'var(--primary-foreground)',
                },
                style: { border: '1px solid var(--destructive)' },
              },
            }}
          />
        </QueryProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
