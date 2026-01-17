"use client";

import BusinessSearch from "@/components/client/business-search";

const SearchResultSection = ({
                                 activeTab,
                                 category,
                             }: {
    activeTab: string | null
    category: string | null
}) => {
    return (
        <section className="w-full max-w-screen-xl mx-auto px-4 pb-8">
            <BusinessSearch activeTab={activeTab} category={category} />
        </section>
    )
}

export default SearchResultSection
