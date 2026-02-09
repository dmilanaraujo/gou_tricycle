import { getBusinessById } from "@/lib/actions/business"
import { notFound } from "next/navigation"
import NavBar from "@/components/layout/nav-bar";
import FooterSection from "@/components/layout/footer-section";
import BusinessNavBar from "@/components/layout/business-nav-bar";

export default async function BusinessLayout({
                                                 children,
                                                 params,
                                             }: {
    children: React.ReactNode
    params: Promise<{ businessId: string }>
}) {
    const { businessId } = await params
    const res = await getBusinessById(businessId)

    if (!res?.success || !res.data) {
        notFound()
    }

    return (
        <div data-business-id={res.data.id}>
            <BusinessNavBar business={res.data} />
            <main className="bg-background pt-2 pb-2 w-full max-w-screen-xl mx-auto px-10">
                {children}
            </main>
            <FooterSection/>
        </div>
)
}
