"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FeaturedPromoCard } from "@/components/client/featured-promo-card"
import {ArrowDownIcon, MapPin, Share, Share2, StarIcon} from "lucide-react"
import { getPublicImageUrl } from "@/lib/utils"
import { municipalities, provinces } from "@/lib/data/locations"
import * as React from "react";
import {ReviewInput} from "@/components/client/review-input";
import {FeaturedOffersCarousel} from "@/components/client/featured-offers-carousel";
import {ScrollableTabs} from "@/components/client/scrollable-tabs";
import {useState} from "react";
import {Business, Product} from "@/types";
import {Reviews} from "@/types/reviews";
import {ServiceItems} from "@/types/service-items";
import {ServiceCard} from "@/components/client/service-card";
import {ServiceDetailedCard} from "@/components/client/service-detailed-card";

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

export default function BusinessCatalog({ business, products }: {business: Business, products: ServiceItems[]}) {
    const productsRef = React.useRef<HTMLDivElement>(null)
    const [activeTab, setActiveTab] = useState("offers")

    const provinceLabel =
        provinces.find(p => p.value === business.province)?.label || business.province

    const municipalityLabel =
        municipalities[business.province]?.find(m => m.value === business.municipality)?.label ||
        business.municipality

    const fullLocationLabel = `${municipalityLabel}, ${provinceLabel}`

    const categories = React.useMemo(() => {
        const map = new Map<string, {
            id: string
            title: string
            products: ServiceItems[]
        }>()

        for (const p of products) {
            if (!p.category) continue

            const { id, name } = p.category

            if (!map.has(id)) {
                map.set(id, {
                    id,
                    title: name,
                    products: [],
                })
            }

            map.get(id)!.products.push(p)
        }

        return Array.from(map.values())
    }, [products])

    React.useEffect(() => {
        const container = productsRef.current
        if (!container) return

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter(e => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

                if (visible) {
                    setActiveTab(visible.target.id)
                }
            },
            {
                root: container,
                threshold: 0.4,
            }
        )

        categories.forEach(category => {
            const el = document.getElementById(category.id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [categories])

    return (
        <>
            {/* Banner */}
            {/*<section className="relative h-[250px] w-full rounded-xl">*/}
            {/*    <Image*/}
            {/*        src={getPublicImageUrl(process.env.NEXT_PUBLIC_SUPABASE_BUSINESS_BUCKET || "", business.banner || business.logo)}*/}
            {/*        alt={business.name}*/}
            {/*        fill*/}
            {/*        className="object-cover rounded-xl"*/}
            {/*        priority*/}
            {/*    />*/}

            {/*    <div className="absolute -bottom-8 left-6">*/}
            {/*        <div className="relative h-20 w-20">*/}
            {/*            <Image*/}
            {/*                src={getPublicImageUrl(process.env.NEXT_PUBLIC_SUPABASE_BUSINESS_BUCKET || "", business.logo)}*/}
            {/*                alt={business.name}*/}
            {/*                fill*/}
            {/*                className="rounded-full border-4 border-background bg-white object-cover"*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <div className="absolute bottom-3 right-4">*/}
            {/*        <Badge className="bg-black/50 text-white backdrop-blur-sm border border-white/10 text-xs px-3 py-1">*/}
            {/*            {fullLocationLabel}*/}
            {/*        </Badge>*/}
            {/*    </div>*/}
            {/*</section>*/}

            {/* Info */}
            {/*<section className="w-full mt-8">*/}
            {/*    <div className="flex items-center gap-4 flex-wrap">*/}
            {/*        <h2 className="text-4xl font-semibold">*/}
            {/*            {business.name}*/}
            {/*        </h2>*/}

            {/*        <div className="ml-auto flex gap-2 flex-wrap">*/}
            {/*            <Button asChild variant="outline" className="w-full md:w-auto shadow-none">*/}
            {/*                <a*/}
            {/*                    href={`https://wa.me/${business.phone}`}*/}
            {/*                    target="_blank"*/}
            {/*                    rel="noopener noreferrer"*/}
            {/*                >*/}
            {/*                    <WhatsAppIcon/>*/}
            {/*                    Enviar mensaje*/}
            {/*                </a>*/}
            {/*            </Button>*/}

            {/*            <Button asChild variant="outline" className="w-full md:w-auto shadow-none">*/}
            {/*                <a*/}
            {/*                    href={`https://wa.me/${business.phone}`}*/}
            {/*                    target="_blank"*/}
            {/*                    rel="noopener noreferrer"*/}
            {/*                >*/}
            {/*                    <Share2/>*/}
            {/*                    Compartir catálogo*/}
            {/*                </a>*/}
            {/*            </Button>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <div className="mt-2 flex flex-wrap gap-2 text-lg text-muted-foreground">*/}
            {/*        <div className="flex items-center gap-1">*/}
            {/*            <StarIcon className="w-4 h-4"/>*/}
            {/*            <span className="font-bold">{business.rating}</span>*/}
            {/*            <span>({business.reviews || 0}+)</span>*/}
            {/*        </div>*/}

            {/*        <span>• {business.section?.name}</span>*/}
            {/*        <span>• {business.categories?.[0]?.name}</span>*/}
            {/*    </div>*/}

            {/*    <p className="text-md text-muted-foreground">{business.description}</p>*/}

            {/*    <p className="flex gap-1 items-center text-md text-muted-foreground">*/}
            {/*        <MapPin className="w-4 h-4"/>*/}
            {/*        {business.address}*/}
            {/*    </p>*/}
            {/*</section>*/}

            <section className="w-full mt-6 space-y-10">
                {categories.map(category => (
                    <div key={category.id}>
                        {/* Subtítulo de la categoría */}
                        <h3 className="text-xl font-semibold mb-4">
                            {category.title}
                        </h3>

                        {/* Grid de productos de esa categoría */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                            {category.products.map(product => (
                                <ServiceDetailedCard
                                    key={product.id}
                                    service={product}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </>
    )
}
