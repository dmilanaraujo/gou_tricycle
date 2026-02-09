"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CategoryGroup } from "@/components/service-browser/category-group"
import {useGetSections} from '@/hooks/api/section';
import {ScrollArea, ScrollBar} from '@/components/ui/scroll-area';
import {Skeleton} from '@/components/ui/skeleton';

type ServiceBrowserProps = {
    activeTab: string | null
    category: string | null
    onTabChange: (value: string) => void
    onCategoryChange: (value: string | null) => void
}

const ServiceBrowser = ({ activeTab, category, onTabChange, onCategoryChange }: ServiceBrowserProps) => {
    const { data: sections, isLoading: isLoadingSections } = useGetSections();
    
    if(isLoadingSections) {
        return (
            <div className="bg-background gap-1 flex justify-center w-full flex-wrap">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-9 w-24 rounded-md"/>
                ))}
            </div>
        );
    }
    
    return (
        <Tabs value={activeTab ?? ""} onValueChange={onTabChange} className="gap-8 md:gap-4 w-full flex flex-col">
            <TabsList className="bg-background gap-1 flex justify-center w-full flex-wrap">
                {sections?.map(tab => (
                    <TabsTrigger
                        key={tab.slug}
                        value={tab.slug}
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:cursor-pointer"
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

            {sections?.map(tab => (
                <TabsContent key={tab.slug} value={tab.slug} className={'w-full'}>
                    <ScrollArea className="whitespace-nowrap w-full">
                        <CategoryGroup
                            section={tab.slug as any}
                            value={activeTab === tab.slug ? category : null}
                            onCategoryChange={onCategoryChange}
                        />
                        <ScrollBar orientation="horizontal" hidden={true}/>
                    </ScrollArea>
                </TabsContent>
            ))}
        </Tabs>
    )
}
export default ServiceBrowser
