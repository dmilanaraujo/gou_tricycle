import { Frown } from 'lucide-react';
import { DriverCard } from './DriverCard';
import { Skeleton } from './ui/skeleton';
import type { Driver } from '@/types';

interface DriverListProps {
  drivers: Driver[];
  isLoading: boolean;
}

const DriverListSkeleton = () => (
  <>
    {[...Array(3)].map((_, i) => (
       <div key={i} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg">
         <Skeleton className="w-full sm:w-28 h-40 sm:h-28 shrink-0 rounded-md" />
         <div className="flex flex-col justify-between flex-grow space-y-2">
           <Skeleton className="h-6 w-3/4" />
           <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-28" />
              <Skeleton className="h-9 w-24" />
           </div>
         </div>
       </div>
    ))}
  </>
);

export function DriverList({ drivers, isLoading }: DriverListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 w-full">
        <DriverListSkeleton />
      </div>
    );
  }

  if (drivers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg mt-8 w-full">
        <Frown className="w-16 h-16 text-muted-foreground" />
        <h2 className="mt-4 text-xl font-semibold">No drivers found</h2>
        <p className="mt-1 text-muted-foreground">Try adjusting your location or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 w-full">
      {drivers.map(driver => (
        <DriverCard key={driver.id} driver={driver} />
      ))}
    </div>
  );
}
