import * as XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";
import {formatDataForExcel, generateTemplate} from '@/lib/excel-utils';
import {ServiceRow} from '@/types';

interface ExportOptions<T> {
	filename?: string;
	data: T[];
}

export function useExportExcel<T>() {
	function exportToExcel({ data, filename = "export.xlsx" }: ExportOptions<T>) {
		if (!data || data.length === 0) return;
		
		const rows = formatDataForExcel(data as ServiceRow[]);
		const wb = generateTemplate(rows)
		// genera buffer
		const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
		
		// descarga
		const blob = new Blob([excelBuffer], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		});
		saveAs(blob, filename);
	}
	
	return { exportToExcel };
}
