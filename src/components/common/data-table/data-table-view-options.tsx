"use client"

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Table as TanstackTable } from "@tanstack/react-table"
import { Settings2 } from "lucide-react"
import {
    DropdownMenu, DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";

export function DataTableViewOptions<TData>({
                                                table,
                                            }: { table: TanstackTable<TData>}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto hidden h-8 lg:flex"
                >
                    <Settings2 />
                    Columnas
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
                <DropdownMenuLabel>Mostrar / Ocultar</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <>
                    {table
                        .getAllColumns()
                        .filter(
                            (column) =>
                                typeof column.accessorFn !== "undefined" && column.getCanHide()
                        )
                        .map((column) => {
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                >
                                    {column.id}
                                    {/*<>{column.columnDef?.header}</>*/}
                                </DropdownMenuCheckboxItem>
                            )
                        })}
                </>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
