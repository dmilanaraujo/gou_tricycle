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
import { VehicleTypeEnum } from "@/types"

const VEHICLE_TYPES: { label: string; value: VehicleTypeEnum }[] = [
    { label: "Eléctrico", value: VehicleTypeEnum.electric },
    { label: "Combustión", value: VehicleTypeEnum.combustion },
    { label: "Híbrido", value: VehicleTypeEnum.hybrid },
]

type VehicleTypeFilterProps = {
    value?: VehicleTypeEnum
    onChange?: (value: VehicleTypeEnum | null) => void
}

export const VehicleTypeFilter = ({ value, onChange }: VehicleTypeFilterProps) => {
    const [selected, setSelected] = useState<VehicleTypeEnum | null>(value ?? null)

    const handleSelect = (val: VehicleTypeEnum) => {
        setSelected(val)
        onChange?.(val)
    }

    const handleClear = () => {
        setSelected(null)
        onChange?.(null)
    }

    const selectedLabel =
        VEHICLE_TYPES.find(v => v.value === selected)?.label ?? "Tipo de vehículo"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="secondary"
                    className={`px-3 py-1 rounded-full bg-muted hover:bg-primary hover:text-white flex items-center gap-1 hover:cursor-pointer ${
                        selected ? "bg-primary text-white font-semibold" : ""
                    }`}
                >
                    {selectedLabel}
                    <ChevronDown className="w-3 h-3 opacity-70" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="min-w-[180px]">
                {VEHICLE_TYPES.map(option => (
                    <DropdownMenuItem
                        key={option.value}
                        onClick={() => handleSelect(option.value)}
                        className={`flex items-center justify-between hover:cursor-pointer ${
                            selected === option.value ? "font-semibold" : ""
                        }`}
                    >
                        {option.label}
                        {selected === option.value && (
                            <Check className="w-4 h-4 text-primary" />
                        )}
                    </DropdownMenuItem>
                ))}

                <div className="my-1 h-px bg-muted" />

                <DropdownMenuItem
                    onClick={handleClear}
                    className="flex items-center gap-2 text-muted-foreground hover:cursor-pointer"
                >
                    <X className="w-4 h-4" />
                    Limpiar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
