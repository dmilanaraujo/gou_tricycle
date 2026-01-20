"use client"

import ServiceBrowser from "@/components/service-browser/service-browser";

type CategorySectionProps = {
    activeTab: string | null
    category: string | null
    onTabChange: (tab: string) => void
    onCategoryChange: (category: string | null) => void
}

const CategorySection = ({ activeTab, category, onTabChange, onCategoryChange }: CategorySectionProps) => {
    return (
        <section className="mx-auto flex h-full max-w-7xl flex-col gap-4 px-4 w-full">
            <div className="flex max-w-4xl flex-col items-center self-center text-center w-full">
                <ServiceBrowser
                    activeTab={activeTab}
                    category={category}
                    onTabChange={onTabChange}
                    onCategoryChange={onCategoryChange}
                />
            </div>
        </section>
    )
}

export default CategorySection
