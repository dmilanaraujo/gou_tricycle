"use client"

import { useState, useCallback, useMemo } from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { EditableCell } from "@/components/import/editable-cell"
import { type ImportServiceRow, ProductSchema } from "@/lib/schemas/product"
import { Loader2, Upload, AlertCircle } from "lucide-react"
import {formatZodErrors} from '@/lib/utils';
import {useImportServices} from '@/hooks/api/service';

interface ImportDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialRows: ImportServiceRow[]
  onImportComplete: () => void
}

export function ImportDrawer({
  open,
  onOpenChange,
  initialRows,
  onImportComplete,
}: ImportDrawerProps) {
  const [rows, setRows] = useState<ImportServiceRow[]>(initialRows)
  const [isImporting, setIsImporting] = useState(false)
  const [importResult, setImportResult] = useState<{
    created: number
    updated: number
    errors?: string[]
  } | null>(null)
  
  const { mutateAsync: importServices, isPending: isPendingImport } = useImportServices();

  // Reset rows when drawer opens with new data
  useState(() => {
    setRows(initialRows)
  })

  // Keep rows in sync with initialRows
  useMemo(() => {
    if (initialRows.length > 0) {
      setRows(initialRows)
      setImportResult(null)
    }
  }, [initialRows])

  const updateRow = useCallback(
    (rowIndex: number, field: keyof ImportServiceRow, value: unknown) => {
      setRows((prev) =>
        prev.map((row) => {
          if (row._rowIndex !== rowIndex) return row

          const updated = { ...row, [field]: value }

          // Revalidate
          const parsed = ProductSchema.safeParse({
            name: updated.name,
            description: updated.description,
            price: updated.price,
            price_usd: updated.price_usd,
            item_type: updated.item_type,
            // is_active: updated.is_active,
            is_featured: updated.is_featured,
            sku: updated.sku,
          })

          const errors: Record<string, string> = {}
          if (!parsed.success) {
            const errs = formatZodErrors(parsed.error);
            for (const err of errs) {
              const paths = err.path?.filter(p => !!p).map(p => p.toString()) || [];
              if (paths.length > 0) {
                errors[paths.join(".")] = err.message
              }
            }
          }

          updated._errors = errors

          // Recalculate status
          if (field === "sku") {
            updated._status = String(value).trim() !== "" ? "update" : "new"
          }

          return updated
        })
      )
    },
    []
  )

  const toggleSelect = useCallback((rowIndex: number) => {
    setRows((prev) =>
      prev.map((row) =>
        row._rowIndex === rowIndex ? { ...row, _selected: !row._selected } : row
      )
    )
  }, [])

  const toggleSelectAll = useCallback((checked: boolean) => {
    setRows((prev) => prev.map((row) => ({ ...row, _selected: checked })))
  }, [])

  const selectedRows = useMemo(
    () => rows.filter((r) => r._selected),
    [rows]
  )
  const hasErrors = useMemo(
    () =>
      selectedRows.some((r) => Object.keys(r._errors).length > 0),
    [selectedRows]
  )

  const newCount = useMemo(
    () => selectedRows.filter((r) => r._status === "new").length,
    [selectedRows]
  )
  const updateCount = useMemo(
    () => selectedRows.filter((r) => r._status === "update").length,
    [selectedRows]
  )

  const allSelected = rows.length > 0 && rows.every((r) => r._selected)
  const someSelected = rows.some((r) => r._selected) && !allSelected

  const handleImport = useCallback(async () => {
    if (hasErrors || selectedRows.length === 0) return
    setIsImporting(true)
    try {
      const services = selectedRows.map((r) => ({
        name: r.name,
        description: r.description,
        price: r.price,
        price_usd: r.price_usd,
        item_type: r.item_type,
        // is_active: r.is_active,
        is_featured: r.is_featured,
        sku: r.sku || '',
      }))

      const result = await importServices({ services });

      setImportResult({
        created: result.created,
        updated: result.updated,
        errors: result.errors,
      })

      if (!result.errors || result.errors.length === 0) {
        setTimeout(() => {
          onImportComplete()
        }, 2000)
      }
    } catch (err) {
      console.error("Import error:", err)
    } finally {
      setIsImporting(false)
    }
  }, [hasErrors, selectedRows, onImportComplete])

  const columns = useMemo<ColumnDef<ImportServiceRow>[]>(
    () => [
      {
        id: "select",
        header: () => (
          <Checkbox
            checked={allSelected}
            {...(someSelected ? { "data-state": "indeterminate" } : {})}
            onCheckedChange={(checked) => toggleSelectAll(!!checked)}
            aria-label="Seleccionar todos"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.original._selected}
            onCheckedChange={() => toggleSelect(row.original._rowIndex)}
            aria-label={`Seleccionar fila ${row.original._rowIndex + 1}`}
          />
        ),
        size: 40,
      },
      {
        id: "status",
        header: "Estado",
        cell: ({ row }) => (
          <Badge
            variant={
              row.original._status === "update" ? "default" : "secondary"
            }
            className="text-[10px]"
          >
            {row.original._status === "update" ? "Actualizar" : "Nuevo"}
          </Badge>
        ),
        size: 90,
      },
      {
        accessorKey: "name",
        header: "Nombre",
        cell: ({ row }) => (
          <EditableCell
            value={row.original.name}
            onChange={(v) =>
              updateRow(row.original._rowIndex, "name", v)
            }
            type="text"
            error={row.original._errors.name}
          />
        ),
        size: 180,
      },
      {
        accessorKey: "description",
        header: "Descripcion",
        cell: ({ row }) => (
          <EditableCell
            value={row.original.description || ''}
            onChange={(v) =>
              updateRow(row.original._rowIndex, "description", v)
            }
            type="text"
            error={row.original._errors.description}
          />
        ),
        size: 200,
      },
      {
        accessorKey: "price",
        header: "Precio",
        cell: ({ row }) => (
          <EditableCell
            value={row.original.price || ''}
            onChange={(v) =>
              updateRow(row.original._rowIndex, "price", v)
            }
            type="number"
            error={row.original._errors.price}
          />
        ),
        size: 100,
      },
      {
        accessorKey: "price_usd",
        header: "Precio USD",
        cell: ({ row }) => (
          <EditableCell
            value={row.original.price_usd || ''}
            onChange={(v) =>
              updateRow(row.original._rowIndex, "price_usd", v)
            }
            type="number"
            error={row.original._errors.price_usd}
          />
        ),
        size: 100,
      },
      {
        accessorKey: "item_type",
        header: "Tipo",
        cell: ({ row }) => (
          <EditableCell
            value={row.original.item_type}
            onChange={(v) =>
              updateRow(row.original._rowIndex, "item_type", v)
            }
            type="item_type"
            error={row.original._errors.item_type}
          />
        ),
        size: 120,
      },
      // {
      //   accessorKey: "is_active",
      //   header: "Activo",
      //   cell: ({ row }) => (
      //     <EditableCell
      //       value={row.original.is_active}
      //       onChange={(v) =>
      //         updateRow(row.original._rowIndex, "is_active", v)
      //       }
      //       type="boolean"
      //     />
      //   ),
      //   size: 70,
      // },
      {
        accessorKey: "is_featured",
        header: "Destacado",
        cell: ({ row }) => (
          <EditableCell
            value={row.original.is_featured || false}
            onChange={(v) =>
              updateRow(row.original._rowIndex, "is_featured", v)
            }
            type="boolean"
          />
        ),
        size: 80,
      },
      {
        accessorKey: "sku",
        header: "External ID",
        cell: ({ row }) => (
          <EditableCell
            value={row.original.sku || ''}
            onChange={(v) =>
              updateRow(row.original._rowIndex, "sku", v)
            }
            type="text"
            error={row.original._errors.sku}
          />
        ),
        size: 140,
      },
    ],
    [allSelected, someSelected, toggleSelectAll, toggleSelect, updateRow]
  )

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => String(row._rowIndex),
  })

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="border-b border-border pb-4">
          <DrawerTitle>Revisar e importar productos y servicios</DrawerTitle>
          <DrawerDescription>
            {rows.length} producto(s) y servicio(s) encontrado(s) en el archivo.
            Selecciona los que deseas importar y edita los campos si es
            necesario.
          </DrawerDescription>
          <div className="mt-2 flex items-center gap-3">
            <Badge variant="secondary" className="text-xs">
              {selectedRows.length} seleccionado(s)
            </Badge>
            {newCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {newCount} nuevo(s)
              </Badge>
            )}
            {updateCount > 0 && (
              <Badge className="text-xs">
                {updateCount} a actualizar
              </Badge>
            )}
            {hasErrors && (
              <div className="flex items-center gap-1 text-xs text-destructive">
                <AlertCircle className="h-3 w-3" />
                Hay errores en las filas seleccionadas
              </div>
            )}
          </div>
        </DrawerHeader>

        <ScrollArea className="flex-1 overflow-auto">
          <div className="min-w-[1100px]">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        style={{ width: header.getSize() }}
                        className="text-xs"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No se encontraron servicios en el archivo.
                    </TableCell>
                  </TableRow>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.original._selected ? "selected" : undefined}
                      className={
                        Object.keys(row.original._errors).length > 0
                          ? "bg-destructive/5"
                          : undefined
                      }
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          style={{ width: cell.column.getSize() }}
                          className="py-2"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <DrawerFooter className="border-t border-border">
          {importResult ? (
            <div className="space-y-2 text-center text-sm">
              <p className="text-foreground">
                Importacion completada: {importResult.created} creado(s),{" "}
                {importResult.updated} actualizado(s).
              </p>
              {importResult.errors && importResult.errors.length > 0 && (
                <div className="rounded-md bg-destructive/10 p-3 text-left">
                  <p className="mb-1 text-xs font-medium text-destructive">
                    Errores encontrados:
                  </p>
                  {importResult.errors.map((err) => (
                    <p key={err} className="text-xs text-destructive">
                      {err}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between md:justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isImporting}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleImport}
                disabled={
                  isImporting ||
                  selectedRows.length === 0 ||
                  hasErrors
                }
              >
                {isImporting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Importando...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Importar ({selectedRows.length})
                  </>
                )}
              </Button>
            </div>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
