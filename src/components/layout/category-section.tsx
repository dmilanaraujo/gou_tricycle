import { ArrowUpRightIcon, CalendarDaysIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {ServiceSearch} from "@/components/search/service-search";
import ServiceBrowser from "@/components/service-browser/service-browser";
import SearchResults from "@/components/search/search-result";

export type BlogData = {
    img: string
    date: string
    blogTitle: string
    description: string
    author: string
    badge: string
    authorLink: string
    blogLink: string
    categoryLink: string
}

const CategorySection = ({ blogdata }: { blogdata: BlogData[] }) => {
    return (
        <section className='mx-auto flex h-full max-w-7xl flex-col pb-8 sm:pb-6 gap-4 px-4 sm:px-6 lg:px-8'>
            <div className="flex max-w-4xl flex-col items-center self-center text-center">
                <ServiceBrowser/>
            </div>
        </section>
    )
}

export default CategorySection
