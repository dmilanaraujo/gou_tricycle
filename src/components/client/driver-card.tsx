"use client";

import * as React from 'react';
import Image from 'next/image';
import {Phone, MapPin, Fuel} from 'lucide-react';
import { Button } from "@/components/ui/button";
import type { Driver, VehicleType } from '@/types';
import { ImageCarouselModal } from '@/components/client/image-carousel-modal';
import { municipalities } from '@/lib/data/locations';
import {Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle} from '@/components/ui/item';
import { ImageIcon } from 'lucide-react';
import Link from 'next/link';
import {getPublicImageUrl} from '@/lib/utils';

interface DriverCardProps {
  driver: Driver;
}

const getVehicleTypeLabel = (type: VehicleType) => {
  if (type == 'electric') {
    return 'Eléctrico';
  }
  if (type == 'combustion') {
    return 'Combustión';
  }
  if (type == 'hybrid') {
    return 'Híbrido';
  }
  return 'Ninguno'
}
const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.414z"/>
    </svg>
)

export function DriverCard({ driver }: DriverCardProps) {
  const [isCarouselOpen, setIsCarouselOpen] = React.useState(false);

  const municipalityLabel = municipalities[driver.province]?.find(m => m.value === driver.municipality)?.label || driver.municipality;
  const sortedImages = driver.images.sort((a, b) => {
      if (a.primary === b.primary) return 0;
      return a.primary ? -1 : 1;
  });
  return (
      <>
          <Item key={driver.id} variant="outline" role="listitem">
              <ItemMedia variant="image" onClick={() => setIsCarouselOpen(true)}>
                  {!!sortedImages[0]?.path_thumbnail ? (
                      <Image
                          src={getPublicImageUrl(sortedImages[0].path_thumbnail)}
                          alt={`Vehículo de ${driver.alias}`}
                          width={48}
                          height={48}
                          unoptimized
                          className="object-cover grayscale"
                      />
                  ) : (
                      <ImageIcon className={'w-full'}/>
                  )}
              
              </ItemMedia>
              
              <ItemContent>
                  <ItemTitle className="line-clamp-1">
                      {driver.alias}
                      {/*<span className="text-muted-foreground">{song.album}</span>*/}
                  </ItemTitle>
                  <ItemDescription className={'flex items-center gap-2 text-xs'}>
                      <MapPin className="h-4 w-4"/>
                      <span className={'overflow-hidden'}>{municipalityLabel}</span>
                  </ItemDescription>
                  <ItemDescription className={'flex items-center gap-2 text-xs'}>
                      <Fuel className="h-4 w-4"/>
                      <span>{getVehicleTypeLabel(driver.vehicle_type)}</span></ItemDescription>
              </ItemContent>
              <ItemActions className="flex-col">
                      <Button asChild variant="outline" size="sm" className="bg-green-500 hover:bg-green-600 text-white border-green-600 w-full">
                          <Link href={`https://wa.me/${driver.phone}`} target="_blank" rel="noopener noreferrer" aria-label={`Enviar mensaje a ${driver.alias} por WhatsApp`}>
                              <WhatsAppIcon />
                              WhatsApp
                          </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm" className={'w-full'}>
                          <Link href={`tel:${driver.phone}`} aria-label={`Llamar a ${driver.alias}`}>
                              <Phone />
                              Llamar
                          </Link>
                      </Button>

              </ItemActions>
          </Item>
          <ImageCarouselModal
              images={sortedImages}
              isOpen={isCarouselOpen}
              onOpenChange={setIsCarouselOpen}
          />
      </>
  )
}
