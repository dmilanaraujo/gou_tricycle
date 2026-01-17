"use client"

import { useState } from "react"
import { FilterButton } from "./filter-button"
import { VehicleTypeFilter } from "@/components/service-browser/vehicle-type-filter"
import { RatingFilter } from "@/components/service-browser/rating-filter"
import { LocationFilter } from "@/components/service-browser/locator-filter"
import type { VehicleTypeEnum } from "@/types"

type ServiceFiltersProps = {
    activeTab: string | null
    onLocationChange: (province: string | null, municipality: string | null) => void
    onRatingChange: (rating: number | null) => void
    onVehicleTypeChange: (type: VehicleTypeEnum | null) => void
}

export const ServiceFilters = ({
                                   activeTab,
                                   onLocationChange,
                                   onRatingChange,
                                   onVehicleTypeChange,
                               }: ServiceFiltersProps) => {
    const [rating, setRating] = useState<number | null>(null)

    const handleRatingChange = (val: number | null) => {
        setRating(val)
        onRatingChange(val)
    }

    if (!activeTab) return null

    const FILTERS_BY_TAB: Record<string, React.ReactNode> = {
        transport: (
            <div className="flex flex-wrap gap-2">
                <LocationFilter onChange={onLocationChange} />

                <VehicleTypeFilter
                    onChange={(val) => onVehicleTypeChange((val as VehicleTypeEnum) ?? null)}
                />

                <RatingFilter value={rating ?? undefined} onChange={handleRatingChange} />

                <FilterButton
                    label="En Servicio"
                    onToggle={(active) => console.log("Activo:", active)}
                />
            </div>
        ),

        beauty: (
            <div className="flex flex-wrap gap-2">
                <LocationFilter onChange={onLocationChange} />
                <RatingFilter value={rating ?? undefined} onChange={handleRatingChange} />
                <FilterButton label="Abierto" onToggle={(active) => console.log("Activo:", active)} />
            </div>
        ),

        market: (
            <div className="flex flex-wrap gap-2">
                <LocationFilter onChange={onLocationChange} />
                <RatingFilter value={rating ?? undefined} onChange={handleRatingChange} />
                <FilterButton label="Abierto" onToggle={(active) => console.log("Activo:", active)} />
            </div>
        ),

        restaurant: (
            <div className="flex flex-wrap gap-2">
                <LocationFilter onChange={onLocationChange} />
                <RatingFilter value={rating ?? undefined} onChange={handleRatingChange} />
                <FilterButton label="Abierto" onToggle={(active) => console.log("Activo:", active)} />
            </div>
        ),
    }

    return <div className="flex flex-wrap justify-start gap-2">{FILTERS_BY_TAB[activeTab]}</div>
}
