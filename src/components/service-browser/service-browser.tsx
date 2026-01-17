"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CategoryGroup } from "@/components/service-browser/category-group"
import {ServiceFilters} from "@/components/service-browser/service-filters";

const tabs = [
    { name: "Transporte", value: "transport", content: <CategoryGroup section="transport" /> },
    { name: "Tiendas", value: "market", content: <CategoryGroup section="market" /> },
    { name: "Belleza", value: "beauty", content: <CategoryGroup section="beauty" /> },
    { name: "Restaurantes", value: "restaurant", content: <CategoryGroup section="restaurant" /> },
]

// const FilterButton = ({ label }: { label: string }) => (
//     <button className="px-3 py-1 text-xs rounded-full border bg-muted hover:bg-primary hover:text-white transition">
//         {label}
//     </button>
// )

// const FILTERS_BY_TAB: Record<string, React.ReactNode> = {
//     transport: (
//         <div className="flex flex-wrap gap-2">
//             <FilterButton label="Eléctrico" />
//             <FilterButton label="Combustión" />
//             <FilterButton label="Híbrido" />
//             <FilterButton label="5★+" />
//             <FilterButton label="Provincia" />
//             <FilterButton label="Municipio" />
//         </div>
//     ),
//
//     beauty: (
//         <div className="flex flex-wrap gap-2">
//             <FilterButton label="Peluquería" />
//             <FilterButton label="Barbería" />
//             <FilterButton label="Uñas" />
//             <FilterButton label="5★+" />
//             <FilterButton label="Provincia" />
//         </div>
//     ),
//
//     market: (
//         <div className="flex flex-wrap gap-2">
//             <FilterButton label="Alimentos" />
//             <FilterButton label="Bebidas" />
//             <FilterButton label="Ofertas" />
//             <FilterButton label="Provincia" />
//         </div>
//     ),
// }


// const ServiceBrowser = () => {
//     const [activeTab, setActiveTab] = useState<string | null>(null)
//
//     return (
//         <Tabs value={activeTab ?? undefined} onValueChange={setActiveTab} className="gap-4">
//             <TabsList className="bg-background gap-1 flex justify-center">
//                 {tabs.map(tab => (
//                     <TabsTrigger
//                         key={tab.value}
//                         value={tab.value}
//                         className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
//                     >
//                         {tab.name}
//                     </TabsTrigger>
//                 ))}
//             </TabsList>
//
//             {/* Filtros dinámicos */}
//             <ServiceFilters activeTab={activeTab} />
//
//             {/* Contenido vacío cuando no hay tab */}
//             {!activeTab && (
//                 <div className="text-muted-foreground text-sm text-center mt-2 mb-3">
//                     Selecciona una categoría para ver los servicios
//                 </div>
//             )}
//
//             {tabs.map(tab => (
//                 <TabsContent key={tab.value} value={tab.value}>
//                     {tab.content}
//                 </TabsContent>
//             ))}
//         </Tabs>
//     )
// }
//
// export default ServiceBrowser

type ServiceBrowserProps = {
    activeTab: string | null
    onTabChange: (value: string) => void
}

const ServiceBrowser = ({ activeTab, onTabChange }: ServiceBrowserProps) => {
    return (
        <Tabs value={activeTab ?? undefined} onValueChange={onTabChange} className="gap-4">
            <TabsList className="bg-background gap-1 flex justify-center">
                {tabs.map(tab => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                        {tab.name}
                    </TabsTrigger>
                ))}
            </TabsList>

            {!activeTab && (
                <div className="text-muted-foreground text-sm text-center mt-2 mb-3">
                    Selecciona una categoría para ver los servicios
                </div>
            )}

            {tabs.map(tab => (
                <TabsContent key={tab.value} value={tab.value}>
                    {tab.content}
                </TabsContent>
            ))}
        </Tabs>
    )
}
export default ServiceBrowser
