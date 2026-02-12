'use client'

import { Dot } from 'lucide-react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
    CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { getPublicImageUrl } from '@/lib/utils'
import { ServiceItems } from '@/types/service-items'

interface ServiceCardProps {
    service: ServiceItems
}

export function ServiceDetailedCard({ service }: ServiceCardProps) {
    const router = useRouter()

    return (
        <Card
            onClick={() => {
                if (service.stock === 0) return
                router.push(`/business/${service.business_id}/service/${service.id}`)
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
                <div className="flex flex-col flex-1 h-full items-start text-left gap-1 p-2">
                    <CardHeader className="px-0 w-full items-start text-left">
                        <CardTitle className="text-base leading-tight line-clamp-2">
                            {service.name}
                        </CardTitle>

                        <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                            {service.description}
                        </CardDescription>
                    </CardHeader>
                    {service.um && (
                        <div>
    <span className="
      inline-flex
      items-center
      rounded-full
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
                    <CardFooter className="flex flex-col items-start text-left w-full gap-1 p-0">
                        {service.discount_label && (
                            <Badge variant="destructive" className="text-xs rounded-sm text-white">
                                {service.discount_label}
                            </Badge>
                        )}

                        <div className="flex items-center gap-1 text-sm">
                            <span className="font-semibold">{service.final_price}</span>
                            <span className="text-muted-foreground">CUP</span>
                            <Dot className="h-4 w-4"/>
                            <span className="font-semibold">{service.final_price_usd}</span>
                            <span className="text-muted-foreground">USD</span>
                        </div>

                        {service.discount_label && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <span className="relative">
                                            {service.price} CUP
                                            <span className="absolute inset-x-0 top-1/2 h-px bg-muted-foreground"/>
                                        </span>
                                <Dot className="h-3 w-3"/>
                                <span className="relative">
                                            {service.price_usd} USD
                                            <span className="absolute inset-x-0 top-1/2 h-px bg-muted-foreground"/>
                                        </span>
                            </div>
                        )}
                    </CardFooter>
                </div>
            </div>
        </Card>
    )
}
