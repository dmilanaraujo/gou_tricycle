import {getBusinessBySlugCachedData} from '@/lib/actions/business'
import { notFound } from "next/navigation"
import NavBar from "@/components/layout/nav-bar";
import FooterSection from "@/components/layout/footer-section";
import {BusinessProvider} from '@/providers/business-provider';

export default async function BusinessLayout({
                                                 children,
                                                 params,
                                             }: {
    children: React.ReactNode
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const business = await getBusinessBySlugCachedData(slug)

    if (!business) {
        notFound()
    }

    return (
        <BusinessProvider business={business}>
            <div data-business-id={business.id}>
                <NavBar/>
                <main className="bg-background pt-2 pb-2 w-full max-w-screen-xl mx-auto px-10">
                    
                        {children}
                  
                </main>
                <FooterSection/>
            </div>
        </BusinessProvider>
)
}
