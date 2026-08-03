import { Card, CardContent } from '@/web/components/ui/card';
import { Skeleton } from '@/web/components/ui/skeleton';

export function RegistroCardSkeleton() {
  return (
    <Card className="h-40 border-none bg-card shadow-sm">
      <CardContent className="flex h-full flex-col gap-2 p-3">
        <Skeleton className="h-3 w-16 shrink-0" />
        <div className="flex flex-1 flex-col justify-center gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="flex h-6 shrink-0 gap-1.5">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}
