import { Card, CardContent } from '@/web/components/ui/card';
import { Skeleton } from '@/web/components/ui/skeleton';

export function RegistroCardSkeleton() {
  return (
    <Card className="mb-3 break-inside-avoid border-none bg-card shadow-sm md:mb-4">
      <CardContent className="flex flex-col gap-2 p-4">
        <Skeleton className="h-3 w-16" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}
