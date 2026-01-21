"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Service } from "@/types/business"
import {NotesHoverCard} from '@/components/common/notes-nover-card';

export const columns: ColumnDef<Service>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
        meta: {
            headerClassName: "w-[15px]",
        },
    },
    
    {
        accessorKey: "name",
        header: "Nombre",
        cell: ({ row }) => (
            <span className="font-medium">{row.original.name}</span>
        ),
        meta: {
            headerClassName: "w-[250px]",
        },
    },
    
    {
        accessorKey: "price",
        header: () => (
            <div className="flex justify-end font-medium">Precio</div>
        ),
        cell: ({ row }) => (
            <div className="flex justify-end font-medium">
                {row.original.price ? `$${row.original.price}` : "-"}
            </div>
        ),
        meta: {
            headerClassName: "w-[120px]",
        },
    },
    {
        accessorKey: "description",
        header: "",
        cell: ({ row }) => (
            <div className="flex justify-end font-medium">
                {!!row.original.description ? <NotesHoverCard content={row.original.description} title={'Descripción'}/> : ''}
            </div>
        ),
        meta: {
            headerClassName: 'w-[50px]'
        }
    },
    // {
    //     accessorKey: "description",
    //     header: "Descripción",
    //     cell: ({ row }) => (
    //       <span className="text-muted-foreground">
    //         {row.original.description || "-"}
    //       </span>
    //     ),
    //     meta: {
    //         headerClassName: "truncate",
    //     },
    // }
]
