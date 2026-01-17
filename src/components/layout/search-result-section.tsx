"use client";

import BusinessSearch from "@/components/client/business-search";

const SearchResultSection = ({ activeTab }: { activeTab: string | null }) => {
    return (
        <section className="w-full max-w-screen-xl mx-auto px-4 pb-8">
            <BusinessSearch activeTab={activeTab} />
        </section>
    )
}

export default SearchResultSection
