"use client"

import { useState } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Star, X, ChevronDown } from "lucide-react"

type RatingFilterProps = {
    value?: number
    onChange?: (value: number | null) => void
}

export const RatingFilter = ({ value, onChange }: RatingFilterProps) => {
    const [rating, setRating] = useState<number | null>(value ?? null)

    const handleChange = (val: number[]) => {
        const newRating = val[0]
        setRating(newRating)
        onChange?.(newRating)
    }

    const handleReset = () => {
        setRating(null)
        onChange?.(null)
    }

    const label = rating ? `${rating}` : "Valoración"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="secondary"
                    className={`px-3 py-1 rounded-full bg-muted hover:bg-primary hover:text-white hover:cursor-pointer flex items-center gap-1 ${
                        rating ? "bg-primary text-white" : ""
                    }`}
                >
                    <Star className="w-3 h-3 fill-white" />
                    {label}
                    <ChevronDown className={`w-3 h-3 opacity-70 ${ rating ? "text-white" : ""}`} />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="p-3 w-56 space-y-3">
                <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <Slider
                        min={1}
                        max={5}
                        step={0.5}
                        value={[rating ?? 4.5]}
                        onValueChange={handleChange}
                        className="w-full"
                    />

                    <span className="text-xs font-medium min-w-[40px]">
                        {rating ? `${rating}` : "4.5"}

                    </span>
                </div>

                {rating && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleReset}
                        className="w-full flex items-center hover:cursor-pointer gap-2 justify-center text-muted-foreground"
                    >
                        <X className="w-4 h-4" />
                        Limpiar
                    </Button>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
