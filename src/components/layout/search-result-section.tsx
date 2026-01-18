"use client";

import BusinessSearch from "@/components/client/business-search";

const SearchResultSection = ({
                                 activeTab,
                                 category,
                                 searchQuery,
                             }: {
    activeTab: string | null
    category: string | null
    searchQuery: string | null
}) => {
    return (
        <section className="w-full max-w-screen-xl mx-auto px-4 pb-8">
            <BusinessSearch activeTab={activeTab} category={category} searchQuery={searchQuery}/>
        </section>
    )
}

export default SearchResultSection
