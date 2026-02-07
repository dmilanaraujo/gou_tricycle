'use client'

import * as React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn, getPublicImageUrl } from '@/lib/utils'

type ZoomPayload = {
    active: boolean
    pos: { x: number; y: number }
    image: string
}

type Props = {
    images: string[]
    alt?: string
    onZoomChange?: (zoom: ZoomPayload | null) => void
}

export function ProductGallery({ images, alt = 'Product image', onZoomChange }: Props) {
    const [displayIndex, setDisplayIndex] = React.useState(0)
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    const [outgoingIndex, setOutgoingIndex] = React.useState<number | null>(null)
    const [incomingIndex, setIncomingIndex] = React.useState<number | null>(null)
    const [animating, setAnimating] = React.useState(false)

    const [zoomPos, setZoomPos] = React.useState({ x: 50, y: 50 })
    const [zoomFixed, setZoomFixed] = React.useState(false)
    const [hovering, setHovering] = React.useState(false)
    const [isTouch, setIsTouch] = React.useState(false)

    const isPointerInsideRef = React.useRef(false)
    const isAnimatingRef = React.useRef(false)

    const zoom = 2.5
    const DURATION = 600

    React.useEffect(() => {
        setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }, [])

    const imageUrl = React.useCallback(
        (index: number) =>
            getPublicImageUrl(process.env.NEXT_PUBLIC_SUPABASE_SERVICE_BUCKET || '', images[index]),
        [images]
    )

    const currentImage = imageUrl(displayIndex)

    /* ✅ EMITIR ZOOM DE FORMA SEGURA (SIDE EFFECT) */
    React.useEffect(() => {
        if (!onZoomChange) return

        if (zoomFixed || hovering) {
            onZoomChange({
                active: true,
                pos: zoomPos,
                image: currentImage,
            })
        } else {
            onZoomChange(null)
        }
    }, [zoomFixed, hovering, zoomPos, currentImage, onZoomChange])

    const settleAnimation = React.useCallback(() => {
        if (incomingIndex !== null) {
            setDisplayIndex(incomingIndex)
            setSelectedIndex(incomingIndex)
        }

        setOutgoingIndex(null)
        setIncomingIndex(null)
        setAnimating(false)
        isAnimatingRef.current = false
    }, [incomingIndex])

    const changeImage = React.useCallback(
        (next: number) => {
            if (next < 0 || next >= images.length) return
            if (next === selectedIndex && !incomingIndex && !outgoingIndex) return

            setSelectedIndex(next)
            setZoomFixed(false)
            setHovering(false)

            if (isAnimatingRef.current) {
                setDisplayIndex(incomingIndex ?? next)
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
        [displayIndex, images.length, selectedIndex, incomingIndex, outgoingIndex]
    )

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouch || zoomFixed) return

        const rect = e.currentTarget.getBoundingClientRect()
        setZoomPos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        })
    }

    return (
        <div className="relative flex gap-6 w-full">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3 shrink-0">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => changeImage(i)}
                        className={cn(
                            'relative h-20 w-20 rounded-lg overflow-hidden bg-muted hover:cursor-pointer'
                        )}
                    >
                        <Image src={imageUrl(i)} alt="" fill className="object-contain" />
                    </button>
                ))}
            </div>

            {/* Imagen principal */}
            <div
                className="relative aspect-square w-[420px] rounded-xl bg-muted overflow-hidden cursor-crosshair"
                onMouseEnter={() => {
                    if (isTouch) return
                    isPointerInsideRef.current = true
                    setHovering(true)
                }}
                onMouseLeave={() => {
                    isPointerInsideRef.current = false
                    if (!zoomFixed) setHovering(false)
                    if (!zoomFixed) setZoomPos({ x: 50, y: 50 })
                }}
                onMouseMove={handleMouseMove}
                onClick={() => {
                    if (isTouch) return
                    setZoomFixed(v => !v)
                }}
            >
                {outgoingIndex === null && incomingIndex === null && (
                    <Image src={currentImage} alt={alt} fill priority className="object-contain" />
                )}

                {outgoingIndex !== null && (
                    <div
                        className={cn(
                            'absolute inset-0 transition-transform',
                            `duration-[${DURATION}ms]`,
                            animating ? '-translate-x-full' : 'translate-x-0'
                        )}
                    >
                        <Image src={imageUrl(outgoingIndex)} alt="" fill className="object-contain" />
                    </div>
                )}

                {incomingIndex !== null && (
                    <div
                        className={cn(
                            'absolute inset-0 transition-transform',
                            `duration-[${DURATION}ms]`,
                            animating ? 'translate-x-0' : 'translate-x-full'
                        )}
                        onTransitionEnd={settleAnimation}
                    >
                        <Image src={imageUrl(incomingIndex)} alt="" fill className="object-contain" />
                    </div>
                )}

                <div className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded">
                    {zoomFixed ? 'Click para salir del zoom' : 'Click para fijar zoom'}
                </div>

                <Button
                    size="icon"
                    variant="secondary"
                    onClick={(e) => {
                        e.stopPropagation()
                        changeImage(displayIndex === 0 ? images.length - 1 : displayIndex - 1)
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 hover:cursor-pointer hover:bg-white"
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 hover:cursor-pointer hover:bg-white"
                >
                    <ChevronRight />
                </Button>
            </div>
        </div>
    )
}
