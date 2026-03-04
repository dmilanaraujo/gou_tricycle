'use client'

import {
    Card,
    CardHeader,
    CardTitle,
    CardFooter,
    CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {formatPrice, getPublicImageUrl} from '@/lib/utils'
import { ServiceItems } from '@/types/service-items'
import {Business} from '@/types';

interface ServiceCardProps {
    business: Business;
    service: ServiceItems
}

export function ServiceDetailedCard({ business, service }: ServiceCardProps) {
    const router = useRouter()

    return (
        <Card
            onClick={() => {
                if (service.stock === 0) return
                router.push(`/business/${business.slug}/service/${service.id}`)
            }}
            className="
                h-full w-full
                py-0
                cursor-pointer
                transition-all
                shadow-none
                flex flex-col sm:flex-row
                min-h-[200px]
              "
        >
            {/* Imagen */}
            <div className="flex flex-1 flex-col sm:flex-row">
                <div
                    className="bg-muted rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none relative overflow-hidden w-full sm:w-[200px] h-[200px] sm:h-auto">
                    <Image
                        src={getPublicImageUrl(
                            process.env.NEXT_PUBLIC_SUPABASE_SERVICE_BUCKET || '',
                            service.image_url
                        )}
                        alt={service.name}
                        fill
                        className="object-contain"
                    />
                    {service.stock === 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="
                              bg-white/90
                              text-black
                              text-sm
                              font-bold
                              uppercase
                              tracking-widest
                              px-4
                              py-2
                              rounded-md
                              shadow-lg
                            ">
                              Agotado
                            </span>
                        </div>
                    )}
                </div>
                {/* Contenido derecho */}
                <div className="flex flex-col flex-1 h-full items-start text-left gap-2 p-2">
                    <CardHeader className="px-0 w-full items-start text-left">
                        <CardTitle className="text-base leading-tight line-clamp-2">
                            {service.name}
                        </CardTitle>

                        <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                            {service.description}
                        </CardDescription>
                    </CardHeader>
                    <div className="flex flex-row gap-1 items-center">
                        {service.um && (
                            <div>
                                <span className="
                                  inline-flex
                                  items-center
                                  rounded-md
                                  bg-primary/10
                                  text-primary
                                  px-3
                                  py-1
                                  text-xs
                                  font-semibold
                                ">
                                  {service.um_value}{service.um}
                                </span>
                            </div>
                        )}
                        {service.min_buy > 1 && (
                            <div>
                                <span
                                    className="
                                    inline-flex
                                    items-center
                                    rounded-md
                                    bg-amber-50
                                    text-amber-700
                                    border
                                    border-amber-200
                                    px-3
                                    py-1
                                    text-xs
                                    font-semibold
                                  ">
                                  Min. {service.min_buy}
                                </span>
                            </div>
                        )}
                        <div className="flex flex-row gap-1">
                            {service.format && (
                                <div>
                                <span
                                    className="
                                    inline-flex
                                    items-center
                                    rounded-md
                                    bg-indigo-50
                                    text-indigo-700
                                    border
                                    border-indigo-200
                                    px-3
                                    py-1
                                    text-xs
                                    font-semibold
                                  ">
                                  {service.format} {service.format_value}u
                                </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <CardFooter className="flex flex-col items-start text-left w-full gap-1 p-0 border-0">
                        {service.discount_label && (
                            <Badge variant="destructive" className="text-xs rounded-sm text-white">
                                {service.discount_label}
                            </Badge>
                        )}

                        {Number(service.final_price) > 0 && (
                            <div className="flex items-center gap-1 text-sm">
                                <span className="font-semibold">{formatPrice(Number(service.final_price), "CUP")}</span>
                                <span className="text-muted-foreground">CUP</span>
                                {service.discount_label && (
                                    <span className="relative ml-1 text-xs font-semibold text-muted-foreground">
                                    {service.price} CUP
                                    <span className="absolute inset-x-0 top-1/2 h-px bg-muted-foreground"/>
                                </span>
                                )}
                            </div>
                         )}

                        {Number(service.final_price_usd) > 0 && (
                            <div className="flex items-center gap-1 text-sm">
                                <span className="font-semibold">{formatPrice(Number(service.final_price_usd), "USD")}</span>
                                <span className="text-muted-foreground">USD</span>
                                {service.discount_label && (
                                    <span className="relative ml-1 text-xs font-semibold text-muted-foreground">
                                    {service.price_usd} USD
                                    <span className="absolute inset-x-0 top-1/2 h-px bg-muted-foreground"/>
                                </span>
                                )}
                            </div>
                        )}
                    </CardFooter>
                </div>
            </div>
        </Card>
    )
}
