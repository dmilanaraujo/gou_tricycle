'use client';

import {Dot} from 'lucide-react';
import {
    Card,
    CardContent,
} from '@/components/ui/card';
import { getPublicImageUrl } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import * as React from 'react';
import {useRouter} from "next/navigation";
import {ServiceItems} from "@/types/service-items";

interface ServiceCardProps {
    service: ServiceItems;
}

export function ServiceCard({service}: ServiceCardProps) {
    const router = useRouter();

    return (
        <Card onClick={() => router.push(`/business/${service.id}`)} className="max-w-md pt-0 shadow-none border-none hover:cursor-pointer">
            <CardContent className="px-0 pb-0">
                <div className="relative w-full h-[180px] rounded-xl overflow-hidden bg-muted">
                    <Image
                        src={getPublicImageUrl(process.env.NEXT_PUBLIC_SUPABASE_SERVICE_BUCKET || "", service.image_url)}
                        alt="Banner"
                        fill
                        className="object-contain"
                    />
                    {/* Badge de promoción opcional */}
                    {/*{service.discount_label && (*/}
                    {/*    <div className="absolute top-2 left-2">*/}
                    {/*        <Badge variant="destructive" className="text-xs text-white bg-primary">*/}
                    {/*            {service.discount_label}*/}
                    {/*        </Badge>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>

                <div className="px-0 py-0">
                    <span className="text-md block mt-1">
                        {service.name}
                    </span>
                    {service.discount_label && (
                        <Badge variant="destructive" className="text-xs text-white rounded-sm">
                            {service.discount_label}
                        </Badge>
                    )}
                    <div className="flex items-center">
                        {/* Izquierda: precios */}
                        <div className="flex items-center gap-1">
                            <span className="text-md font-semibold">
                                {service.final_price}
                            </span>
                            <span className="text-sm text-muted-foreground">
                                CUP
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Dot/>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-md font-semibold">
                                {service.final_price_usd}
                            </span>
                            <span className="text-sm text-muted-foreground">
                                USD
                            </span>
                        </div>
                    </div>
                    {service.discount_label != null && (
                        <div className="flex items-center">
                            <div className="flex items-center gap-1">
                                <span className="text-md font-semibold text-muted-foreground relative">
                                    {service.price}
                                    <span
                                        className="absolute top-1/2 left-0 right-0 h-[1px] bg-muted-foreground transform -translate-y-1/2"></span>
                                </span>
                                <span className="text-sm text-muted-foreground relative">
                                    CUP
                                    <span
                                        className="absolute top-1/2 left-0 right-0 h-[1px] bg-muted-foreground transform -translate-y-1/2"></span>
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Dot/>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-md font-semibold text-muted-foreground relative">
                                    {service.price_usd}
                                    <span
                                        className="absolute top-1/2 left-0 right-0 h-[1px] bg-muted-foreground transform -translate-y-1/2"></span>
                                </span>
                                <span className="text-sm text-muted-foreground relative">
                                    USD
                                    <span
                                        className="absolute top-1/2 left-0 right-0 h-[1px] bg-muted-foreground transform -translate-y-1/2"></span>
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/*<div className="gap-3 max-sm:flex-col max-sm:items-stretch px-0 pt-0 pb-0">*/}
                {/*    <Button asChild variant="outline" className={'w-full md:w-auto'}>*/}
                {/*        <a*/}
                {/*            href={`https://wa.me/${business.phone}`}*/}
                {/*            target="_blank"*/}
                {/*            rel="noopener noreferrer"*/}
                {/*            onClick={(e) => e.stopPropagation()}*/}
                {/*            aria-label={`Enviar mensaje a ${business.name} por WhatsApp`}*/}
                {/*        >*/}
                {/*            <WhatsAppIcon />*/}
                {/*            WhatsApp*/}
                {/*        </a>*/}
                {/*    </Button>*/}

                {/*</div>*/}
            </CardContent>
        </Card>
    );
}
