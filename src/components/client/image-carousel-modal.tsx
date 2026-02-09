"use client";

import Image from 'next/image';
import {
  Dialog,
  DialogContent, DialogTitle,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {BucketImage} from '@/components/ui/file-upload';

interface ImageCarouselModalProps {
  images: BucketImage[];
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function ImageCarouselModal({ images, isOpen, onOpenChange }: ImageCarouselModalProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTitle className='sr-only'/>
      <DialogContent className="max-w-3xl p-0 bg-transparent border-0">
        <Carousel className="w-full">
          <CarouselContent>
            {images.filter(im => !!im.fullPublicUrl).map((src, index) => (
              <CarouselItem key={index}>
                <div className="aspect-[3/2] w-full relative">
                  <Image
                    src={src.fullPublicUrl!}
                    alt={`Imagen ${index + 1}`}
                    fill
                    unoptimized
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 1 && (
            <>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
            </>
          )}
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
