"use client"

import { useState, useCallback } from "react"
import { downloadTemplate } from "@/lib/excel-utils"
import { type ImportServiceRow } from "@/lib/schemas/product"
import { parseExcelFile } from "@/lib/excel-utils"
import { FileUploadZone } from "@/components/import/file-upload-zone"
import { ImportDrawer } from "@/components/import/import-drawer"
import { Button } from "@/components/ui/button"
import { Download, FileSpreadsheet } from "lucide-react"
import {toast} from 'sonner';

export default function Import() {
  const [rows, setRows] = useState<ImportServiceRow[]>([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = useCallback(async (file: File) => {
    setIsLoading(true)
    setError(null)
    try {
      const parsed = await parseExcelFile(file)
      if (parsed.length === 0) {
        setError("El archivo no contiene datos para importar.")
        return
      }
      setRows(parsed)
      setDrawerOpen(true)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al procesar el archivo"
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleImportComplete = useCallback(() => {
    setDrawerOpen(false)
    setRows([])
    toast.success("Los productos y servicios han sido importados.")
  }, [])

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Importar productos y servicios
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Descarga la plantilla, completala con tus productos y servicios, y
            luego sube el archivo para importarlos.
          </p>
        </div>

        <div className="mb-6 flex items-center gap-3 rounded-lg border border-border bg-card p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
            <FileSpreadsheet className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              Paso 1: Descarga la plantilla
            </p>
            <p className="text-xs text-muted-foreground">
              Usa esta plantilla Excel para llenar la informacion de tus
              productos y servicios.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={downloadTemplate} className={'cursor-pointer'}>
            <Download className="h-4 w-4" />
            Descargar plantilla
          </Button>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <p className="mb-3 text-sm font-medium text-foreground">
            Paso 2: Sube tu archivo completado
          </p>
          <FileUploadZone onFileSelect={handleFileSelect} isLoading={isLoading} />
          {error && (
            <p className="mt-3 text-sm text-destructive">{error}</p>
          )}
        </div>
      </div>

      <ImportDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        initialRows={rows}
        onImportComplete={handleImportComplete}
      />
    </>
  )
}
