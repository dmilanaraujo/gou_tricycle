"use client"

import * as React from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type TabItem = {
    value: string
    label: string
}

type Props = {
    title?: string
    tabs: TabItem[]
    defaultValue: string
    value?: string
    onChange?: (value: string) => void
}

export function ScrollableTabs({ title, tabs, defaultValue, value, onChange }: Props) {
    const listRef = React.useRef<HTMLDivElement>(null)

    const [canScrollLeft, setCanScrollLeft] = React.useState(false)
    const [canScrollRight, setCanScrollRight] = React.useState(false)

    const updateScrollState = () => {
        const el = listRef.current
        if (!el) return

        const maxScrollLeft = el.scrollWidth - el.clientWidth

        setCanScrollLeft(el.scrollLeft > 0)
        setCanScrollRight(el.scrollLeft < maxScrollLeft - 1) // margen de error
    }

    const scroll = (dir: "left" | "right") => {
        if (!listRef.current) return

        listRef.current.scrollBy({
            left: dir === "left" ? -200 : 200,
            behavior: "smooth",
        })

        // Recalcular estado tras la animación
        setTimeout(updateScrollState, 350)
    }

    React.useEffect(() => {
        updateScrollState()
    }, [tabs])

    React.useEffect(() => {
        const el = listRef.current
        if (!el) return

        const observer = new ResizeObserver(updateScrollState)
        observer.observe(el)

        return () => observer.disconnect()
    }, [])


    return (
        <div className="w-full space-y-3">
            {title && <h3 className="text-xl font-semibold">{title}</h3>}

            <Tabs value={value} defaultValue={defaultValue} onValueChange={onChange} className="w-full">
                <div className="flex items-center gap-2 w-full overflow-hidden">

                    {/* Zona scrollable */}
                    <div className="flex-1 overflow-hidden">
                        <TabsList
                            ref={listRef}
                            onScroll={updateScrollState}
                            className={cn(
                                "relative flex gap-0 pl-0 pr-0 rounded-none justify-start",
                                "bg-transparent whitespace-nowrap",

                                // 👇 IMPORTANT: override estilos default de shadcn
                                "!h-auto !p-0 items-end",

                                // 👇 no recortes la línea
                                "overflow-x-hidden overflow-y-visible",

                                // 👇 reserva espacio para la línea (mismo grosor)
                                "pb-[5px]",

                                // 👇 línea base muted
                                "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[5px] after:bg-muted after:z-0"
                            )}
                        >
                        {tabs.map((tab, i) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className={cn(
                                    "relative rounded-none px-4 pt-2 pb-4",
                                    "!h-auto", // 👈 override h-9 de shadcn

                                    "cursor-pointer text-md hover:bg-muted",
                                    "data-[state=active]:shadow-none",

                                    // underline activo
                                    "after:absolute after:bottom-0 after:left-0 after:h-[5px]",
                                    "after:bg-primary after:w-0",
                                    "after:transition-[width] after:duration-300 after:ease-out",
                                    "data-[state=active]:after:w-full",
                                    "after:z-10"
                                )}
                            >
                                {tab.label}
                            </TabsTrigger>
                        ))}
                        </TabsList>
                    </div>

                    {/* Botones */}
                    <div className="flex gap-1 shrink-0">
                        <Button
                            size="icon"
                            variant="outline"
                            onClick={() => scroll("left")}
                            disabled={!canScrollLeft}
                            className="
                                rounded-full
                                hover:cursor-pointer
                                disabled:cursor-not-allowed
                                disabled:opacity-40
                                disabled:grayscale
                              "
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </Button>

                        <Button
                            size="icon"
                            variant="outline"
                            onClick={() => scroll("right")}
                            disabled={!canScrollRight}
                            className="
                                rounded-full
                                hover:cursor-pointer
                                disabled:cursor-not-allowed
                                disabled:opacity-40
                                disabled:grayscale
                              "
                        >
                            <ArrowRight className="w-4 h-4" />
                        </Button>

                    </div>

                </div>
            </Tabs>
        </div>
    )
}
