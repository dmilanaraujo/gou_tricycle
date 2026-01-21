"use client"

import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogOverlay,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Loader2, Trash2, X } from "lucide-react"
import { ReactNode } from "react"

interface ConfirmDeleteDialogProps {
	/** controla si el diálogo está abierto */
	isOpen: boolean
	/** callback cuando cambia el estado del diálogo */
	onOpenChange: (open: boolean) => void
	/** número de items seleccionados */
	itemsCount: number
	/** callback cuando se confirma eliminar */
	onConfirm: () => void
	/** si está en proceso de eliminar */
	isLoading?: boolean
	/** etiqueta del botón trigger */
	triggerLabel?: string
	/** contenido adicional en la descripción */
	description?: ReactNode
}

export function ConfirmDeleteDialog({
	                                    isOpen,
	                                    onOpenChange,
	                                    itemsCount,
	                                    onConfirm,
	                                    isLoading = false,
	                                    triggerLabel = "Eliminar",
	                                    description,
                                    }: ConfirmDeleteDialogProps) {
	return (
		<AlertDialog open={isOpen} onOpenChange={onOpenChange}>
			<AlertDialogTrigger asChild>
				<Button variant="destructive" size="sm">
					<Trash2 className="h-4 w-4" />
					{triggerLabel} {itemsCount > 0 ? `${itemsCount} registro(s)` : ""}
				</Button>
			</AlertDialogTrigger>
			
			<AlertDialogOverlay className="backdrop-blur-0" />
			
			<AlertDialogContent className="rounded-lg p-0">
				<AlertDialogCancel
					asChild
					className="border-0 shadow-none cursor-pointer"
				>
					<button
						className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
						onClick={() => onOpenChange(false)}
						disabled={isLoading}
					>
						<X className="h-5 w-5 text-gray-500" />
					</button>
				</AlertDialogCancel>
				
				<AlertDialogHeader>
					<AlertDialogTitle className="border-b p-4">
						¿Estás completamente seguro?
					</AlertDialogTitle>
					<AlertDialogDescription className="p-4">
						{description ? (
							description
						) : (
							 <>
								 Esta acción no se puede deshacer. Esto eliminará
								 permanentemente {itemsCount} registro(s) seleccionado(s).
							 </>
						 )}
					</AlertDialogDescription>
				</AlertDialogHeader>
				
				<AlertDialogFooter className="border-t p-4">
					<AlertDialogCancel className="cursor-pointer" disabled={isLoading}>
						Cancelar
					</AlertDialogCancel>
					<Button
						variant="destructive"
						onClick={onConfirm}
						disabled={isLoading}
					>
						{isLoading ? (
							<div className="flex items-center gap-2">
								<Loader2 className="h-4 w-4 text-red-600 animate-spin" />
								Eliminando...
							</div>
						) : (
							 "Sí, Eliminar"
						 )}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
