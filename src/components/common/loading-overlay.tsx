"use client"

import { Loader2 } from "lucide-react"
import {useNavigationLoading} from '@/providers/navigation-loading-provider';

export function LoadingOverlay() {
    const { isNavigating } = useNavigationLoading()

    if (!isNavigating) return null

    return (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 dark:bg-black/50 rounded-md">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
    )
}
