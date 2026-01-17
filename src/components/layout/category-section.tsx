"use client"

// import { ArrowUpRightIcon, CalendarDaysIcon } from 'lucide-react'

// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import { Card, CardContent } from '@/components/ui/card'
// import {ServiceSearch} from "@/components/search/service-search";
import ServiceBrowser from "@/components/service-browser/service-browser";
// import SearchResults from "@/components/search/search-result";
import {useState} from "react";
// import {ServiceFilters} from "@/components/service-browser/service-filters";

// export type BlogData = {
//     img: string
//     date: string
//     blogTitle: string
//     description: string
//     author: string
//     badge: string
//     authorLink: string
//     blogLink: string
//     categoryLink: string
// }

type CategorySectionProps = {
    activeTab: string | null
    onTabChange: (tab: string) => void
}

const CategorySection = ({ activeTab, onTabChange }: CategorySectionProps) => {
    // const [activeTab, setActiveTab] = useState<string | null>(null)

    return (
        // <section className='mx-auto flex h-full max-w-7xl flex-col pb-8 sm:pb-6 gap-4 px-4 sm:px-6 lg:px-8'>
        //     <div className="flex max-w-4xl flex-col items-center self-center text-center">
        //         <ServiceBrowser activeTab={activeTab} onTabChange={setActiveTab}/>
        //     </div>
        // </section>
        <section className="mx-auto flex h-full max-w-7xl flex-col gap-4 px-4">
            <div className="flex max-w-4xl flex-col items-center self-center text-center">
                <ServiceBrowser
                    activeTab={activeTab}
                    onTabChange={onTabChange}
                />
            </div>
        </section>
    )
}

export default CategorySection
