"use client"

import {Table} from "@tanstack/react-table"
import {Button} from "@/components/ui/button";
import * as React from "react";
import {X} from "lucide-react";
import {useEffect} from 'react';
import {ConfirmDeleteDialog} from '@/components/common/confirm-delete-dialog';

export interface DataTableRowSelectedProps<TData> {
    table: Table<TData>,
    onDeleteSelected?: (selectedRows: TData[]) => Promise<void>;
    onCancelSelection: () => void;
    reload?: () => Promise<void> | void;
    isDeleting?: boolean;
}
export function DataTableRowSelected<TData>({
                                                table,
                                                onDeleteSelected,
                                                onCancelSelection,
                                                isDeleting: defaultIsDeleting,
                                            }: DataTableRowSelectedProps<TData>) {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [isDeleting, setIsDeleting] = React.useState(defaultIsDeleting);
    const selectedRows = table.getSelectedRowModel().rows.map(row => row.original);
    
    useEffect(() => {
        setIsDeleting(isDeleting);
    }, [isDeleting]);

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

    return (
        <div className="flex items-center space-x-2">
            <ConfirmDeleteDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                itemsCount={table.getFilteredSelectedRowModel().rows.length}
                onConfirm={handleDelete}
                isLoading={isDeleting}
            />
            <Button
                variant="outline"
                size="sm"
                onClick={onCancelSelection}
            >
                <X className="h-4 w-4" />
                Cancelar
            </Button>
        </div>
    )
}
