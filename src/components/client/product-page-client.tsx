'use client'

import { ProductGallery } from "@/components/client/product-gallery"
import { Product } from "@/types"
import * as React from "react"
import {applyDiscount} from "@/lib/utils";
import {Dot, PlusIcon, Slash} from "lucide-react";
import {Button} from "@/components/ui/button";
import {QuantitySelector} from "@/components/client/quantity-selector";

export default function ProductPageClient({product}: {product: Product}) {
    const [zoom, setZoom] = React.useState<{
        active: boolean
        pos: { x: number; y: number }
        image: string
    } | null>(null)
    const price = product.price ?? 0
    const price_usd = product.price_usd ?? 0
    const { finalPrice, finalPriceUsd, label } = applyDiscount(price, price_usd, product.discount)

    const [quantity, setQuantity] = React.useState(1);
    const handleAdd = () => {
        console.log("Agregar al pedido:", quantity);
        // aquí llamas a tu store (Zustand) o server action
    };

    return (
        <div className="relative px-4 py-8 max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-sm text-muted-foreground mb-6">
                <span className="hover:underline cursor-pointer">Home</span>
                <span className="mx-2">/</span>
                <span className="text-foreground font-medium">
                  {product.name}
                </span>
            </nav>

            {/*<div className="grid grid-cols-1 lg:grid-cols-2 gap-2">*/}
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4">
                {/* LEFT */}
                <ProductGallery
                    images={product.images.map((i) => i.path)}
                    onZoomChange={setZoom}
                />

                {/* RIGHT */}
                <div className="lg:sticky lg:top-24 flex flex-col gap-6">
                    {/* NAME */}
                    <h1 className="text-2xl font-semibold">{product.name}</h1>

                    {/* PRICE */}
                    <div className="flex items-center gap-1">
                        <span className="text-3xl font-bold">
                            {finalPrice}
                        </span>
                        <span className="text-muted-foreground">CUP</span>
                        <span className="text-3xl font-bold"> / </span>
                        <span className="text-3xl font-bold">
                            {finalPriceUsd}
                        </span>
                        <span className="text-muted-foreground">USD</span>
                    </div>

                    {/* DESCRIPTION */}
                    {product.description && (
                        <p className="text-muted-foreground leading-relaxed">
                            {product.description}
                        </p>
                    )}

                    {/* ADD TO ORDER */}
                    <div className="flex items-center gap-4">
                        <QuantitySelector
                            value={quantity}
                            onChange={setQuantity}
                            min={1}
                            max={50}
                        />
                        <Button size="lg" onClick={handleAdd}>
                            Agregar al Pedido
                        </Button>
                    </div>
                </div>
            </div>

            {/* 🔥 ZOOM FLOATANTE SOBRE LA COLUMNA DERECHA */}
            {zoom?.active && (
                <div
                    className="
            absolute
            top-18
            left-1/2
            w-[420px]
            aspect-square
            rounded-xl
            bg-white
            shadow-2xl
            z-50
            pointer-events-none
            overflow-hidden
        "
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url(${zoom.image})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: `${2.5 * 100}%`,
                            backgroundPosition: `${zoom.pos.x}% ${zoom.pos.y}%`,
                        }}
                    />
                </div>
            )}
        </div>
    )
}
