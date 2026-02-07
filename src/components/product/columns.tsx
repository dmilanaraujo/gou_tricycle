"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Product } from "@/types/business"
import {NotesHoverCard} from '@/components/common/notes-nover-card';
import {Badge} from '@/components/ui/badge';
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip';
import {Button} from '@/components/ui/button';
import Link from 'next/link';

export const columns: ColumnDef<Product>[] = [
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
        accessorKey: 'is_featured',
        header: () => <span className={'flex items-center justify-center'}>Destacado</span>,
        enableColumnFilter: false,
        cell: ({ row }) => {
            const isOnline = row.getValue("is_featured");
            return (
                <span className={'flex items-center justify-center uppercase'}>
                   {isOnline ? 'SI' : 'NO'}
                </span>
            
            );
        },
        meta: {
            headerClassName: 'w-[150px]'
        }
    },
    {
        accessorKey: 'business_category_id',
        header: () => <span className={'flex items-center'}>Categoria</span>,
        cell: ({row}) => {
            const { category } = row.original;
            return (
                <span>
                   {!category ? '-' :  <Badge className={'bg-green-700 text-white'} variant={'outline'}>{category.name}</Badge>}
                </span>
            )
        },
        enableColumnFilter: false,
        meta: {
            headerClassName: 'w-[180px]'
        }
    },
    {
        accessorKey: 'product_discounts_id',
        header: () => <span className={'flex items-center'}>Descuento</span>,
        cell: ({row}) => {
            const { discount } = row.original;
            return (
                <span className={'flex items-center'}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                             {!discount ? '-' :  `${discount.value} (${discount.type})`}
                        </TooltipTrigger>
                        <TooltipContent>
                            {!discount ? 'Sin descuentos' :  `Valor: ${discount.value} / Tipo: ${discount.type} / Inicia: ${discount.starts_at} / Termina: ${discount.ends_at} / Activo: ${discount.is_active ? 'SI' : 'NO'}`}
                        </TooltipContent>
                    </Tooltip>
                </span>
            )
        },
        enableColumnFilter: false,
        meta: {
            headerClassName: 'w-[180px]'
        }
    },
    {
        accessorKey: "price",
        header: () => (
            <div className="flex justify-end font-medium">Precio CUP</div>
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
        accessorKey: "price_usd",
        header: () => (
            <div className="flex justify-end font-medium">Precio USD</div>
        ),
        cell: ({ row }) => (
            <div className="flex justify-end font-medium">
                {row.original.price ? `$${row.original.price_usd}` : "-"}
            </div>
        ),
        meta: {
            headerClassName: "w-[120px]",
        },
    },
    {
        accessorKey: "external_id",
        header: () => (
            <div className="flex justify-center font-medium">Identificador</div>
        ),
        cell: ({ row }) => (
            <span className="flex justify-center font-medium">{row.original.external_id}</span>
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
    {
        accessorKey: "actions",
        header: "",
        cell: ({ row }) => (
            <div className="flex justify-end pe-4">
                <Button asChild size={'sm'} className='bg-green-800'>
                    <Link href={`/me/products/${row.original.id}`}>Editar</Link>
                </Button>
            </div>
        ),
        meta: {
            headerClassName: "w-[50px]",
        },
    }
]
