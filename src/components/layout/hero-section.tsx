import { ArrowUpRightIcon, CalendarDaysIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import {ServiceSearch} from "@/components/search/service-search";

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

const HeroSection = ({ blogdata }: { blogdata: BlogData[] }) => {
    return (
        <section className='pt-16 pb-12 sm:pb-16 lg:pb-24'>
            <div className='mx-auto flex h-full max-w-7xl flex-col gap-16 px-4 sm:px-6 lg:px-8'>
                {/* Hero Header */}
                <div className='flex max-w-4xl flex-col items-center gap-4 self-center text-center'>
                    <h1 className='text-3xl leading-[1.29167] font-semibold text-balance sm:text-4xl lg:text-5xl'>
                        ¿Qué necesitas hoy?
                    </h1>
                    <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
                        Le hacemos mas simple la vida y lo conectamos con proveedores de servicios y productos en Cuba.
                    </p>
                    <div className='z-10 w-full flex items-center'>
                        <ServiceSearch />
                    </div>
                </div>

                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    {blogdata.map((item, index) => (
                        <Card key={`${item.author}-${index}`} className='group py-0 shadow-none'>
                            <CardContent className='grid grid-cols-1 px-0 xl:grid-cols-2'>
                                <div className='p-6'>
                                    <div className='h-59.5 w-full overflow-hidden rounded-lg'>
                                        <img
                                            src={item.img}
                                            alt={item.author}
                                            className='w-full object-cover transition-transform duration-300 group-hover:scale-105'
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center gap-3 p-6'>
                                    <div className='flex items-center gap-1.5 py-1'>
                                        <div className='text-muted-foreground flex grow items-center gap-1.5'>
                                            <CalendarDaysIcon className='size-6' />
                                            <p>{item.date}</p>
                                        </div>
                                        <a href={item.categoryLink}>
                                            <Badge className='bg-primary/10 text-primary border-0 text-sm'>{item.badge}</Badge>
                                        </a>
                                    </div>
                                    <a href={item.blogLink}>
                                        <h3 className='text-xl font-medium'>{item.blogTitle}</h3>
                                    </a>

                                    <p className='text-muted-foreground'>{item.blogTitle}</p>
                                    <div className='flex w-full items-center justify-between gap-1 py-1'>
                                        <a href={item.authorLink} className='text-sm font-medium'>
                                            {item.author}
                                        </a>
                                        <Button
                                            size='icon'
                                            variant='outline'
                                            className='group-hover:bg-primary! hover:bg-primary! hover:text-primary-foreground group-hover:text-primary-foreground group-hover:border-transparent hover:border-transparent'
                                            asChild
                                        >
                                            <a href={item.blogLink}>
                                                <ArrowUpRightIcon />
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HeroSection
