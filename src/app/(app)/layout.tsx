import { BottomNav } from '@/web/components/layout/bottom-nav';
import { Header } from '@/web/components/layout/header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <BottomNav />
    </div>
  );
}
