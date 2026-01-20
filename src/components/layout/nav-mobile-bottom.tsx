"use client"

import { Home, Search, PlusCircle, Heart, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
	{
		label: "Inicio",
		href: "/",
		icon: Home,
	},
	// {
	// 	label: "Buscar",
	// 	href: "/search",
	// 	icon: Search,
	// },
	{
		label: "Crear",
		href: "/create",
		icon: PlusCircle,
	},
	// {
	// 	label: "Favoritos",
	// 	href: "/favorites",
	// 	icon: Heart,
	// },
	{
		label: "Perfil",
		href: "/me/profile",
		icon: User,
	},
]

export function NavMobileBottom() {
	const pathname = usePathname()
	
	return (
		<nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
			<div className="flex h-16 items-center justify-around px-2">
				{navItems.map((item) => {
					const isActive = pathname === item.href
					return (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"flex flex-col items-center justify-center gap-1 px-3 py-2 text-xs transition-colors",
								isActive
								? "text-primary"
								: "text-muted-foreground hover:text-foreground"
							)}
						>
							<item.icon
								className={cn(
									"h-5 w-5 transition-transform",
									isActive && "scale-110"
								)}
								strokeWidth={isActive ? 2.5 : 2}
							/>
							<span className="font-medium">{item.label}</span>
						</Link>
					)
				})}
			</div>
			{/* Safe area spacing for iOS devices */}
			<div className="h-[env(safe-area-inset-bottom)]" />
		</nav>
	)
}
