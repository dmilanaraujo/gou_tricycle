'use client'

import * as React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn, getPublicImageUrl } from '@/lib/utils'

type Props = {
    images: string[]
    alt?: string
}

export function ProductGallery({ images, alt = 'Product image' }: Props) {
    const [displayIndex, setDisplayIndex] = React.useState(0)
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    const [outgoingIndex, setOutgoingIndex] = React.useState<number | null>(null)
    const [incomingIndex, setIncomingIndex] = React.useState<number | null>(null)
    const [animating, setAnimating] = React.useState(false)

    const [zoomPos, setZoomPos] = React.useState({ x: 50, y: 50 })
    const [zoomFixed, setZoomFixed] = React.useState(false)
    const [hovering, setHovering] = React.useState(false)
    const [isTouch, setIsTouch] = React.useState(false)

    const zoom = 2.5
    const DURATION = 600

    const isAnimatingRef = React.useRef(false)

    // ✅ CLAVE: saber si el cursor está realmente encima del panel principal
    const isPointerInsideRef = React.useRef(false)

    React.useEffect(() => {
        setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }, [])

    const imageUrl = React.useCallback(
        (index: number) =>
            getPublicImageUrl(
                process.env.NEXT_PUBLIC_SUPABASE_SERVICE_BUCKET || '',
                images[index]
            ),
        [images]
    )

    const settleAnimation = React.useCallback(() => {
        if (incomingIndex !== null) {
            setDisplayIndex(incomingIndex)
            setSelectedIndex(incomingIndex)
        }

        setOutgoingIndex(null)
        setIncomingIndex(null)
        setAnimating(false)
        isAnimatingRef.current = false

        // ✅ Solo mostrar hover si el cursor está dentro (y no está fijo)
        if (!isTouch && !zoomFixed) {
            setHovering(isPointerInsideRef.current)
        }
    }, [incomingIndex, isTouch, zoomFixed])

    const changeImage = React.useCallback(
        (next: number) => {
            if (next < 0 || next >= images.length) return
            if (next === selectedIndex && outgoingIndex === null && incomingIndex === null) return

            setSelectedIndex(next)

            // al navegar, si tenías zoom fijo lo soltamos
            setZoomFixed(false)

            // ✅ NO fuerces hovering=false aquí, porque si el mouse está encima,
            // queremos que el panel siga apareciendo durante navegación con flechas.
            // En thumbnails normalmente el mouse NO está encima => no aparecerá.

            // si ya estaba animando, asentamos “duro” antes de iniciar otra
            if (isAnimatingRef.current) {
                const settleTo = incomingIndex ?? next
                setDisplayIndex(settleTo)
                setOutgoingIndex(null)
                setIncomingIndex(null)
                setAnimating(false)
                isAnimatingRef.current = false
            }

            setOutgoingIndex(displayIndex)
            setIncomingIndex(next)
            setAnimating(false)
            isAnimatingRef.current = true

            requestAnimationFrame(() => setAnimating(true))
        },
        [displayIndex, images.length, selectedIndex, outgoingIndex, incomingIndex]
    )

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouch || zoomFixed) return

        const rect = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setZoomPos({ x, y })
    }

    const currentVisibleUrl = imageUrl(displayIndex)

    return (
        <div className="relative flex gap-6 w-full">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3 shrink-0">
                {images.map((_, i) => {
                    const active = i === selectedIndex
                    return (
                        <button
                            key={i}
                            onClick={() => changeImage(i)}
                            className={cn(
                                'relative h-20 w-20 rounded-lg bg-muted overflow-hidden transition',
                                'hover:cursor-pointer'
                            )}
                        >
                            <Image
                                src={imageUrl(i)}
                                alt={`${alt} ${i + 1}`}
                                fill
                                className="object-contain"
                            />
                        </button>
                    )
                })}
            </div>

            {/* Wrapper de imagen principal */}
            <div className="relative">
                <div
                    className="relative aspect-square w-[420px] rounded-xl bg-muted overflow-hidden cursor-crosshair"
                    onMouseEnter={() => {
                        if (isTouch) return
                        isPointerInsideRef.current = true
                        setHovering(true)
                    }}
                    onMouseLeave={() => {
                        isPointerInsideRef.current = false
                        setHovering(false)
                        if (!zoomFixed) setZoomPos({ x: 50, y: 50 })
                    }}
                    onMouseMove={handleMouseMove}
                    onClick={() => !isTouch && setZoomFixed((v) => !v)}
                >
                    {/* Imagen estable */}
                    {outgoingIndex === null && incomingIndex === null && (
                        <Image
                            src={currentVisibleUrl}
                            alt={alt}
                            fill
                            priority
                            className="object-contain"
                        />
                    )}

                    {/* Imagen saliente */}
                    {outgoingIndex !== null && (
                        <div
                            className={cn(
                                'absolute inset-0 transition-transform',
                                `duration-[${DURATION}ms]`,
                                'ease-[cubic-bezier(0.4,0,0.2,1)]',
                                animating ? '-translate-x-full' : 'translate-x-0'
                            )}
                        >
                            <Image src={imageUrl(outgoingIndex)} alt="" fill className="object-contain" />
                        </div>
                    )}

                    {/* Imagen entrante */}
                    {incomingIndex !== null && (
                        <div
                            className={cn(
                                'absolute inset-0 transition-transform',
                                `duration-[${DURATION}ms]`,
                                'ease-[cubic-bezier(0.4,0,0.2,1)]',
                                animating ? 'translate-x-0' : 'translate-x-full'
                            )}
                            onTransitionEnd={settleAnimation}
                        >
                            <Image src={imageUrl(incomingIndex)} alt="" fill priority className="object-contain" />
                        </div>
                    )}

                    {/* Indicador */}
                    {!isTouch && (
                        <div className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded z-10">
                            {zoomFixed ? 'Click para salir del zoom' : 'Click para fijar zoom'}
                        </div>
                    )}

                    {/* Flechas (NO deben fijar zoom) */}
                    <Button
                        size="icon"
                        variant="secondary"
                        onClick={(e) => {
                            e.stopPropagation()
                            changeImage(displayIndex === 0 ? images.length - 1 : displayIndex - 1)
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 hover:bg-white hover:cursor-pointer"
                    >
                        <ChevronLeft />
                    </Button>

                    <Button
                        size="icon"
                        variant="secondary"
                        onClick={(e) => {
                            e.stopPropagation()
                            changeImage(displayIndex === images.length - 1 ? 0 : displayIndex + 1)
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 hover:bg-white hover:cursor-pointer"
                    >
                        <ChevronRight />
                    </Button>
                </div>

                {/* Panel zoom overlay */}
                {!isTouch && (hovering || zoomFixed) && (
                    <div
                        className={cn(
                            'absolute top-0 left-full ml-6',
                            'w-[420px] aspect-square rounded-xl bg-white overflow-hidden',
                            'shadow-xl z-50 pointer-events-none'
                        )}
                    >
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `url(${currentVisibleUrl})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: `${zoom * 100}% ${zoom * 100}%`,
                                backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
