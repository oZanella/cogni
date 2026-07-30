import { BottomNav } from '@/web/components/layout/bottom-nav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <main className="flex-1">{children}</main>
      <BottomNav />
    </div>
  );
}
