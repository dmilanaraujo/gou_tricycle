"use client"

import { useState } from "react"
import type { Business } from "@/types/business"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	PowerOff,
	Trash2,
	MoreVertical,
	PauseCircle,
	Star,
} from "lucide-react"
import {getPublicBusinessImageUrl} from '@/lib/utils';
import {useLoadingRouter} from '@/providers/navigation-loading-provider';

interface BusinessCardProps {
	business: Business;
	onDelete?: (business: Business) => void
	onDisable?: (business: Business) => void
}
export function BusinessCard({ business, onDelete, onDisable }: BusinessCardProps) {
	const [open, setOpen] = useState(false)
	const router = useLoadingRouter();
	
	const goToBusiness = () => {
		if (!business.is_active) return;
		router.push(`/me/${business.slug}`)
	}
	
	return (
		<div className="group relative flex flex-col gap-3 rounded-lg border border-border bg-card p-5 transition-colors hover:border-muted-foreground/25 cursor-pointer" onClick={goToBusiness}>
			{/* Header */}
			<div className="flex items-start justify-between gap-2">
				<div className="flex items-center gap-3 min-w-0">
					{business.logo ? (
						<img
							src={getPublicBusinessImageUrl(business.logo)}
							alt={`${business.name} logo`}
							className="size-8 rounded-md object-cover"
						/>
					) : (
						 <div className="flex size-8 items-center justify-center rounded-md bg-muted text-xs font-bold text-muted-foreground uppercase">
							 {business.name.charAt(0)}
						 </div>
					 )}
					<div className="min-w-0">
						<h3 className="truncate text-sm font-semibold text-foreground">
							{business.name}
						</h3>
						<p className="truncate text-xs text-muted-foreground">
							{business.section.name} | {business.slug}
						</p>
					</div>
				</div>
				
				<DropdownMenu open={open} onOpenChange={setOpen}>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="icon-sm"
							className="shrink-0 text-muted-foreground hover:text-foreground"
						>
							<MoreVertical className="size-4" />
							<span className="sr-only">Opciones</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-44">
						{business.is_active && (
							<DropdownMenuItem onClick={(e) => {
								e.stopPropagation()
								onDisable?.(business)
							}}>
								<PowerOff className="size-4" />
								Desactivar
							</DropdownMenuItem>
						)}
						<DropdownMenuItem className='text-red-500' onClick={(e) => {
							e.stopPropagation()
							onDelete?.(business)
						}}>
							<Trash2 className="size-4" />
							Eliminar negocio
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			
			{/* Badges */}
			<div className="flex flex-wrap items-center gap-1.5">
				<Badge
					variant="outline"
					className={
						business.is_active
						? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] uppercase tracking-wider font-semibold"
						: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-[10px] uppercase tracking-wider font-semibold"
					}
				>
					{business.is_active ? "Activo" : "Inactivo"}
				</Badge>
				{business.featured && (
					<Badge
						variant="outline"
						className="border-sky-500/30 bg-sky-500/10 text-sky-400 text-[10px] uppercase tracking-wider font-semibold"
					>
						Destacado
					</Badge>
				)}
				{business.categories.map((cat) => (
					<Badge
						key={cat.id}
						variant="outline"
						className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground"
					>
						{cat.name}
					</Badge>
				))}
			</div>
			
			{/* Paused warning */}
			{!business.is_active && (
				<div className="flex items-center gap-2 rounded-md text-xs text-muted-foreground">
					<PauseCircle className="size-3.5 shrink-0" />
					<span>El negocio está inactivo</span>
				</div>
			)}
			
			{/* Featured indicator */}
			{business.featured && business.is_active && (
				<div className="flex items-center gap-2 rounded-md text-xs text-muted-foreground">
					<Star className="size-3.5 shrink-0 text-sky-400" />
					<span>Negocio destacado</span>
				</div>
			)}
		</div>
	)
}
