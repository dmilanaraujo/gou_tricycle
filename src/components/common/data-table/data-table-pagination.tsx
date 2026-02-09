import { Table } from "@tanstack/react-table"
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import * as React from "react";

interface DataTablePaginationProps<TData> {
    table: Table<TData>
}

export function DataTablePagination<TData>({
                                               table,
                                           }: DataTablePaginationProps<TData>) {
    const { pageIndex, pageSize } = table.getState().pagination;
    const totalRows = table.getRowCount();
    const startIndex = pageIndex * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalRows);

    return (
        <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground hidden md:inline-flex">
                    Mostrando {totalRows === 0 ? 0 : startIndex + 1} - {endIndex} de {totalRows} Registros
                </span>
                <div className="hidden md:inline-flex">
                    <Select
                        value={`${pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value))
                        }}
                    >
                        <SelectTrigger className="h-8">
                            <SelectValue placeholder={pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            <>
                                {[10, 20, 30, 50].map(pageSize => (
                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                        Mostrar {pageSize}
                                    </SelectItem>
                                ))}
                            </>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                    className="hidden md:inline-flex"
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeft />
                    Anterior
                </Button>

                <div className="flex items-center gap-1 text-sm font-medium">
                    <span>Página</span>
                    <span className="text-center">
                        {pageIndex + 1}
                    </span>
                    <span>de</span>
                    <span>{table.getPageCount()}</span>
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Siguiente
                    <ChevronRight />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                    className="hidden md:inline-flex"
                >
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
