'use client'

import {useEffect, useMemo, useState} from "react"
import { Button } from "@/components/ui/button"
// import {SearchResultCard} from "@/components/search/search-result-card";
import {Location, VehicleType, VehicleTypeEnum} from "@/types";
import {useInfinityBusinesses} from "@/hooks/api/business";
import {DriverList} from "@/components/client/driver-list";
import {BusinessList} from "@/components/client/business-list";

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

export default function BusinessSearch() {
    const [results, setResults] = useState(sampleData)

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

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch
    } = useInfinityBusinesses({
        province: location?.province!,
        referenceMunicipality: location?.municipality!,
        filterMunicipalities: selectedMunicipalities,
        vehicleTypes: combustionTypes.map(v => v as VehicleTypeEnum),
        limit: 20
    }, {
        enabled: !!location?.province && !!location?.municipality && combustionTypes.length > 0 && selectedMunicipalities.length > 0
    })
    const businesses = useMemo(() => {
        return data?.pages.flatMap(p => p.data || []) || [];
    }, [data?.pages])

    return (
        <div className="space-y-0">
            <div className="flex items-center justify-between px-4 sm:px-0">
                <h2 className="font-normal text-foreground">
                    {businesses.length || 0} resultados encontrados
                </h2>
                <Button variant="secondary" size="sm" onClick={handleReset}>
                    Reset
                </Button>
            </div>

            {/* Grid de resultados */}
            <BusinessList businesses={businesses} isLoading={isLoading}/>
        </div>
    )
}
