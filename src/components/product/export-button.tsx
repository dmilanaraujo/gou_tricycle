"use client";

import { Button } from "@/components/ui/button";
import {useExportExcel} from '@/hooks/use-export-excel';
import {Download, Loader2} from 'lucide-react';
import {ProductsFilterValues} from '@/lib/schemas/product';
import {useGetProducts} from '@/hooks/api/product';

export default function ExportButton({ filter }: { filter?:  ProductsFilterValues }) {
	const { exportToExcel } = useExportExcel();
	
	const { isLoading, refetch } = useGetProducts({ ...filter, limit: 1000 }, {
		enabled: false
	});
	
	const exportData = async () => {
		const { data: result } = await refetch();
		if (result?.data?.length == 0) return;
		exportToExcel({
			data: result?.data ?? [],
			filename: `Productos-${new Date().getTime()}.xlsx`,
		})
	}
	
	return (
		<Button
			size="sm"
			variant="outline"
			onClick={exportData}
			disabled={isLoading}
			className='cursor-pointer'
		>
			{isLoading ? <Loader2 className='animate-spin'/> : <Download />}
			{isLoading ? "Preparando..." : "Exportar"}
		</Button>
	);
}
