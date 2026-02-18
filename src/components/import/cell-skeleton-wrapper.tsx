"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CellSkeletonWrapperProps {
	children: React.ReactNode
	disabled?: boolean
	underline?: boolean
	className?: string
	skeletonClassName?: string
}

export function CellSkeletonWrapper({
	                                    children,
	                                    disabled = false,
	                                    underline = false,
	                                    className,
	                                    skeletonClassName,
                                    }: CellSkeletonWrapperProps) {
	return (

		<div className={cn("relative w-full", className)}>
			{/* Contenido real */}
			{(!disabled || underline) && (
				<div
					className={cn(
						underline && "underline",
					)}
				>
					{children}
				</div>
			)}
			
			{/* Skeleton overlay */}
			{(disabled && !underline) && (
				<div className={cn('rounded-sm h-4 w-full !bg-gray-300', skeletonClassName)} />
			)}
		</div>
	)
}
