import { getBusinessById } from "@/lib/actions/business"
import { notFound } from "next/navigation"
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
        <div
            data-business-id={res.data.id}
            className="min-h-screen flex flex-col"
        >
            <BusinessNavBar business={res.data} />

            <main className="flex-1 bg-background pt-2 pb-2 w-full max-w-screen-xl mx-auto px-4">
                {children}
            </main>

            <FooterSection />
        </div>
    )
}

