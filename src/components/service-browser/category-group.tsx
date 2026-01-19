'use client'

import { BookmarkIcon, HeartIcon, StarIcon, LeafIcon, BoxesIcon, PlugIcon, HammerIcon } from "lucide-react"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {cn} from "@/lib/utils";

type CategoryOption = {
    label: string
    value: string
    icon: React.ReactNode
}

// type Props = {
//     section: "transport" | "market" | "beauty" | "restaurant"
//     onCategoryChange: (value: string | null) => void
// }
type Props = {
    section: "transport" | "market" | "beauty" | "restaurant"
    value: string | null
    onCategoryChange: (value: string | null) => void
}


const sectionColorClasses: Record<Props["section"], string> = {
    transport: "data-[state=on]:*:[svg]:fill-yellow-500 data-[state=on]:*:[svg]:stroke-yellow-500",
    market: "data-[state=on]:*:[svg]:fill-green-500 data-[state=on]:*:[svg]:stroke-green-500",
    beauty: "data-[state=on]:*:[svg]:fill-pink-500 data-[state=on]:*:[svg]:stroke-pink-500",
    restaurant: "data-[state=on]:*:[svg]:fill-red-500 data-[state=on]:*:[svg]:stroke-red-500",
}

const categories: Record<"transport" | "market" | "beauty" | "restaurant", CategoryOption[]> = {
    transport: [
        { label: "Mercancia", value: "mercancia", icon: <StarIcon className="mr-1" /> },
        { label: "Materiales de Construccion", value: "materiales", icon: <HeartIcon className="mr-1" /> },
        { label: "Personal", value: "personal", icon: <BookmarkIcon className="mr-1" /> },
    ],
    market: [
        { label: "Agropecuario", value: "agro", icon: <LeafIcon className="mr-1" /> },
        { label: "Productos Varios", value: "varios", icon: <BoxesIcon className="mr-1" /> },
        { label: "Electrodoméstico", value: "electro", icon: <PlugIcon className="mr-1" /> },
        { label: "Ferretería", value: "ferreteria", icon: <HammerIcon className="mr-1" /> },
        { label: "Materiales de Construcción", value: "materiales", icon: <HeartIcon className="mr-1" /> },
    ],
    beauty: [
        { label: "Cosméticos", value: "cosmeticos", icon: <HeartIcon className="mr-1" /> },
        { label: "Cuidado Personal", value: "cuidado", icon: <StarIcon className="mr-1" /> },
        { label: "Perfumería", value: "perfumeria", icon: <BookmarkIcon className="mr-1" /> },
        { label: "Pestañs", value: "electro-belleza", icon: <PlugIcon className="mr-1" /> },
        { label: "Manicury", value: "bienestar", icon: <LeafIcon className="mr-1" /> },
    ],
    restaurant: [
        { label: "Comida Italiana", value: "frescos", icon: <LeafIcon className="mr-1" /> },
        { label: "Comida Criolla", value: "bebidas", icon: <StarIcon className="mr-1" /> },
        { label: "Sushi", value: "utensilios", icon: <HammerIcon className="mr-1" /> },
        { label: "Comida Rapida", value: "equipamiento", icon: <PlugIcon className="mr-1" /> },
        { label: "Variado", value: "desechables", icon: <BoxesIcon className="mr-1" /> },
    ],
}

export function CategoryGroup({ section, value, onCategoryChange }: Props) {
    const options = categories[section]

    return (
        <ToggleGroup
            type="single"
            variant="outline"
            size="sm"
            spacing={2}
            value={value ?? ""}
            onValueChange={(value) => onCategoryChange(value || null)}
        >
        {options.map(({ value, label, icon }) => (
                <ToggleGroupItem
                    key={value}
                    value={value}
                    aria-label={`Toggle ${value}`}
                    className={cn(
                        "data-[state=on]:bg-transparent",
                        "hover:cursor-pointer",
                        sectionColorClasses[section]
                    )}
                >
                    {icon}
                    {label}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    )
}
