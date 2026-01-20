import { getBusinessById, getBusinessReviews } from "@/lib/actions/business"
import { notFound } from "next/navigation"
import BusinessDetail from "@/components/client/business-detail";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const res = await getBusinessById(id)
    const { data: reviews } = await getBusinessReviews(id)

    if (!res?.success || !res.data) notFound()

    return (
        <BusinessDetail
            business={res.data}
            reviews={reviews ?? []}
        />
    )
}
