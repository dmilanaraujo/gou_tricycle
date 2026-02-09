"use client"

import {Column} from '@tanstack/react-table'
import {Input} from "@/components/ui/input";
import {BrushCleaning, Funnel, Power, Search, X} from 'lucide-react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import * as React from "react";
import {useMemo, useRef, useState} from 'react';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ServicesFilterValues} from '@/lib/schemas/service';
import {ActiveStatus, ColumnMeta, Service} from '@/types';
import {DataTableColumnFiltersProps} from '@/components/common/data-table/data-table-column-filters';

const defaultStatusFilter: ServicesFilterValues["statusFilters"] = {
    [ActiveStatus.active]: true,
    [ActiveStatus.inactive]: true,
}

export function DataTableColumnFilters({
                                           table,
                                           filter,
                                           onFilterChange
                                       }: DataTableColumnFiltersProps<Service, ServicesFilterValues>) {
    const filterableColumns = table.getAllColumns().filter(column => column.getCanFilter());
    const firstFilterableColumn = filterableColumns.length > 0 ? filterableColumns[0].id : null;

    const initialFilter = useRef(filter);
    const [filterColumn, setFilterColumn] = useState<string | null>(firstFilterableColumn);
    const [filterValue, setFilterValue] = useState("");
    const [statusFilters, setStatusFilters] = useState<ServicesFilterValues["statusFilters"]>(
        filter?.statusFilters || defaultStatusFilter
    );

    // --- Derivados seguros (respetan false y hacen fallback solo si es undefined)
    const activeChecked   = statusFilters?.active   ?? true;
    const inactiveChecked = statusFilters?.inactive ?? true;

    // Mostrar indicador de filtro en "Estado" cuando NO estén ambos marcados
    const hasStatusFilter = !(activeChecked && inactiveChecked);

    const diffFilterStatuses = useMemo(() => {
        const prevActive   = initialFilter.current?.statusFilters?.active;
        const prevInactive = initialFilter.current?.statusFilters?.inactive;
        return (prevActive !== activeChecked) || (prevInactive !== inactiveChecked);
    }, [activeChecked, inactiveChecked]);

    const hasActiveFilters = useMemo(() => {
        return !!filterValue || diffFilterStatuses ;
    }, [filterValue, diffFilterStatuses]);

    const getPlaceholderText = (columnId: string | null) => {
        if (!columnId) return "Buscar en todos los campos";
        const column = table.getAllColumns().find(col => col.id === columnId);
        if (!column) return "Buscar...";
        return `Buscar por ${getColumnHeader(column)}...`;
    };

    const getColumnHeader = (column: Column<Service>) => {
        const header = column.columnDef.header;
        if (typeof header === 'string') return header;
        return (column as ColumnMeta).columnDef?.meta?.filterName || ''
    };

    const handleStatusFilter = (status: ActiveStatus, checked: boolean) => {
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
        statusFilters?: ServicesFilterValues["statusFilters"],
    ) => {
        if (onFilterChange) {
            table.setPageIndex(0);
            onFilterChange({
                ...initialFilter.current,
                columnId,
                value,
                statusFilters,
            });
        }
    };

    const handleFilterChange = () => {
        triggerFilterChange(filterValue, filterColumn, statusFilters);
    };

    const handleClearFilters = () => {
        setFilterValue("");
        const resetStatuses = initialFilter.current?.statusFilters ?? defaultStatusFilter;
        setStatusFilters(resetStatuses);
        triggerFilterChange("", null, resetStatuses);
    };

    return (
        <div className="space-y-4">
            {/* Primera fila: Search y Exportar */}
            <div className="flex items-center justify-between gap-2">
                {/* Search input */}
                <div className="relative min-w-[340px] flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
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
                            <X className="h-4 w-4"/>
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
                        <Funnel/>
                        <SelectValue placeholder="Seleccionar columna"/>
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
                            data-active={hasStatusFilter ? "true" : "false"}
                        >
                            <Power className="ml-2 h-4 w-4"/>
                            Estado
                            {hasStatusFilter && <span className="ml-1">*</span>}
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuCheckboxItem
                            key="filter-active"
                            className="capitalize cursor-pointer"
                            checked={activeChecked}
                            onCheckedChange={(checked) => handleStatusFilter(ActiveStatus.active, Boolean(checked))}
                        >
                            Activo
                        </DropdownMenuCheckboxItem>

                        <DropdownMenuCheckboxItem
                            key="filter-inactive"
                            className="capitalize cursor-pointer"
                            checked={inactiveChecked}
                            onCheckedChange={(checked) => handleStatusFilter(ActiveStatus.inactive, Boolean(checked))}
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
                        <BrushCleaning className="h-4 w-4"/>
                        Limpiar filtros
                    </Button>
                )}
            </div>
        </div>
    )
}
