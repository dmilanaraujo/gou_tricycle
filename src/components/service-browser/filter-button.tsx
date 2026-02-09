"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

type FilterButtonProps = {
    label: string
    defaultActive?: boolean
    onToggle?: (active: boolean) => void
}

export const FilterButton = ({
                                 label,
                                 defaultActive = false,
                                 onToggle,
                             }: FilterButtonProps) => {
    const [active, setActive] = useState(defaultActive)

    const handleClick = () => {
        const newState = !active
        setActive(newState)
        onToggle?.(newState)
    }

    return (
        <Button
            variant={active ? "default" : "secondary"}
            onClick={handleClick}
            className={`px-3 py-1 rounded-full transition hover:cursor-pointer ${
                active
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-primary hover:text-white"
            }`}
        >
            {label}
        </Button>
    )
}
