'use client'

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {Button} from '@/components/ui/button'
import {Loader2, LucideIcon, X} from 'lucide-react'
import {ReactNode} from 'react'

export interface ConfirmDialogProps
{
	/** controla si el diálogo está abierto */
	isOpen: boolean
	/** callback cuando cambia el estado del diálogo */
	onOpenChange: (open: boolean) => void
	/** número de items seleccionados */
	itemsCount?: number
	/** callback cuando se confirma eliminar */
	onConfirm: () => void
	onCancel?: () => void
	/** si está en proceso de eliminar */
	isLoading?: boolean
	/** etiqueta del botón trigger */
	dialogTitle?: string
	triggerLabel?: string
	loadingText?: string
	okButtonText?: string
	cancelButtonText?: string
	buttonTriggerVariant?:  'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | null | undefined
	/** contenido adicional en la descripción */
	description?: ReactNode
	ButtonIcon?: LucideIcon
	hideTrigger?: boolean
}

export function ConfirmDialog({
	                              isOpen,
	                              onOpenChange,
	                              itemsCount,
	                              onConfirm,
	                              isLoading = false,
	                              triggerLabel = 'Realizar la acción sobre',
	                              dialogTitle,
	                              description,
	                              loadingText,
	                              okButtonText,
	                              cancelButtonText,
	                              buttonTriggerVariant,
	                              ButtonIcon,
	                              hideTrigger
                              }: ConfirmDialogProps) {
	return (
		<AlertDialog open={isOpen} onOpenChange={onOpenChange}>
			{!hideTrigger && (
				<AlertDialogTrigger asChild>
					<Button variant={buttonTriggerVariant || 'outline'} size="sm">
						{!!ButtonIcon && <ButtonIcon className="h-4 w-4"/>}
						{triggerLabel} {(itemsCount || 0) > 0 ? `${itemsCount} registro(s)` : ''}
					</Button>
				</AlertDialogTrigger>
			)}
			
			<AlertDialogOverlay className="backdrop-blur-0"/>
			
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
						<X className="h-5 w-5 text-gray-500"/>
					</button>
				</AlertDialogCancel>
				
				<AlertDialogHeader>
					<AlertDialogTitle className="border-b p-4">
						{dialogTitle || '¿Estás completamente seguro?'}
					</AlertDialogTitle>
					<AlertDialogDescription className="p-4">
						{description}
					</AlertDialogDescription>
				</AlertDialogHeader>
				
				<AlertDialogFooter className="border-t p-4">
					<AlertDialogCancel className="cursor-pointer" disabled={isLoading}>
						{cancelButtonText || 'Cancelar'}
					</AlertDialogCancel>
					<Button
						variant="destructive"
						onClick={onConfirm}
						disabled={isLoading}
					>
						{isLoading ? (
							<div className="flex items-center gap-2">
								<Loader2 className="h-4 w-4 text-red-600 animate-spin"/>
								{loadingText}...
							</div>
						) : (okButtonText || 'Aceptar')
						}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
