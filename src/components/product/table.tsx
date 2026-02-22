"use client";

import {columns} from "@/components/product/columns";
import {DataTableRowSelected} from "@/components/product/data-table-row-selected";
import {DataTable} from "@/components/common/data-table/data-table";
import {useEffect, useState} from 'react';
import {SortingState} from "@tanstack/react-table";
import {ActiveStatus, Product} from '@/types';
import {usePathname} from 'next/navigation';
import {useNavigationLoading} from '@/providers/navigation-loading-provider';
import {toast} from 'sonner';
import {DataTableColumnFilters} from '@/components/product/data-table-column-filters';
import {ProductsFilterValues} from '@/lib/schemas/product';
import {showActionErrors} from '@/lib/utils';
import {useProductStore} from '@/store/product';
import {useGetProducts} from '@/hooks/api/product';
import {useDeleteServices} from '@/hooks/api/service';
import ExportButton from '@/components/product/export-button';
import {useBusiness} from '@/providers/business-provider';

export default function ProductTable() {
	const business = useBusiness()
	const pathname = usePathname()
	const { openForEdit } = useProductStore()
	const { setIsNavigating } = useNavigationLoading();
	
	const [sorting, setSorting] = useState<SortingState>([]);
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});
	const [filter, setFilter] = useState<ProductsFilterValues>({
		columnId: null,
		value: "",
		business_id: business.id,
		statusFilters: {
			[ActiveStatus.active]: true,
			[ActiveStatus.inactive]: true,
		}
	});
	
	const { data, isLoading, refetch} = useGetProducts({
		...filter,
		page: pagination.pageIndex,
		limit: pagination.pageSize,
		sorting
	}, {
		staleTime: 0
	});
	
	const { mutateAsync: deleteProducts } = useDeleteServices()
	
	useEffect(() => {
		setIsNavigating(false)
	}, [pathname])

	const handlePageChange = (pageIndex: number) => {
		setPagination(prev => ({ ...prev, pageIndex }));
	};
	
	const handlePageSizeChange = (pageSize: number) => {
		setPagination(prev => ({ ...prev, pageSize, pageIndex: 0 }));
	};
	
	const handleSortChange = (sorting: SortingState) => {
		setSorting(sorting);
		setPagination(prev => ({ ...prev, pageIndex: 0 }));
	};
	
	const handleDeleteSelected = async (selectedProducts: Product[]) => {
		// setIsDeleting(true);
		const toastId = toast.loading('Eliminando servicio(s)')
		try {
			const ids = selectedProducts.map(product => product.id!);
			const result = await deleteProducts(ids);
			if (!result.success) {
				showActionErrors(result.errors, toastId)
				return;
			}
			toast.success("Servicio(s) eliminado(s) satisfactoriamente.", { id: toastId });
			// Recargar datos
			setPagination(prev => ({ ...prev }));
		} catch (error) {
			console.log(error);
			toast.error('Error', {
				id: toastId,
				description: 'Error eliminando servicio(es).'
			});
		} finally {
			// setIsDeleting(false);
		}
	};
	
	const handleFilterChange = (filter: ProductsFilterValues) => {
		setFilter(filter);
		setPagination(prev => ({ ...prev, pageIndex: 0 }));
	};
	
	return (
		<DataTable<Product, never, ProductsFilterValues>
			columns={columns}
			data={data?.data || []}
			rowCount={data?.pagination?.totalItems || 0}
			loading={isLoading}
			reload={refetch}
			filter={filter}
			onPageChange={handlePageChange}
			onPageSizeChange={handlePageSizeChange}
			onSortChange={handleSortChange}
			onFilterChange={handleFilterChange}
			ColumnFiltersComponent={DataTableColumnFilters}
			ExportComponent={ExportButton}
			RowSelectedActionsComponent={DataTableRowSelected}
			// onRowClick={(row) => openForEdit(row)}
			onDeleteSelected={handleDeleteSelected}
			rowClassName={(item) =>
				!item.is_active ? "bg-gray-100 dark:bg-gray-800 text-gray-400" : ""
			}
			showSelectionActions={true}
		/>
	);
}
