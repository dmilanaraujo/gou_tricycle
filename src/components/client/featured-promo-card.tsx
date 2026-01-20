import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {ArrowDownIcon, ArrowRight} from "lucide-react";
import * as React from "react";

type FeaturedPromoCardProps = {
    title: string                 // OBLIGATORIO
    subtitle?: string             // opcional (badge)
    description?: string
    buttonLabel?: string
    buttonHref?: string
    backgroundImage?: string     // opcional
}

export function FeaturedPromoCard({
                                      title,
                                      subtitle,
                                      description,
                                      buttonLabel,
                                      buttonHref,
                                      backgroundImage,
                                  }: FeaturedPromoCardProps) {
    return (
        <div className="relative overflow-hidden rounded-xl border bg-yellow-400 text-black min-h-[260px] flex items-center">

            {/* Imagen de fondo opcional */}
            {backgroundImage && (
                <Image
                    src={backgroundImage}
                    alt="Promo background"
                    fill
                    className="object-cover opacity-90"
                />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-yellow-400/80" />

            {/* Contenido */}
            <div className="relative z-10 p-6 max-w-[70%]">

                {subtitle && (
                    <span className="inline-block mb-3 px-4 py-1 rounded-full bg-white/80 text-sm font-semibold">
            {subtitle}
          </span>
                )}

                <h3 className="text-3xl font-bold leading-tight">
                    {title}
                </h3>

                {description && (
                    <p className="mt-3 text-sm font-semibold text-black/60">
                        {description}
                    </p>
                )}

                {buttonLabel && buttonHref && (
                    <Button
                        variant="secondary"
                        className="mt-5 px-3 py-1 rounded-full font-semibold bg-muted hover:bg-primary hover:text-white"
                    >
                        {buttonLabel}
                        <ArrowRight className="w-4 h-4"/>
                    </Button>
                )}
            </div>
        </div>
    )
}
