import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {CategoryGroup} from "@/components/service-browser/category-group";

const tabs = [
    {
        name: 'Popular',
        value: 'popular',
        content: (
            <CategoryGroup section="market" />
        )
    },
    {
        name: 'Transporte',
        value: 'transport',
        content: (
            <CategoryGroup section="transport" />
        )
    },
    {
        name: 'Tiendas',
        value: 'market',
        content: (
            <CategoryGroup section="market" />
        )
    },
    {
        name: 'Belleza',
        value: 'beauty',
        content: (
            <CategoryGroup section="beauty" />
        )
    },
    {
        name: 'Restaurantes',
        value: 'restaurant',
        content: (
            <CategoryGroup section="restaurant" />
        )
    }
]

const ServiceBrowser = () => {
    return (
        <Tabs defaultValue='popular' className='gap-4'>
            <TabsList className='bg-background gap-1 flex justify-center'>
                {tabs.map(tab => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className='data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground text-muted-foreground hover:text-foreground hover:bg-muted transition-colors hover:cursor-pointer duration-300 dark:data-[state=active]:border-transparent'
                    >
                        {tab.name}
                    </TabsTrigger>
                ))}
            </TabsList>

            {tabs.map(tab => (
                <TabsContent key={tab.value} value={tab.value}>
                    <div className='text-muted-foreground text-sm'>{tab.content}</div>
                </TabsContent>
            ))}
        </Tabs>
    )
}

export default ServiceBrowser
