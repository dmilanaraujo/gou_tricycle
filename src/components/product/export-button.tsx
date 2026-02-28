"use client";

import { Button } from "@/components/ui/button";
import {useExportExcel} from '@/hooks/use-export-excel';
import {Download, Loader2} from 'lucide-react';
import {ProductsFilterValues} from '@/lib/schemas/product';
import {useGetProducts} from '@/hooks/api/product';
import {useBusiness} from '@/providers/business-provider';
import {format} from 'date-fns';

export default function ExportButton({ filter }: { filter?:  ProductsFilterValues }) {
	const business = useBusiness();
	const { exportToExcel } = useExportExcel();
	
	const { isLoading, refetch } = useGetProducts({ ...filter, limit: 1000 }, {
		enabled: false
	});
	
	const exportData = async () => {
		const { data: result } = await refetch();
		if (result?.data?.length == 0) return;
		const formattedData = result?.data?.map(item => ({
			...item,
			business_category_name: item.category?.name || '',
		}));
		exportToExcel({
			data: formattedData || [],
			filename: `Productos-${business.slug}-${format(new Date(), "yyyyMMdd_HHmm")}.xlsx`,
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
