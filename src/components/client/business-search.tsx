"use client"

import { useEffect, useMemo, useState } from "react"
import { Location, VehicleTypeEnum } from "@/types"
import { useInfinityBusinesses } from "@/hooks/api/business"
import { BusinessList } from "@/components/client/business-list"
import { ServiceFilters } from "@/components/service-browser/service-filters"
import { Business } from "@/types/business"
import { getBusinessById } from "@/lib/actions/business"

const LOCATION_STORAGE_KEY = "localwheels-location"

export default function BusinessSearch({
                                           activeTab,
                                           category,
                                           searchQuery,
                                           selectedBusinessId,
                                       }: {
    activeTab: string | null
    category: string | null
    searchQuery: string | null
    selectedBusinessId: string | null
}) {
    const [province, setProvince] = useState<string | null>(null)
    const [municipality, setMunicipality] = useState<string | null>(null)
    const [rating, setRating] = useState<number | null>(null)
    const [vehicleType, setVehicleType] = useState<VehicleTypeEnum | null>(null)

    const [singleBusiness, setSingleBusiness] = useState<Business | null>(null)
    const [singleBusinessLoading, setSingleBusinessLoading] = useState(false)

    useEffect(() => {
        try {
            const savedLocation = localStorage.getItem(LOCATION_STORAGE_KEY)
            if (savedLocation) {
                JSON.parse(savedLocation)
            }
        } catch {}
    }, [])

    // 🔹 Cargar negocio por ID (sugerencia)
    useEffect(() => {
        if (!selectedBusinessId) {
            setSingleBusiness(null)
            return
        }

        const load = async () => {
            setSingleBusinessLoading(true)
            try {
                const res = await getBusinessById(selectedBusinessId)
                if (res?.success) {
                    setSingleBusiness(res.data)
                }
            } finally {
                setSingleBusinessLoading(false)
            }
        }

        load()
    }, [selectedBusinessId])

    useEffect(() => {
        if (!selectedBusinessId) return

        // 🔥 Resetear TODOS los filtros
        setProvince(null)
        setMunicipality(null)
        setRating(null)
        setVehicleType(null)
    }, [selectedBusinessId])

    useEffect(() => {
        if (searchQuery && !selectedBusinessId) {
            setProvince(null)
            setMunicipality(null)
            setRating(null)
            setVehicleType(null)
        }
    }, [searchQuery, selectedBusinessId])


    // 🔹 Parámetros para búsqueda normal
    const params = useMemo(
        () => ({
            province: province ?? undefined,
            municipality: municipality ?? undefined,
            rating: rating ?? undefined,
            vehicleType: vehicleType ?? undefined,
            section: activeTab ?? undefined,
            category: category ?? undefined,
            q: searchQuery ?? undefined,
            limit: 20,
        }),
        [province, municipality, rating, vehicleType, activeTab, category, searchQuery]
    )

    const { data, isLoading } = useInfinityBusinesses(params, {
        enabled: !selectedBusinessId && (!!activeTab || !!category || !!searchQuery),
    })
// console.log(data)
    const businesses = useMemo(() => {
        if (singleBusiness) return [singleBusiness]
        return data?.pages.flatMap(p => p.data || []) || []
    }, [data, singleBusiness])

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

            {/* ⬇️ IMPORTANTE */}
            <BusinessList
                businesses={businesses}
                isLoading={isLoading || singleBusinessLoading}
            />
        </div>
    )
}
