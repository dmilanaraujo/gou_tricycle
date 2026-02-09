"use client"

import { useState } from "react"
import { StarIcon, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type ReviewInputProps = {
    onSubmit: (rating: number, comment: string) => void
}

export function ReviewInput({ onSubmit }: ReviewInputProps) {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [comment, setComment] = useState("")

    return (
        <div className="w-full border rounded-xl bg-card p-4 flex items-center gap-3">

            {/* Textarea */}
            <Textarea
                placeholder="Escribe algo..."
                className="resize-none min-h-[50px]"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />

            {/* Rating */}
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                    <StarIcon
                        key={i}
                        className={`w-6 h-6 cursor-pointer transition ${
                            i <= (hover || rating)
                                ? "fill-amber-500 stroke-amber-500"
                                : "stroke-muted-foreground"
                        }`}
                        onClick={() => setRating(i)}
                        onMouseEnter={() => setHover(i)}
                        onMouseLeave={() => setHover(0)}
                    />
                ))}
            </div>

            {/* Enviar */}
            <Button
                size="icon"
                onClick={() => {
                    if (!rating || !comment.trim()) return
                    onSubmit(rating, comment)
                    setRating(0)
                    setComment("")
                }}
            >
                <Send className="w-4 h-4" />
            </Button>
        </div>
    )
}
