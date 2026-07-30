import { BottomNav } from '@/web/components/layout/bottom-nav';
import { Header } from '@/web/components/layout/header';
import { Sidebar } from '@/web/components/layout/sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <div className="mx-auto flex w-full flex-1 md:max-w-4xl">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
