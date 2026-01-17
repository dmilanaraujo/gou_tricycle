'use client'

import {useEffect, useMemo, useState} from "react"
import { Button } from "@/components/ui/button"
// import {SearchResultCard} from "@/components/search/search-result-card";
import {Location, VehicleType, VehicleTypeEnum} from "@/types";
import {useInfinityBusinesses} from "@/hooks/api/business";
import {DriverList} from "@/components/client/driver-list";
import {BusinessList} from "@/components/client/business-list";
import {ServiceFilters} from "@/components/service-browser/service-filters";

const sampleData = [
    {
        id: 1,
        images: "/pizza.jpg",
        name: "Domino's (4539 Wisconsin Ave NW)",
        rating: 4.2,
        reviews: 470,
        deliveryTime: "19 min",
        deliveryFee: "$2.49 Delivery Fee",
    },
    {
        id: 2,
        images: "/heritage.jpg",
        name: "Heritage India (3238 Wisconsin Ave)",
        rating: 4.6,
        reviews: 1000,
        deliveryTime: "10 min",
    },
    {
        id: 3,
        images: "/duccinis.jpg",
        name: "Duccini's Pizza",
        rating: 4.7,
        reviews: 1000,
        deliveryTime: "50 min",
        deliveryFee: "$2.99 Delivery Fee",
    },
    {
        id: 4,
        images: "/duccinis.jpg",
        name: "Duccini's Pizza",
        rating: 4.7,
        reviews: 1000,
        deliveryTime: "50 min",
        deliveryFee: "$2.99 Delivery Fee",
    },
    {
        id: 5,
        images: "/duccinis.jpg",
        name: "Duccini's Pizza",
        rating: 4.7,
        reviews: 1000,
        deliveryTime: "50 min",
        deliveryFee: "$2.99 Delivery Fee",
    },
]

const LOCATION_STORAGE_KEY = 'localwheels-location';

export default function BusinessSearch({ activeTab }: { activeTab: string | null }) {
    const [results, setResults] = useState(sampleData)

    const [province, setProvince] = useState<string | null>(null)
    const [municipality, setMunicipality] = useState<string | null>(null)
    const [rating, setRating] = useState<number | null>(null)
    const [vehicleType, setVehicleType] = useState<VehicleTypeEnum | null>(null)


    const handleReset = () => {
        setResults(sampleData)
    }

    const [location, setLocation] = useState<Location | null>(null);
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [combustionTypes, setCombustionTypes] = useState<VehicleType[]>(['electric', 'hybrid', 'combustion']);
    const [selectedMunicipalities, setSelectedMunicipalities] = useState<string[]>([]);

    useEffect(() => {
        try {
            const savedLocation = localStorage.getItem(LOCATION_STORAGE_KEY);
            if (savedLocation) {
                const parsedLocation = JSON.parse(savedLocation);
                setLocation(parsedLocation);
                setSelectedMunicipalities([parsedLocation.municipality]);
            } else {
                setIsLocationModalOpen(true);
            }
        } catch (error) {
            console.error("No se pudo acceder a localStorage:", error);
            setIsLocationModalOpen(true);
        }
    }, []);

    const { data, isLoading } = useInfinityBusinesses({
        province: province ?? undefined,
        municipality: municipality ?? undefined,
        rating: rating ?? undefined,
        vehicleType: vehicleType ?? undefined,
        limit: 20,
    }, {
        enabled: !!province
    })


    const businesses = useMemo(() => {
        return data?.pages.flatMap(p => p.data || []) || [];
    }, [data?.pages])

    return (
        <div className="pt-8">
            <div className="flex max-w-4xl flex-col items-start self-center text-left">
                {/*<ServiceFilters activeTab={activeTab}/>*/}
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
                    {businesses.length || 0} resultados encontrados
                </h2>
                <Button variant="secondary" className="rounded-full hover:bg-primary hover:text-white hover:cursor-pointer" onClick={handleReset}>
                        Limpiar
                </Button>
            </div>

            {/* Grid de resultados */}
            <BusinessList businesses={businesses} isLoading={isLoading}/>
        </div>
    )
}
