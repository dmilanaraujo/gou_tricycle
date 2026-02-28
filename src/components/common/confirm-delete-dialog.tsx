"use client"

import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, Trash2, X } from "lucide-react"
import { ReactNode } from "react"

interface ConfirmDeleteDialogProps {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
	itemsCount: number
	onConfirm: () => void
	isLoading?: boolean
	triggerLabel?: string
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
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<Button variant="destructive" size="sm">
					<Trash2 className="h-4 w-4 mr-2" />
					{triggerLabel} {itemsCount > 0 ? `${itemsCount} registro(s)` : ""}
				</Button>
			</DialogTrigger>
			
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="py-2">
						¿Estás completamente seguro?
					</DialogTitle>
					
					<DialogDescription>
						{description ? (
							description
						) : (
							 <>
								 Esta acción no se puede deshacer. Esto eliminará permanentemente{" "}
								 {itemsCount} registro(s) seleccionado(s).
							 </>
						 )}
					</DialogDescription>
				</DialogHeader>
				
				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
						disabled={isLoading}
					>
						Cancelar
					</Button>
					
					<Button
						variant="destructive"
						onClick={onConfirm}
						disabled={isLoading}
					>
						{isLoading ? (
							<div className="flex items-center gap-2">
								<Loader2 className="h-4 w-4 text-white animate-spin" />
								Eliminando...
							</div>
						) : (
							 "Sí, Eliminar"
						 )}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
