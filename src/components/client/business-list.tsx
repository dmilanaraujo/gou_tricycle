import { Frown } from 'lucide-react';
import { DriverCard } from './driver-card';
import { Skeleton } from '../ui/skeleton';
import type { Driver } from '@/types';
import {Item, ItemActions, ItemContent, ItemGroup, ItemMedia, ItemTitle} from '@/components/ui/item';
import {BusinessCard} from "@/components/client/business-card";
import {Business} from "@/types/business";

interface BusinessListProps {
    businesses: Business[];
  isLoading: boolean;
}

const BusinessListSkeleton = () => (
    <>
        {[...Array(4)].map((_, i) => (
            <div
                key={i}
                className="max-w-md pt-0 shadow-none border-none animate-pulse"
            >
                {/* Imagen */}
                <div className="relative w-full aspect-video h-[180px] rounded-xl overflow-hidden bg-muted" />

                {/* Contenido */}
                <div className="px-0 py-3 space-y-2">
                    {/* Nombre */}
                    <Skeleton className="h-5 w-2/3" />

                    {/* Rating + ubicación */}
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-5 w-32 rounded-full" />
                    </div>
                </div>

                {/* Botón */}
                <div className="px-0 pb-3">
                    <Skeleton className="h-9 w-28 rounded-md" />
                </div>
            </div>
        ))}
    </>
)

export function BusinessList({ businesses, isLoading }: BusinessListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        <BusinessListSkeleton />
      </div>
    );
  }

  if (businesses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg mt-8 w-full">
        <Frown className="w-16 h-16 text-muted-foreground" />
        <h2 className="mt-4 text-xl font-semibold">No se encontraron conductores</h2>
        <p className="mt-1 text-muted-foreground">Prueba a ajustar tu ubicación o los filtros.</p>
      </div>
    );
  }

  return (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {businesses.map(business => (
              <BusinessCard key={business.id} business={business}/>
          ))}
      </div>
  );
}
