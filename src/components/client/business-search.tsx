"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Location, VehicleType, VehicleTypeEnum } from "@/types"
import { useInfinityBusinesses } from "@/hooks/api/business"
import { BusinessList } from "@/components/client/business-list"
import { ServiceFilters } from "@/components/service-browser/service-filters"

const LOCATION_STORAGE_KEY = 'localwheels-location';

export default function BusinessSearch({
                                           activeTab,
                                           category,
                                           searchQuery,
                                       }: {
    activeTab: string | null
    category: string | null
    searchQuery: string | null
}) {
    const [province, setProvince] = useState<string | null>(null)
    const [municipality, setMunicipality] = useState<string | null>(null)
    const [rating, setRating] = useState<number | null>(null)
    const [vehicleType, setVehicleType] = useState<VehicleTypeEnum | null>(null)

    const [location, setLocation] = useState<Location | null>(null)

    useEffect(() => {
        try {
            const savedLocation = localStorage.getItem(LOCATION_STORAGE_KEY)
            if (savedLocation) {
                setLocation(JSON.parse(savedLocation))
            }
        } catch {}
    }, [])

    const params = useMemo(() => ({
        province: province ?? undefined,
        municipality: municipality ?? undefined,
        rating: rating ?? undefined,
        vehicleType: vehicleType ?? undefined,
        section: activeTab ?? undefined,
        category: category ?? undefined,
        q: searchQuery ?? undefined,
        limit: 20,
    }), [
        province,
        municipality,
        rating,
        vehicleType,
        activeTab,
        category,
        searchQuery,
    ])

    const { data, isLoading } = useInfinityBusinesses(params, {
        enabled: !!(activeTab || category || searchQuery),
    })

    const businesses = useMemo(() => {
        return data?.pages.flatMap(p => p.data || []) || []
    }, [data?.pages])

    return (
        <div className="pt-8">
            <div className="flex max-w-4xl flex-col items-start self-center text-left">
                <ServiceFilters
                    activeTab={activeTab}
                    onLocationChange={(p, m) => {
                        setProvince(p)
                        setMunicipality(m)
                    }}
                    onRatingChange={setRating}
                    onVehicleTypeChange={setVehicleType}
                />
            </div>

            <div className="flex items-center justify-between py-2 px-4 sm:px-0">
                <h2 className="font-normal text-foreground">
                    {businesses.length} resultados encontrados
                </h2>
            </div>

            <BusinessList businesses={businesses} isLoading={isLoading} />
        </div>
    )
}
