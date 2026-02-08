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
            onClick={() => router.push(`/business/${service.business_id}/service/${service.id}`)}
            className="
        h-full w-full
        py-0
        cursor-pointer
        transition-all
        shadow-none
        flex flex-row
        min-h-[200px]
      "
        >
            {/* Imagen */}
            <CardContent
                className="
          relative
          w-[140px] sm:w-[200px]
          h-[180px] min-h-[200px]
          px-0
          bg-muted
          overflow-hidden
          rounded-l-xl rounded-tr-none rounded-tl-xl
        "
            >
                <Image
                    src={getPublicImageUrl(
                        process.env.NEXT_PUBLIC_SUPABASE_SERVICE_BUCKET || '',
                        service.image_url
                    )}
                    alt={service.name}
                    fill
                    className="object-contain"
                />
            </CardContent>

            {/* Contenido derecho */}
                <div className="flex flex-col h-full flex-1 gap-2 items-start text-left px-4 sm:px-0">
                    <CardHeader className="pt-4 pl-0 pb-0 w-full items-start text-left">
                        <CardTitle className="text-base leading-tight line-clamp-2">
                            {service.name}
                        </CardTitle>

                        <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                            {service.description}
                        </CardDescription>
                    </CardHeader>

                    <CardFooter className="flex flex-col items-start text-left w-full gap-1 pb-4 pl-0 pt-0">
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
        </Card>
)
}
