import { Frown } from 'lucide-react';
import { DriverCard } from './driver-card';
import { Skeleton } from '../ui/skeleton';
import type { Driver } from '@/types';
import {Item, ItemActions, ItemContent, ItemGroup, ItemMedia, ItemTitle} from '@/components/ui/item';

interface DriverListProps {
  drivers: Driver[];
  isLoading: boolean;
}

const DriverListSkeleton = () => (
  <>
    {[...Array(3)].map((_, i) => (
        <Item key={i} variant="outline" role="status" className="animate-pulse">
            <ItemMedia variant="image">
                <Skeleton className="h-12 w-12 rounded-md" />
            </ItemMedia>
            <ItemContent className="space-y-2">
                <ItemTitle>
                    <Skeleton className="h-4 w-32" />
                </ItemTitle>
                
                <div className="flex items-center gap-2 text-xs">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-3 w-24" />
                </div>
                
                <div className="flex items-center gap-2 text-xs">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-3 w-20" />
                </div>
            </ItemContent>
            <ItemActions className="flex-col">
                <Skeleton className="h-8 w-full rounded-md" />
                <Skeleton className="h-8 w-full rounded-md" />
            </ItemActions>
        </Item>
    ))}
  </>
);

export function DriverList({ drivers, isLoading }: DriverListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <DriverListSkeleton />
      </div>
    );
  }

  if (drivers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg mt-8 w-full">
        <Frown className="w-16 h-16 text-muted-foreground" />
        <h2 className="mt-4 text-xl font-semibold">No se encontraron conductores</h2>
        <p className="mt-1 text-muted-foreground">Prueba a ajustar tu ubicación o los filtros.</p>
      </div>
    );
  }

  return (
      <ItemGroup className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {drivers.map(driver => (
              <DriverCard key={driver.id} driver={driver}/>
          ))}
      </ItemGroup>
  );
}
