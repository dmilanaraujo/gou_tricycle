"use client"


import {ConfirmDialog, ConfirmDialogProps} from '@/components/common/confirm-dialog';

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ConfirmContextType {
	confirm: (options: ConfirmOptions) => Promise<boolean>;
}

interface ConfirmOptions extends Omit<ConfirmDialogProps, 'isOpen' | 'onOpenChange' | 'onConfirm' | 'onCancel'> {

}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export function ConfirmProvider({ children }: { children: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);
	const [options, setOptions] = useState<ConfirmOptions>({} as ConfirmOptions);
	const [resolver, setResolver] = useState<
		((value: boolean) => void) | null
	>(null);
	
	function confirm(opts = {} as ConfirmOptions) {
		setOptions(opts);
		setIsOpen(true);
		return new Promise<boolean>((resolve) => {
			setResolver(() => resolve);
		});
	}
	
	function handleConfirm() {
		setIsOpen(false);
		resolver?.(true);
	}
	
	function handleCancel() {
		setIsOpen(false);
		resolver?.(false);
	}
	
	return (
		<ConfirmContext.Provider value={{ confirm }}>
			{children}
			<ConfirmDialog
				isOpen={isOpen}
				onOpenChange={setIsOpen}
				dialogTitle={options.dialogTitle}
				description={options.description}
				cancelButtonText={options.cancelButtonText}
				onConfirm={handleConfirm}
				onCancel={handleCancel}
				isLoading={options.isLoading}
				okButtonText={options.okButtonText}
				hideTrigger={true}
			/>
		</ConfirmContext.Provider>
	);
}

export function useConfirm() {
	const context = useContext(ConfirmContext);
	if (!context) {
		throw new Error("useConfirm must be used within a ConfirmProvider");
	}
	return context.confirm;
}
