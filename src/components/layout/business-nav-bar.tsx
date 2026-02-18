'use client'

import Image from "next/image"
import {useMemo, useState} from "react"
import { Button } from "@/components/ui/button"
import { Business } from "@/types"
import { getPublicImageUrl } from "@/lib/utils"
import { Menu, Share2, Info } from "lucide-react"
import { ArrowLeft } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import {WhatsAppFlatIcon, WhatsAppIcon} from "@/components/common/whatsapp-icon";
import {DAYS} from "@/components/common/days";

interface BusinessNavBarProps {
    business: Business
}

export default function BusinessNavBar({ business }: BusinessNavBarProps) {
    const [infoOpen, setInfoOpen] = useState(false)

    const sortedHours = useMemo(() => {
        if (!business.hours?.length) return [];

        const order = [1,2,3,4,5,6,0];

        return [...business.hours].sort(
            (a, b) =>
                order.indexOf(a.day_of_week ?? 0) -
                order.indexOf(b.day_of_week ?? 0)
        );
    }, [business.hours]);

    const isOpenNow = useMemo(() => {
        if (!business.hours) return false;

        const now = new Date();
        const currentDay = now.getDay();
        const currentTime = now.toTimeString().slice(0, 8);

        const today = business.hours.find(h => h.day_of_week === currentDay);

        if (!today || today.is_closed) return false;

        return (
            currentTime >= (today.open_time ?? "00:00:00") &&
            currentTime <= (today.close_time ?? "00:00:00")
        );
    }, [business.hours]);

    return (
        <>
            <header className="w-full bg-card/80 backdrop-blur-sm sticky top-0 z-10 border-b">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between w-full gap-3">

                        {/* Izquierda */}
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="relative h-10 w-10 sm:h-12 sm:w-12 shrink-0">
                                <Image
                                    src={getPublicImageUrl(
                                        process.env.NEXT_PUBLIC_SUPABASE_BUSINESS_BUCKET || "",
                                        business.logo
                                    )}
                                    alt={business.name}
                                    fill
                                    className="rounded-full border border-muted object-cover bg-white"
                                />
                            </div>

                            <h2 className="text-lg sm:text-2xl font-semibold truncate">
                                {business.name}
                            </h2>
                        </div>

                        {/* Desktop botones */}
                        <div className="hidden sm:flex items-center gap-2">
                            <Button
                                asChild
                                className="bg-[#25D366] hover:bg-[#1DA851] text-white border-none"
                            >
                                <a
                                    href={`https://wa.me/${business.phone}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                >
                                    <WhatsAppIcon className="w-4 h-4 text-white" />
                                    WhatsApp
                                </a>
                            </Button>

                            <Button variant="outline">
                                <Share2 className="w-4 h-4 mr-2" />
                                Compartir
                            </Button>
                        </div>

                        {/* Mobile dropdown */}
                        <div className="sm:hidden">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <Menu className="w-5 h-5" />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuItem
                                        onClick={() => setInfoOpen(true)}
                                        className="cursor-pointer text-base py-2"
                                    >
                                        <Info className="w-8 h-8" />
                                        Info. del Comercio
                                    </DropdownMenuItem>

                                    <DropdownMenuItem asChild>
                                        <a
                                            href={`https://wa.me/${business.phone}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-base py-2"
                                        >
                                            <WhatsAppFlatIcon />
                                            WhatsApp
                                        </a>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem className="text-base py-2">
                                        <Share2 className="w-8 h-8" />
                                        Compartir
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                    </div>
                </div>
            </header>

            {/* Sheet controlado */}
            <Sheet open={infoOpen} onOpenChange={setInfoOpen}>
                <SheetContent
                    side="right"
                    className="
                      w-full
                      sm:max-w-md
                      p-0
                      [&>button]:hidden
                    "
                >
                    {/* Título accesible oculto */}
                    <VisuallyHidden>
                        <SheetTitle/>
                    </VisuallyHidden>

                    {/* Header con botón atrás */}
                    <div className="flex items-center px-4 py-4">
                        <Button
                            variant="ghost"
                            onClick={() => setInfoOpen(false)}
                            className="h-12 w-12 rounded-full hover:bg-muted"
                        >
                            <ArrowLeft className="!w-8 !h-8"/>
                        </Button>
                    </div>

                    {/* Perfil centrado */}
                    <div className="flex flex-col items-center text-center px-6 pb-2">

                        {/* Avatar */}
                        <div className="relative h-28 w-28 mb-4">
                            <Image
                                src={getPublicImageUrl(
                                    process.env.NEXT_PUBLIC_SUPABASE_BUSINESS_BUCKET || "",
                                    business.logo
                                )}
                                alt={business.name}
                                fill
                                className="rounded-full object-cover border bg-white"
                            />
                        </div>

                        {/* Nombre */}
                        <h2 className="text-xl font-semibold">
                            {business.name}
                        </h2>

                        {/* Teléfono */}
                        <p className="text-muted-foreground mt-1">
                            {business.description}
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="border-t"/>

                    {/* Información adicional */}
                    <div className="px-6 space-y-5">
                        <div>
                            <p className="text-muted-foreground">Nos encontramos en:</p>
                            <p className="font-medium">{business.address}</p>
                        </div>

                        <div>
                            <p className="text-muted-foreground mb-2">Horarios</p>
                            <span className={isOpenNow ? "text-green-600" : "text-red-600"}>
                              {isOpenNow ? "Abierto ahora" : "Cerrado ahora"}
                            </span>

                            <div className="space-y-1 text-sm">
                                {sortedHours.map((h) => (
                                    <div
                                        key={h.id}
                                        className="flex justify-between items-center border-b border-muted pb-1"
                                    >
                                          <span className="font-medium">
                                            {typeof h.day_of_week === "number"
                                                ? DAYS[h.day_of_week]
                                                : "Sin definir"}
                                          </span>

                                        {h.is_closed ? (
                                            <span className="text-red-500 font-semibold">
                                              Cerrado
                                            </span>
                                        ) : (
                                            <span className="text-muted-foreground">
                                              {h.open_time?.slice(0, 5)} - {h.close_time?.slice(0, 5)}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}
