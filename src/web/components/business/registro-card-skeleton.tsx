import { Card, CardContent } from '@/web/components/ui/card';
import { Skeleton } from '@/web/components/ui/skeleton';

export function RegistroCardSkeleton() {
  return (
    <Card className="border-none bg-card shadow-sm">
      <CardContent className="flex flex-col gap-2 p-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}
