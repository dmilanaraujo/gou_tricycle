import { NextResponse } from "next/server"
import { headers } from "next/headers"
import {getBusinessBySlugCachedData} from '@/lib/actions/business'
import { logQrScan } from "@/lib/analytics/log-qr-scan"

export async function GET(
    _req: Request,
    { params }: { params: { slug: string } }
) {
    const business = await getBusinessBySlugCachedData(params.slug)

    if (!business) {
        return NextResponse.redirect(new URL("/404", process.env.NEXT_PUBLIC_SITE_URL))
    }

    const h = await headers()

    await logQrScan({
        businessId: business.id,
        scannedAt: new Date(),
        userAgent: h.get("user-agent") ?? undefined,
        ip: h.get("x-forwarded-for") ?? undefined,
    })

    return NextResponse.redirect(
        new URL(`/business/${params.slug}/catalog`, process.env.NEXT_PUBLIC_SITE_URL)
    )
}
