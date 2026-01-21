"use client"

import {
    Table as TanstackTable,
    ColumnDef,
    flexRender,
    getCoreRowModel, SortingState,
    useReactTable, RowSelectionState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {DataTablePagination} from "@/components/common/data-table/data-table-pagination";
import {useState} from "react";
import * as React from "react";
import {
    DataTableColumnFiltersProps
} from "@/components/common/data-table/data-table-column-filters";
import {cn} from "@/lib/utils";
import {DataTableRowSelectedProps} from "@/components/common/data-table/data-table-row-selected";
import {ColumnMeta} from '@/types';

interface DataTableProps<TData, TValue, TFilter> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[] | [],
    rowCount: number,
    onPageChange?: (pageIndex: number) => void,
    onPageSizeChange?: (pageSize: number) => void;
    onSortChange?: (sorting: SortingState) => void;
    onRowSelectionChange?: (rowSelection: RowSelectionState) => void
    onFilterChange?: (filter: TFilter) => void;
    loading?: boolean;
    filter?: TFilter,
    ColumnFiltersComponent?: React.ComponentType<DataTableColumnFiltersProps<TData, TFilter>>;
    ExportComponent?: React.ComponentType<{ filter?: TFilter }>;
    ViewOptionsComponent?: React.ComponentType<{ table: TanstackTable<TData> }>;
    RowSelectedActionsComponent?: React.ComponentType<DataTableRowSelectedProps<TData>>;
    onRowClick?: (row: TData) => void;
    rowClassName?: (row: TData) => string;
    onDeleteSelected?: (selectedRows: TData[]) => Promise<void>;
    showSelectionActions?: boolean;
    onSuccess?: () => void;
    reload?: () => void;
    isDeleting?: boolean;
}

export function DataTable<TData, TValue, TFilter>({
                                             columns,
                                             data,
                                             rowCount,
                                             onPageChange,
                                             onPageSizeChange,
                                             onSortChange,
                                             onFilterChange,
                                             loading = false,
                                             filter,
                                             ColumnFiltersComponent,
                                             ExportComponent,
                                             ViewOptionsComponent,
                                             RowSelectedActionsComponent,
                                             onRowClick,
                                             rowClassName,
                                             onDeleteSelected,
                                             showSelectionActions = false,
                                             reload,
                                             isDeleting
                                         }: DataTableProps<TData, TValue, TFilter>) {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<SortingState>([])
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

    const hasSelection = Object.keys(rowSelection).length > 0;

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: (updater) => {
            const newSorting = updater instanceof Function ? updater(sorting) : updater;
            setSorting(newSorting);

            if (onSortChange) {
                onSortChange(newSorting);
            }
        },
        onPaginationChange: (updater) => {
            setPagination(updater instanceof Function ? updater(pagination) : updater);

            const newPagination = updater instanceof Function ? updater(pagination) : updater;

            if (onPageChange && newPagination.pageIndex !== pagination.pageIndex) {
                onPageChange(newPagination.pageIndex);
            }

            if (onPageSizeChange && newPagination.pageSize !== pagination.pageSize) {
                onPageSizeChange(newPagination.pageSize);
            }
        },
        onRowSelectionChange: setRowSelection,
        manualSorting: true,
        manualPagination: true,
        rowCount: rowCount,
        state: {
            sorting,
            pagination,
            rowSelection
        }
    })

    const showToolbar = (RowSelectedActionsComponent && hasSelection) || ColumnFiltersComponent || ViewOptionsComponent;

    return (
        <div>
            {/* Barra de herramientas superior */}
            {showToolbar && (
                <div className="flex items-start justify-between py-4 gap-2">
                    {/* Mostrar acciones de selección si hay selección */}
                    {hasSelection && showSelectionActions ? (
                        RowSelectedActionsComponent && (
                            <RowSelectedActionsComponent
                                table={table}
                                onDeleteSelected={onDeleteSelected}
                                onCancelSelection={() => setRowSelection({})}
                                reload={reload}
                                isDeleting={isDeleting}
                            />
                        )
                    ) : (
                        <>
                            {ColumnFiltersComponent && (
                                <ColumnFiltersComponent
                                    table={table}
                                    onFilterChange={onFilterChange}
                                    filter={filter}
                                />
                            )}

                            {ViewOptionsComponent && (
                                <ViewOptionsComponent table={table} />
                            )}
                            {ExportComponent && (
                                <ExportComponent
                                    filter={filter}
                                />
                            )}
                        </>
                    )}
                </div>
            )}
            <div className="rounded-md border overflow-hidden">
                <Table>
                    <TableHeader className="sticky top-0 z-10 bg-blue-50 dark:bg-blue-900/30">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="hover:bg-transparent">
                                {headerGroup.headers.map((header) => {
                                    const meta = header.column.columnDef.meta as ColumnMeta | undefined;
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className={cn(
                                                "text-primary dark:text-blue-100 font-semibold", // estilos base
                                                meta?.headerClassName // ← clases responsive por columna (e.g. 'hidden md:table-cell')
                                            )}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            Array.from({ length: pagination?.pageSize || 10 }).map((_, index) => (
                                <TableRow key={`skeleton-${index}`}>
                                    {columns.map((column, colIndex) => {
                                        const meta = column.meta as ColumnMeta | undefined;
                                        return (
                                            <TableCell
                                                key={`skeleton-cell-${index}-${colIndex}`}
                                                className={cn(meta?.cellClassName)} // ← aplica visibilidad responsive también en skeleton
                                            >
                                                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={cn(
                                        onRowClick && "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800",
                                        rowClassName && rowClassName(row.original)
                                    )}
                                    onClick={(e) => {
                                        if (!(e.target instanceof HTMLInputElement && e.target.type === 'checkbox')) {
                                            onRowClick?.(row.original);
                                        }
                                    }}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        const meta = cell.column.columnDef.meta as ColumnMeta | undefined;
                                        return (
                                            <TableCell
                                                key={cell.id}
                                                className={cn(meta?.cellClassName)} // ← clases responsive por celda
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No se encontraron resultados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    )
}
