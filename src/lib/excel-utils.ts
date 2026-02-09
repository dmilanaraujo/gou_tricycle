import * as XLSX from 'xlsx-js-style'
import {type ImportServiceRow, type ProductFormValues, ImportProductSchema, TEMPLATE_COLUMNS, ImportProductValues,} from './schemas/product'
import {formatZodErrors} from '@/lib/utils';

const headerStyle = {
  fill: {
    fgColor: { rgb: "E5FFFF" }  // color fondo
  },
  font: {
    bold: true,
    color: { rgb: "000000" },
    italic: false
  },
  alignment: {
    horizontal: "center",
    vertical: "center"
  },
  border: {
    top: { style: "thin" },
    bottom: { style: "thin" },
    left: { style: "thin" },
    right: { style: "thin" },
  },
  protection: { locked: true }
}

export function generateTemplate(): XLSX.WorkBook {
  const wb = XLSX.utils.book_new()
  
  const headers = TEMPLATE_COLUMNS.map((c) => c.header)
  const descriptions = TEMPLATE_COLUMNS.map((c) => c.description)
  
  const exampleRows = [
    [
      "Corte de cabello",
      "Corte clasico para hombre",
      15,
      5,
      "Servicio",
      // "SI",
      "NO",
      "SVC-001",
    ],
    [
      "Shampoo Premium",
      "Shampoo para cabello seco",
      25,
      8,
      "Producto",
      // "SI",
      "SI",
      "PRD-001",
    ],
  ]
  
  const wsData = [headers, descriptions, ...exampleRows]
  const ws = XLSX.utils.aoa_to_sheet(wsData)
  
  const range = XLSX.utils.decode_range(ws["!ref"]!)

  for (let R = 0; R <= 1; R++) { // filas 0 y 1 (1 y 2 visual)
    for (let C = range.s.c; C <= range.e.c; C++) {
      const cellAddress = XLSX.utils.encode_cell({ r: R, c: C })
      if (!ws[cellAddress]) continue

      const hStyle = headerStyle;
      if (R == 1) {
        hStyle.font = { ...headerStyle.font,  italic: true }
      }
      ws[cellAddress].s = hStyle
    }
  }
  
  // Column widths
  ws["!cols"] = TEMPLATE_COLUMNS.map((c) => ({
    wch: Math.max(c.header.length, c.description.length, 25),
  }))
  
  // Data validations for dropdown selectors (applied from row 3 onwards, skipping header+description rows)
  // item_type column (index 4 = column E)
  // is_active column (index 5 = column F)
  // is_featured column (index 6 = column G)
  // ws["!dataValidations"] = [
  //   {
  //     type: "list",
  //     operator: 0,
  //     sqref: "E3:E1048576",
  //     formulas: ['"Servicio,Producto"'],
  //   },
  //   {
  //     type: "list",
  //     operator: 0,
  //     sqref: "F3:F1048576",
  //     formulas: ['"SI,NO"'],
  //   },
  //   {
  //     type: "list",
  //     operator: 0,
  //     sqref: "G3:G1048576",
  //     formulas: ['"SI,NO"'],
  //   },
  // ]
  
  ws["!dataValidation"] = [
    {
      type: "list",
      allowBlank: false,
      sqref: "E3:E1000",
      formulas: ['"Servicio,Producto"'],
      showDropDown: true,
      promptTitle: "Tipo",
      prompt: "Seleccione Servicio o Producto",
      errorTitle: "Valor inválido",
      error: "Solo se permite Servicio o Producto",
    },
    // is_featured → SI / NO (col F)
    {
      type: "list",
      allowBlank: false,
      sqref: "F3:F1000",
      formulas: ['"SI,NO"'],
      showDropDown: true,
      promptTitle: "Destacado",
      prompt: "Seleccione SI o NO",
    },
  ]

  // ws["!protect"] = {
  //   password: "import-template",
  //   selectLockedCells: false,
  //   selectUnlockedCells: true,
  //   formatCells: false,
  //   formatColumns: false,
  //   formatRows: false,
  //   insertColumns: false,
  //   insertRows: false,
  //   deleteColumns: false,
  //   deleteRows: false,
  //   sort: false,
  //   autoFilter: true,
  //   pivotTables: false,
  // }
  
  XLSX.utils.book_append_sheet(wb, ws, "Productos y Servicios")
  
  return wb
}

export function downloadTemplate() {
  const wb = generateTemplate()
  XLSX.writeFile(wb, "plantilla_productos_servicios.xlsx")
}

export function parseExcelFile(file: File): Promise<ImportServiceRow[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: "array" })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        
        const jsonData = XLSX.utils.sheet_to_json<Record<string, unknown>>(
            worksheet,
            {
              defval: "",
            }
        )
        
        // Skip description row if it matches our template descriptions
        const dataRows = jsonData?.slice(1) || []
        
        const rows: ImportServiceRow[] = dataRows.map((row, index) => {
          const parsed = ImportProductSchema.safeParse({
            name: String(row.name ?? ""),
            description: String(row.description ?? ""),
            price: row.price ?? 0,
            price_usd: row.price_usd ?? 0,
            item_type: mapItemType(row.item_type),
            // is_active: parseBool(row.is_active),
            is_featured: parseBool(row.is_featured),
            sku: String(row.sku ?? ""),
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
          
          const serviceData: ImportProductValues = parsed.success
                                          ? parsed.data
                                          : {
                name: String(row.name ?? ""),
                description: String(row.description ?? ""),
                price: Number(row.price) || 0,
                price_usd: Number(row.price_usd) || 0,
                item_type: mapItemType(row.item_type),
                // is_active: parseBool(row.is_active),
                is_featured: parseBool(row.is_featured),
                sku: String(row.sku ?? ""),
              }
          
          const hasExternalId = serviceData.sku && serviceData.sku.trim() !== ""
          
          return {
            ...serviceData,
            _rowIndex: index,
            _selected: true,
            _status: hasExternalId ? ("update" as const) : ("new" as const),
            _errors: errors,
          }
        })
        
        resolve(rows)
      } catch (error) {
        reject(
            new Error(
                `Error al leer el archivo Excel: ${error instanceof Error ? error.message : "Error desconocido"}`
            )
        )
      }
    }
    
    reader.onerror = () => reject(new Error("Error al leer el archivo"))
    reader.readAsArrayBuffer(file)
  })
}

function mapItemType(value: unknown): "service" | "product" {
  if (typeof value === "string") {
    const lower = value.toLowerCase().trim()
    if (lower === "producto" || lower === "product") return "product"
  }
  return "service"
}

function parseBool(value: unknown): boolean {
  if (typeof value === "boolean") return value
  if (typeof value === "number") return value !== 0
  if (typeof value === "string") {
    const lower = value.toLowerCase().trim()
    return (
        lower === "true" ||
        lower === "1" ||
        lower === "si" ||
        lower === "yes" ||
        lower === "s\u00ed"
    )
  }
  return false
}
