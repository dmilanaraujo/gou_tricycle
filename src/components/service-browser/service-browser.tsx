"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CategoryGroup } from "@/components/service-browser/category-group"

const tabs = [
    { name: "Transporte", value: "transport" },
    { name: "Tiendas", value: "market" },
    { name: "Belleza", value: "beauty" },
    { name: "Restaurantes", value: "restaurant" },
]

type ServiceBrowserProps = {
    activeTab: string | null
    onTabChange: (value: string) => void
    onCategoryChange: (value: string | null) => void
}

const ServiceBrowser = ({ activeTab, onTabChange, onCategoryChange }: ServiceBrowserProps) => {
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
                    <CategoryGroup
                        section={tab.value as any}
                        onCategoryChange={onCategoryChange}
                    />
                </TabsContent>
            ))}
        </Tabs>
    )
}
export default ServiceBrowser
