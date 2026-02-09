"use client"

import {Column, Table} from '@tanstack/react-table'
import {Input} from "@/components/ui/input";
import {BrushCleaning,  Funnel, Power, Search,  X} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import * as React from "react";
import {useState} from "react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ColumnMeta} from '@/types';

export interface DataTableColumnFiltersProps<TData, TFilter> {
    table: Table<TData>,
    filter?: TFilter,
    onFilterChange?: (filter: TFilter) => void;
}

export function DataTableColumnFilters<TData, TFilter>({
                                                table,
                                                onFilterChange
                                            }: DataTableColumnFiltersProps<TData, TFilter>) {
    const filterableColumns = table.getAllColumns()
        .filter(column => column.getCanFilter());
    const firstFilterableColumn = filterableColumns.length > 0
        ? filterableColumns[0].id
        : null;

    const [filterColumn, setFilterColumn] = useState<string | null>(firstFilterableColumn);
    const [filterValue, setFilterValue] = useState("");
    const [statusFilters, setStatusFilters] = useState({
        active: true,
        inactive: true
    });

    const hasActiveFilters = filterValue || !statusFilters.active || !statusFilters.inactive;

    const getPlaceholderText = (columnId: string | null) => {
        if (!columnId) return "Buscar en todos los campos";

        const column = table.getAllColumns().find(col => col.id === columnId);
        if (!column) return "Buscar...";

        return `Buscar por ${getColumnHeader(column)}...`;
    };
    
    const getColumnHeader = (column: Column<TData>) => {
        const header = column.columnDef.header;
        if (typeof header === 'string') {
            return header;
        }
        return (column as ColumnMeta).columnDef?.meta?.filterName || ''
    };

    const handleStatusFilter = (status: keyof typeof statusFilters) => (checked: boolean) => {
        const newStatusFilters = {
            ...statusFilters,
            [status]: checked
        };
        setStatusFilters(newStatusFilters);
        triggerFilterChange(filterValue, filterColumn, newStatusFilters);
    };

    const triggerFilterChange = (
        value: string,
        columnId: string | null,
        statusFilters?: { active: boolean, inactive: boolean }
    ) => {
        if (onFilterChange) {
            table.setPageIndex(0);
            onFilterChange({
                columnId,
                value,
                statusFilters
            } as TFilter);
        }
    };

    const handleFilterChange = () => {
        triggerFilterChange(filterValue, filterColumn, statusFilters);
    };

    const handleClearFilters = () => {
        setFilterValue("");
        setStatusFilters({
            active: true,
            inactive: true
        });
        triggerFilterChange("", null, {
            active: true,
            inactive: true
        });
    };

    return (
        <div className="flex items-center gap-2 flex-wrap">
            <div className="relative min-w-[340px] flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder={getPlaceholderText(filterColumn)}
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleFilterChange();
                        }
                    }}
                    className="pl-10 pr-8 h-8 text-sm w-full"
                />
                {(filterValue) && (
                    <button
                        type="button"
                        onClick={handleClearFilters}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
            <Select
                value={filterColumn || ""}
                onValueChange={(value) => {
                    setFilterColumn(value);
                    setFilterValue("");
                }}
            >
                <SelectTrigger className="border-dashed" size="sm">
                    <Funnel />
                    <SelectValue placeholder="Seleccionar columna" />
                </SelectTrigger>
                <SelectContent>
                    {table.getAllColumns()
                        .filter(column => column.getCanFilter())
                        .map(column => (
                            <SelectItem key={column.id} value={column.id}>
                                {getColumnHeader(column)}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-dashed"
                        data-active={!statusFilters.active || !statusFilters.inactive ? "true" : "false"}
                    >
                        <Power className="ml-2 h-4 w-4" />
                        Estado
                        {(!statusFilters.active || !statusFilters.inactive) && (
                            <span className="ml-1">*</span>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuCheckboxItem
                        key="filter-active"
                        className="capitalize"
                        checked={statusFilters.active}
                        onCheckedChange={handleStatusFilter('active')}
                    >
                        Activo
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        key="filter-inactive"
                        className="capitalize"
                        checked={statusFilters.inactive}
                        onCheckedChange={handleStatusFilter('inactive')}
                    >
                        Inactivo
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {hasActiveFilters && (
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleClearFilters}
                    className="flex items-center gap-1"
                >
                    <BrushCleaning className="h-4 w-4" />
                    Limpiar filtros
                </Button>
            )}
        </div>
    )
}
