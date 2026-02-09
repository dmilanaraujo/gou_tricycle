"use client";

import HeroSection from "@/components/layout/hero-section";
import CategorySection from "@/components/layout/category-section";
import SearchResultSection from "@/components/layout/search-result-section";
import {useState} from "react";

export default function Home() {
    const [activeTab, setActiveTab] = useState<string | null>(null)
    const [category, setCategory] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState<string | null>(null)
    const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null)


    return (
      <main className="flex min-h-screen flex-col items-center">
          <HeroSection
              onSearch={(value, id) => {
                  setSearchQuery(value)
                  setSelectedBusinessId(id ?? null)

                  // Limpia TODOS los filtros cuando se busca por texto
                  if (!id) {
                      setActiveTab(null)
                      setCategory(null)
                  }

                  // Limpia filtros cuando se selecciona sugerencia
                  if (id) {
                      setActiveTab(null)
                      setCategory(null)
                  }
              }}
          />
          <CategorySection
              activeTab={activeTab}
              category={category}
              onTabChange={(tab) => {
                  setActiveTab(tab)
                  setCategory(null) // reset categoría al cambiar sección
                  setSelectedBusinessId(null)
              }}
              onCategoryChange={(cat) => {
                  setCategory(cat)
                  setSelectedBusinessId(null)
              }}
          />
          <SearchResultSection
              activeTab={activeTab}
              category={category}
              searchQuery={searchQuery}
              selectedBusinessId={selectedBusinessId}
          />
      </main>
  );
}
