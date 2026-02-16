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

            <section className="w-full mt-6 mb-6 space-y-10">
                {categories.map(category => (
                    <div key={category.id}>
                        {/* Subtítulo de la categoría */}
                        <h3 className="text-xl font-semibold mb-4">
                            {category.title}
                        </h3>

                        {/* Grid de productos de esa categoría */}
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 items-stretch">
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
