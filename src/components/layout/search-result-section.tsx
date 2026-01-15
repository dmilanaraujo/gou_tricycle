"use client";

// import SearchResults from "@/components/search/search-result";

import BusinessSearch from "@/components/client/business-search";

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

const SearchResultSection = ({ blogdata }: { blogdata: BlogData[] }) => {
    return (
        <section className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 pb-8 sm:pb-6">
            {/*<SearchResults/>*/}
            <BusinessSearch />
        </section>

    )
}

export default SearchResultSection
