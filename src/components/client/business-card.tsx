'use client';

import {Sparkles, StarIcon} from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { getPublicImageUrl } from '@/lib/utils';
import {municipalities, provinces} from '@/lib/data/locations';
import {Business, promotions} from '@/types/business';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import * as React from 'react';

const WhatsAppIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4"
    >
        <path
            d="M.057 24l1.687-6.163C.703 16.033.156 13.988.157 11.891c.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.414z"/>
    </svg>
);

interface BusinessCardProps {
    business: Business;
}

export function BusinessCard({business}: BusinessCardProps) {
    // const municipalityLabel =
    //     municipalities[business.province]?.find((m) => m.value === business.municipality)?.label + provinces[business.province].label ||
    //     business.municipality + ', ' + business.province;

    const provinceLabel = provinces.find(p => p.value === business.province)?.label || business.province;
    const municipalityLabel =
        municipalities[business.province]?.find((m) => m.value === business.municipality)?.label || business.municipality;

    const fullLocationLabel = `${municipalityLabel}, ${provinceLabel}`;
    const promotionLabel = promotions.find(pr => pr.value === business.promotion)?.label || business.promotion;

    const categoryName = business.categories?.[0]?.name
    const sectionName = business.sections?.[0]?.name

    const badgeLabel =
        categoryName && sectionName
            ? `${sectionName} · ${categoryName}`
            : categoryName ?? sectionName;

    return (
        <Card className="max-w-md pt-0 shadow-none border-none">
            <CardContent className="px-0 pb-0">
                <div className="relative w-full aspect-video h-[180px] rounded-xl overflow-hidden">
                    <Image
                        src={getPublicImageUrl(business.logo)}
                        alt="Banner"
                        fill
                        className="object-cover"
                    />
                    {/* Badge de promoción opcional */}
                    {business.promotion && (
                        <div className="absolute top-2 left-2">
                            <Badge variant="destructive" className="text-xs text-white bg-primary">
                                {promotionLabel}
                            </Badge>
                        </div>
                    )}

                    {/* Badge de destacado opcional */}
                    {business.featured && (
                        <div className="absolute top-2 right-2">
                            <Badge variant="secondary" className="text-xs flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                Destacado
                            </Badge>
                        </div>
                    )}

                    {/* Chip de sección o categoría */}
                    {(business.sections?.length || business.categories?.length) && (
                        <div className="absolute bottom-2 left-2">
                            <Badge className="text-xs bg-primary/40 text-white backdrop-blur">
                                {badgeLabel}
                            </Badge>
                        </div>
                    )}
                </div>

                <div className="px-0 py-2">
                    <span className="text-lg">{business.name}</span>
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                <StarIcon className="w-4 h-4 fill-amber-500 stroke-amber-500"/>
                                {business.rating} ({business.reviews || 0}+)
                            </span>
                            <Badge variant="secondary">{fullLocationLabel}</Badge>
                        </div>
                    </div>
                </div>

                <div className="gap-3 max-sm:flex-col max-sm:items-stretch px-0 pt-0 pb-0">
                    <Button asChild variant="outline">
                        <a
                            href={`https://wa.me/${business.phone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Enviar mensaje a ${business.name} por WhatsApp`}
                        >
                            <WhatsAppIcon/>
                            WhatsApp
                        </a>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
