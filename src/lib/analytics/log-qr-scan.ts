// import { supabase } from "@/lib/supabase/server"
import {createClient} from '@/lib/supabase/server';

interface LogQrScanInput {
    businessId: string
    scannedAt: Date
    userAgent?: string
    ip?: string
}

export async function logQrScan(data: LogQrScanInput) {
    const supabase = await createClient()
    await supabase.from("qr_scans").insert({
        business_id: data.businessId,
        scanned_at: data.scannedAt.toISOString(),
        user_agent: data.userAgent,
        ip_address: data.ip,
    })
}
