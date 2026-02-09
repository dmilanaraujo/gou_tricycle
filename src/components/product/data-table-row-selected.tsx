"use client"

import {Table} from "@tanstack/react-table"
import {Button} from "@/components/ui/button";
import * as React from "react";
import {Power, PowerOff, X} from 'lucide-react';
import {useState} from "react";
import {toast} from "sonner";
import {Separator} from "@/components/ui/separator";
import {Product} from '@/types';
import {ConfirmDeleteDialog} from '@/components/common/confirm-delete-dialog';
import {showActionErrors} from '@/lib/utils';
import {ConfirmDialog} from '@/components/common/confirm-dialog';
import {useUpdateStatusService} from '@/hooks/api/service';
import {UpdateStockDialog} from '@/components/product/update-stock-dialog';

export interface DataTableRowSelectedProps<TData> {
    table: Table<TData>,
    onDeleteSelected?: (selectedRows: TData[]) => void;
    onCancelSelection: () => void;
    onSuccess?: () => void;
    reload?: () => void;
}
export function DataTableRowSelected({
                                                table,
                                                onDeleteSelected,
                                                onCancelSelection,
                                                reload
                                            }: DataTableRowSelectedProps<Product>) {
    // const pathname = usePathname()
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDialogDisassociateDeviceOpen, setIsDialogDisassociateDeviceOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDialogActivateProductOpen, setIsDialogActivateProductOpen] = useState(false);
    const selectedRows = table.getSelectedRowModel().rows.map(row => row.original);
    const [isDialogUpdateStockOpen, setIsDialogUpdateStockOpen] = useState(false);
    
    const { mutateAsync: updateStatusProduct, isPending: isPendingActiveProduct} = useUpdateStatusService();
    
    const handleDelete = async () => {
        if (!onDeleteSelected || selectedRows.length === 0) return;

        try {
            setIsDeleting(true);
            await onDeleteSelected(selectedRows);
            onCancelSelection();
        } finally {
            setIsDeleting(false);
            setIsDialogOpen(false);
        }
    };
    
    const handleDesactivateProduct = async () => {
        const toastId = toast.loading('Desactivando servicio')
        try {
            const result = await updateStatusProduct({ serviceId: selectedRows[0].id!, active: false});
            if (!result.success) {
                showActionErrors(result.errors, toastId)
                return;
            }
            toast.success('El servicio ha sido desactivado.', { id: toastId });
            setIsDialogDisassociateDeviceOpen(false);
        } catch (e) {
            console.log(e);
            toast.error('Error', {
                id: toastId,
                description: 'No se pudo desactivar el servicio'
            });
        }
    };
    
    
    const handleActivateProduct = async () => {
        const toastId = toast.loading('Activando servicio')
        try {
            const result = await updateStatusProduct({ serviceId: selectedRows[0].id!, active: true});
            if (!result.success) {
                showActionErrors(result.errors, toastId)
                return;
            }
            toast.success('El servicio ha sido activado.', { id: toastId });
            setIsDialogActivateProductOpen(false);
        } catch (e) {
            console.log(e);
            toast.error('Error', {
                id: toastId,
                description: 'No se pudo activar el servicio'
            });
        }
    };
    
    const handleUpdateStock = async () => {
        const toastId = toast.loading('Refrescando datos')
        reload?.();
        setIsDialogUpdateStockOpen(false);
        toast.dismiss(toastId);
    };
    
    return (
        <div className="flex items-center space-x-2">
            <ConfirmDeleteDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                itemsCount={table.getFilteredSelectedRowModel().rows.length}
                onConfirm={handleDelete}
                isLoading={isDeleting}
            />
            
            
            {selectedRows.length == 1 && (
                <UpdateStockDialog
                    isOpen={isDialogUpdateStockOpen}
                    onOpenChange={setIsDialogUpdateStockOpen}
                    product={selectedRows[0]}
                    onSuccess={handleUpdateStock}
                    disabled={selectedRows.length != 1}
                />
            )}
            
            {selectedRows.length == 1 && selectedRows[0].is_active && (
                <ConfirmDialog
                    isOpen={isDialogDisassociateDeviceOpen}
                    onOpenChange={setIsDialogDisassociateDeviceOpen}
                    triggerLabel={'Desactivar'}
                    ButtonIcon={PowerOff}
                    description={'Desea desactivar el servicio?'}
                    onConfirm={handleDesactivateProduct}
                />
            )}
            {selectedRows.length == 1 && !selectedRows[0].is_active && (
                <ConfirmDialog
                    isOpen={isDialogActivateProductOpen}
                    onOpenChange={setIsDialogActivateProductOpen}
                    triggerLabel={'Activar'}
                    ButtonIcon={Power}
                    description={'Desea activar el servicio?'}
                    isLoading={isPendingActiveProduct}
                    loadingText={'Activando'}
                    onConfirm={handleActivateProduct}
                />
            )}
            <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Button
                variant="secondary"
                size="sm"
                onClick={onCancelSelection}
            >
                <X className="h-4 w-4" />
                Cancelar
            </Button>
        </div>
    )
}
