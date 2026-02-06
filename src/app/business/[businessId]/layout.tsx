import { getBusinessById } from "@/lib/actions/business"
import { notFound } from "next/navigation"
import NavBar from "@/components/layout/nav-bar";

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
            <NavBar/>
            <main className="min-h-screen bg-background pt-2 w-full max-w-screen-xl mx-auto px-10 pb-8">
                {children}
            </main>
        </div>
)
}
