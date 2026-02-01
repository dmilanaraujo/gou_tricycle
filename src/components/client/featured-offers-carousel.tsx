"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";
import {FeaturedItems} from "@/types/featured-items";
import {ServiceItems} from "@/types/service-items";
import {ServiceCard} from "@/components/client/service-card";

export type FeaturedOffer = {
    id: string
    name: string
    image_url: string
    price: number
    final_price: number
    discount_label?: string
}


type Props = {
    title: string
    items: ServiceItems[]
}

export function FeaturedOffersCarousel({ title, items }: Props) {
    return (
        <Carousel
            opts={{ align: "start", dragFree: true, loop: true, slidesToScroll: 1 }}
            plugins={[Autoplay({delay: 3000, stopOnInteraction: false})]}
            className="w-full"
        >
            <section className="w-full space-y-4">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold">{title}</h3>

                    <div className="flex items-center gap-2">
                        <CarouselPrevious className="static translate-x-0 translate-y-0" />
                        <CarouselNext className="static translate-x-0 translate-y-0" />
                    </div>
                </div>

                {/* Carrusel */}
                <CarouselContent className="-ml-4">
                    {items.map(item => (
                        <CarouselItem
                            key={item.id}
                            className="pl-4 basis-[260px] md:basis-[280px]"
                        >
                            <ServiceCard service={item} />
                            {/*<div className="rounded-2xl bg-muted/30 p-4">*/}

                            {/*    <div className="relative w-full h-[180px] rounded-xl overflow-hidden bg-white">*/}
                            {/*        <Image*/}
                            {/*            src={item.image_url}*/}
                            {/*            alt={item.name}*/}
                            {/*            fill*/}
                            {/*            className="object-contain"*/}
                            {/*        />*/}

                            {/*        /!*{item.rankingLabel && (*!/*/}
                            {/*        /!*    <Badge className="absolute top-2 left-2 bg-primary text-white text-xs">*!/*/}
                            {/*        /!*        {item.rankingLabel}*!/*/}
                            {/*        /!*    </Badge>*!/*/}
                            {/*        /!*)}*!/*/}
                            {/*    </div>*/}

                            {/*    <div className="mt-3 space-y-1">*/}
                            {/*        <h4 className="font-semibold text-sm line-clamp-2">*/}
                            {/*            {item.name}*/}
                            {/*        </h4>*/}

                            {/*        <div className="flex items-center gap-2 text-sm">*/}
                            {/*            <span className="font-bold">${item.base_price.toFixed(2)}</span>*/}

                            {/*            {item.final_price && (*/}
                            {/*                <span className="line-through text-muted-foreground">*/}
                            {/*                    ${item.final_price.toFixed(2)}*/}
                            {/*                  </span>*/}
                            {/*            )}*/}

                            {/*            {item.discount_label && (*/}
                            {/*                <Badge variant="destructive" className="text-xs">*/}
                            {/*                    {item.discount_label}*/}
                            {/*                </Badge>*/}
                            {/*            )}*/}
                            {/*        </div>*/}

                            {/*        /!*{item.rating && (*!/*/}
                            {/*        /!*    <div className="text-xs text-muted-foreground">*!/*/}
                            {/*        /!*        👍 {item.rating}% ({item.likes})*!/*/}
                            {/*        /!*    </div>*!/*/}
                            {/*        /!*)}*!/*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </CarouselItem>
                    ))}
                </CarouselContent>

            </section>
        </Carousel>
    )
}

