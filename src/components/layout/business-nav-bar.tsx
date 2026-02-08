import {Logo} from "@/components/client/brand";
import {UserButton} from "@/components/auth/user-button";
import {Business} from "@/types";
import Image from "next/image";
import {getPublicImageUrl} from "@/lib/utils";
import * as React from "react";

interface BusinessNavBarProps {
    business: Business
}

export default function BusinessNavBar({ business }: BusinessNavBarProps) {
    return (
        <header className="w-full bg-card/80 backdrop-blur-sm sticky top-0 z-10 border-b">
            <div className="container mx-auto px-4 py-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    {/* Izquierda: avatar + nombre (opcional) */}
                    <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 sm:h-12 sm:w-12">
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

                        {/* Opcional: nombre del negocio */}
                        <span className="text-sm sm:text-base font-semibold truncate max-w-[140px]">
                          {business.name}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}
