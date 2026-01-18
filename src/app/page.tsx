"use client";

import NavBar from "@/components/layout/nav-bar";
import HeroSection from "@/components/layout/hero-section";
import CategorySection from "@/components/layout/category-section";
import SearchResultSection from "@/components/layout/search-result-section";
import {useState} from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [category, setCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string | null>(null)


    return (
      <main className="flex min-h-screen flex-col items-center">
          <NavBar/>
          <HeroSection onSearch={setSearchQuery} />
          <CategorySection
              activeTab={activeTab}
              onTabChange={(tab) => {
                  setActiveTab(tab)
                  setCategory(null) // reset categoría al cambiar sección
              }}
              onCategoryChange={setCategory}
          />
          <SearchResultSection
              activeTab={activeTab}
              category={category}
              searchQuery={searchQuery}
          />
      </main>
  );
}
