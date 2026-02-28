'use client'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Loader2, LucideIcon, X } from 'lucide-react'
import { ReactNode } from 'react'

export interface ConfirmDialogProps {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
	itemsCount?: number
	onConfirm: () => void
	onCancel?: () => void
	isLoading?: boolean
	dialogTitle?: string
	triggerLabel?: string
	loadingText?: string
	okButtonText?: string
	cancelButtonText?: string
	buttonTriggerVariant?:
		| 'link'
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| null
		| undefined
	description?: ReactNode
	ButtonIcon?: LucideIcon
	hideTrigger?: boolean
}

export function ConfirmDialog({
	                              isOpen,
	                              onOpenChange,
	                              itemsCount,
	                              onConfirm,
	                              onCancel,
	                              isLoading = false,
	                              triggerLabel = 'Realizar la acción sobre',
	                              dialogTitle,
	                              description,
	                              loadingText,
	                              okButtonText,
	                              cancelButtonText,
	                              buttonTriggerVariant,
	                              ButtonIcon,
	                              hideTrigger,
                              }: ConfirmDialogProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			{!hideTrigger && (
				<DialogTrigger asChild>
					<Button variant={buttonTriggerVariant || 'outline'} size="sm">
						{!!ButtonIcon && <ButtonIcon className="h-4 w-4 mr-2" />}
						{triggerLabel}{' '}
						{(itemsCount || 0) > 0 ? `${itemsCount} registro(s)` : ''}
					</Button>
				</DialogTrigger>
			)}
			
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="py-2">
						{dialogTitle || '¿Estás completamente seguro?'}
					</DialogTitle>
					
					<DialogDescription>
						{description}
					</DialogDescription>
				</DialogHeader>
				
				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => {
							onCancel?.()
							onOpenChange(false)
						}}
						disabled={isLoading}
					>
						{cancelButtonText || 'Cancelar'}
					</Button>
					
					<Button
						variant="destructive"
						onClick={onConfirm}
						disabled={isLoading}
					>
						{isLoading ? (
							<div className="flex items-center gap-2">
								<Loader2 className="h-4 w-4 text-white animate-spin" />
								{loadingText || 'Procesando'}...
							</div>
						) : (
							 okButtonText || 'Aceptar'
						 )}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
