"use client"

import { useState } from "react"
import { StarIcon, SendIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Props = {
    onSubmit: (rating: number, comment: string) => void
}

export function QuickReviewBar({ onSubmit }: Props) {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    return (
        <div className="flex items-center gap-3 border rounded-full px-4 py-2 bg-background shadow-sm">

            {/* Avatar fake */}
            <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                U
            </div>

            {/* Input */}
            <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Escribe una valoración..."
                className="flex-1 bg-transparent outline-none text-sm"
            />

            {/* Rating */}
            <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                    <StarIcon
                        key={i}
                        onClick={() => setRating(i)}
                        className={cn(
                            "w-5 h-5 cursor-pointer transition",
                            i <= rating
                                ? "fill-amber-500 stroke-amber-500"
                                : "stroke-muted-foreground hover:stroke-amber-500"
                        )}
                    />
                ))}
            </div>

            {/* Enviar */}
            <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                    if (!rating || !comment.trim()) return
                    onSubmit(rating, comment)
                    setComment("")
                    setRating(0)
                }}
            >
                <SendIcon className="w-5 h-5" />
            </Button>
        </div>
    )
}
