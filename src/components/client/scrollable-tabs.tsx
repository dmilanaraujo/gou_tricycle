"use client"

import * as React from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect} from 'react';

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

const catProdId = (index: number) => {
    return `cat-prod-${index}`;
}

export function ScrollableTabs({ title, tabs, defaultValue, value, onChange }: Props) {
    const listRef = React.useRef<HTMLDivElement>(null)

    const [canScrollLeft, setCanScrollLeft] = React.useState(false)
    const [canScrollRight, setCanScrollRight] = React.useState(false)
    const [currentActiveTab, setCurrentActiveTab] = React.useState(0)

    const updateScrollState = () => {
        const el = listRef.current
        if (!el) return
        // const maxScrollLeft = el.scrollWidth - el.clientWidth
        setCanScrollLeft(currentActiveTab > 0 )
        setCanScrollRight(currentActiveTab < tabs.length - 1)
    }
    
    const scrollToId = (index: number) => {
        const element = document.getElementById(catProdId(index));
        element?.scrollIntoView({
            block: 'center',
            behavior: "smooth",
            inline: "start"
        });
        // listRef.current?.scrollBy({
        //     left: element?.offsetLeft,
        //     behavior: "smooth",
        // });
    };
    
    useEffect(() => {
        scrollToId(currentActiveTab);
    }, [currentActiveTab]);

    const scroll = (dir: "left" | "right") => {
        if (!listRef.current) return
        if (dir === "left" && currentActiveTab > 0) {
            setCurrentActiveTab(currentActiveTab - 1)
        } else if (dir === "right" && currentActiveTab < tabs.length - 1) {
            setCurrentActiveTab(currentActiveTab + 1)
        }
    }

    React.useEffect(() => {
        updateScrollState()
    }, [tabs, currentActiveTab])

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
                            variant='line'
                            className='group-data-horizontal/tabs:h-10'
                        >
                        {tabs.map((tab, i) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                id={catProdId(i)}
                                className={cn(
                                    "rounded-none",
                                    "cursor-pointer text-md hover:bg-muted",
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
