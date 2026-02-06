'use client'

import { ProductGallery } from "@/components/client/product-gallery"
import { Product } from "@/types"
import * as React from "react"

export default function ProductPageClient({
                                              product,
                                          }: {
    product: Product
}) {
    const [zoom, setZoom] = React.useState<{
        active: boolean
        pos: { x: number; y: number }
        image: string
    } | null>(null)

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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* LEFT */}
                <ProductGallery
                    images={product.images.map((i) => i.path)}
                    onZoomChange={setZoom}
                />

                {/* RIGHT */}
                <div className="lg:sticky lg:top-24 flex flex-col gap-6">
                    <h1 className="text-2xl font-semibold">{product.name}</h1>

                    <div className="text-3xl font-bold">
                        ${product.price}
                    </div>

                    {product.description && (
                        <p className="text-muted-foreground leading-relaxed">
                            {product.description}
                        </p>
                    )}

                    <div className="flex gap-4">
                        <button className="flex-1 bg-black text-white py-3 rounded-lg">
                            Buy Now
                        </button>
                        <button className="flex-1 border py-3 rounded-lg">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* 🔥 ZOOM FLOATANTE SOBRE LA COLUMNA DERECHA */}
            {zoom?.active && (
                <div
                    className="
            absolute
            top-24
            right-0
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
                            backgroundSize: "250%",
                            backgroundPosition: `${zoom.pos.x}% ${zoom.pos.y}%`,
                        }}
                    />
                </div>
            )}
        </div>
    )
}
