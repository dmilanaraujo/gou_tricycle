"use client"

import { useState } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown, Check, X } from "lucide-react"
import {municipalities, provinces} from "@/lib/data/locations";

type Option = {
    label: string
    value: string
}

const MUNICIPALITIES: Record<string, Option[]> = {
    la_habana: [
        { label: "La Lisa", value: "la_lisa" },
        { label: "Playa", value: "playa" },
        { label: "Centro Habana", value: "centro_habana" },
    ],
    matanzas: [
        { label: "Varadero", value: "varadero" },
        { label: "Cárdenas", value: "cardenas" },
    ],
}

export const LocationFilter = ({
                                   onChange,
                               }: {
    onChange: (province: string | null, municipality: string | null) => void
}) => {
    const [province, setProvince] = useState<Option | null>(null)
    const [municipality, setMunicipality] = useState<Option | null>(null)

    // const municipalityOptions = province
    //     ? MUNICIPALITIES[province.value] ?? []
    //     : []
    const municipalityOptions = province
        ? municipalities[province.value] ?? []
        : []

    const handleProvinceSelect = (option: Option) => {
        setProvince(option)
        setMunicipality(null)
        onChange(option.value, null)
    }

    const handleMunicipalitySelect = (option: Option) => {
        setMunicipality(option)
        onChange(province?.value ?? null, option.value)
    }

    const clearProvince = () => {
        setProvince(null)
        setMunicipality(null)
        onChange(null, null)
    }

    const clearMunicipality = () => {
        setMunicipality(null)
        onChange(province?.value ?? null, null)
    }

    return (
        <div className="flex gap-2">

            {/* Provincia */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="secondary"
                        className={`px-3 py-1 rounded-full bg-muted hover:bg-primary hover:text-white flex items-center gap-1 hover:cursor-pointer ${
                            province ? "bg-primary text-white" : ""
                        }`}
                    >
                        {province?.label ?? "Provincia"}
                        <ChevronDown className="w-3 h-3" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    {provinces.map(option => (
                        <DropdownMenuItem
                            key={option.value}
                            onClick={() => handleProvinceSelect(option)}
                            className={`flex items-center justify-between hover:cursor-pointer ${
                                province?.value === option.value ? "font-semibold" : ""
                            }`}
                        >
                            {option.label}
                            {province?.value === option.value && <Check className="w-4 h-4" />}
                        </DropdownMenuItem>
                    ))}

                    <div className="my-1 h-px bg-muted" />

                    <DropdownMenuItem
                        onClick={clearProvince}
                        className="text-muted-foreground flex items-center gap-2 hover:cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                        Limpiar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Municipio */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="secondary"
                        disabled={!province}
                        className={`px-3 py-1 rounded-full bg-muted hover:bg-primary hover:text-white flex items-center gap-1 hover:cursor-pointer ${
                            municipality ? "bg-primary text-white" : ""
                        }`}
                    >
                        {municipality?.label ?? "Municipio"}
                        <ChevronDown className="w-3 h-3" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    {municipalityOptions.map(option => (
                        <DropdownMenuItem
                            key={option.value}
                            onClick={() => handleMunicipalitySelect(option)}
                            className={`flex items-center justify-between hover:cursor-pointer ${
                                municipality?.value === option.value ? "font-semibold" : ""
                            }`}
                        >
                            {option.label}
                            {municipality?.value === option.value && (
                                <Check className="w-4 h-4" />
                            )}
                        </DropdownMenuItem>
                    ))}

                    <div className="my-1 h-px bg-muted" />

                    <DropdownMenuItem
                        onClick={clearMunicipality}
                        className="text-muted-foreground flex items-center gap-2 hover:cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                        Limpiar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}
