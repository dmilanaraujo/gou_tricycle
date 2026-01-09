'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {SearchResultCard} from "@/components/search/search-result-card";

const sampleData = [
    {
        id: 1,
        imageUrl: "/pizza.jpg",
        name: "Domino's (4539 Wisconsin Ave NW)",
        rating: 4.2,
        reviews: 470,
        deliveryTime: "19 min",
        deliveryFee: "$2.49 Delivery Fee",
    },
    {
        id: 2,
        imageUrl: "/heritage.jpg",
        name: "Heritage India (3238 Wisconsin Ave)",
        rating: 4.6,
        reviews: 1000,
        deliveryTime: "10 min",
    },
    {
        id: 3,
        imageUrl: "/duccinis.jpg",
        name: "Duccini's Pizza",
        rating: 4.7,
        reviews: 1000,
        deliveryTime: "50 min",
        deliveryFee: "$2.99 Delivery Fee",
    },
    {
        id: 4,
        imageUrl: "/duccinis.jpg",
        name: "Duccini's Pizza",
        rating: 4.7,
        reviews: 1000,
        deliveryTime: "50 min",
        deliveryFee: "$2.99 Delivery Fee",
    },
    {
        id: 5,
        imageUrl: "/duccinis.jpg",
        name: "Duccini's Pizza",
        rating: 4.7,
        reviews: 1000,
        deliveryTime: "50 min",
        deliveryFee: "$2.99 Delivery Fee",
    },
]

export default function SearchResults() {
    const [results, setResults] = useState(sampleData)

    const handleReset = () => {
        setResults(sampleData)
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-0">
                <h2 className="font-normal text-foreground">
                    {results.length} resultados
                </h2>
                <Button variant="secondary" size="sm" onClick={handleReset}>
                    Reset
                </Button>
            </div>

            {/* Grid de resultados */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {results.map((item) => (
                    <SearchResultCard key={item.id} {...item} />
                ))}
            </div>
        </div>
    )
}
