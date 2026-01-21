"use client"

import {Table} from "@tanstack/react-table"
import {Button} from "@/components/ui/button";
import * as React from "react";
import {CloudOff, MapPin, Power, X} from 'lucide-react';
import {useState} from "react";
import {toast} from "sonner";
import {Separator} from "@/components/ui/separator";
import {useRouter} from "next/navigation";
import {useNavigationLoading} from "@/providers/navigation-loading-provider";
import {Service} from '@/types';
import {ConfirmDeleteDialog} from '@/components/common/confirm-delete-dialog';
import {useUpdateStatusService} from '@/hooks/api/service';
import {showActionErrors} from '@/lib/utils';
import {ConfirmDialog} from '@/components/common/confirm-dialog';

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
                                            }: DataTableRowSelectedProps<Service>) {
    // const pathname = usePathname()
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDialogDisassociateDeviceOpen, setIsDialogDisassociateDeviceOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDialogActivateServiceOpen, setIsDialogActivateServiceOpen] = useState(false);
    const selectedRows = table.getSelectedRowModel().rows.map(row => row.original);
    const router = useRouter();
    const { setIsNavigating } = useNavigationLoading()
    
    const { mutateAsync: updateStatusService, isPending: isPendingActiveService} = useUpdateStatusService();
    
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
    
    const handleDesactivateService = async () => {
        const toastId = toast.loading('Desactivando servicio')
        try {
            const result = await updateStatusService({ serviceId: selectedRows[0].id!, active: false});
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
    
    
    const handleActivateService = async () => {
        const toastId = toast.loading('Activando servicio')
        try {
            const result = await updateStatusService({ serviceId: selectedRows[0].id!, active: true});
            if (!result.success) {
                showActionErrors(result.errors, toastId)
                return;
            }
            toast.success('El servicio ha sido activado.', { id: toastId });
            setIsDialogActivateServiceOpen(false);
        } catch (e) {
            console.log(e);
            toast.error('Error', {
                id: toastId,
                description: 'No se pudo activar el servicio'
            });
        }
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
            
            
            {selectedRows.length == 1 && selectedRows[0].is_active && (
                <ConfirmDialog
                    isOpen={isDialogDisassociateDeviceOpen}
                    onOpenChange={setIsDialogDisassociateDeviceOpen}
                    triggerLabel={'Desactivar'}
                    ButtonIcon={CloudOff}
                    description={'Desea desactivar el servicio?'}
                    onConfirm={handleDesactivateService}
                />
            )}
            {selectedRows.length == 1 && !selectedRows[0].is_active && (
                <ConfirmDialog
                    isOpen={isDialogActivateServiceOpen}
                    onOpenChange={setIsDialogActivateServiceOpen}
                    triggerLabel={'Activar'}
                    ButtonIcon={Power}
                    description={'Desea activar el servicio?'}
                    isLoading={isPendingActiveService}
                    loadingText={'Activando'}
                    onConfirm={handleActivateService}
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
