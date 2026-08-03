import { BottomNav } from '@/web/components/layout/bottom-nav';
import { Header } from '@/web/components/layout/header';
import { Sidebar } from '@/web/components/layout/sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background">
      <Header />
      <div className="mx-auto flex w-full min-h-0 flex-1 md:max-w-6xl">
        <Sidebar />
        <main className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
