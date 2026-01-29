"use client";

import {columns} from "@/components/service/columns";
import {DataTableRowSelected} from "@/components/service/data-table-row-selected";
import {DataTable} from "@/components/common/data-table/data-table";
import {useEffect, useState} from 'react';
import {SortingState} from "@tanstack/react-table";
import {ActiveStatus, Service} from '@/types';
import {useDeleteServices, useGetServices} from '@/hooks/api/service';
import {usePathname} from 'next/navigation';
import {useNavigationLoading} from '@/providers/navigation-loading-provider';
import {toast} from 'sonner';
import {DataTableColumnFilters} from '@/components/service/data-table-column-filters';
import {ServicesFilterValues} from '@/lib/schemas/service';
import {showActionErrors} from '@/lib/utils';
import {useServiceStore} from '@/store/service';
import {useProfile} from '@/providers/profile-provider';

export default function ServiceTable() {
	const profile = useProfile()
	const pathname = usePathname()
	const { openForEdit } = useServiceStore()
	const { setIsNavigating } = useNavigationLoading();
	
	const [sorting, setSorting] = useState<SortingState>([]);
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});
	const [filter, setFilter] = useState<ServicesFilterValues>({
		columnId: null,
		value: "",
		business_id: profile.id,
		statusFilters: {
			[ActiveStatus.active]: true,
			[ActiveStatus.inactive]: true,
		}
	});
	
	const { data, isLoading, refetch} = useGetServices({
		...filter,
		page: pagination.pageIndex,
		limit: pagination.pageSize,
		sorting
	}, {
		staleTime: 0
	});
	
	const { mutateAsync: deleteServices } = useDeleteServices()
	
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
	
	const handleDeleteSelected = async (selectedServices: Service[]) => {
		// setIsDeleting(true);
		const toastId = toast.loading('Eliminando servicio(s)')
		try {
			const ids = selectedServices.map(service => service.id!);
			const result = await deleteServices(ids);
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
	
	const handleFilterChange = (filter: ServicesFilterValues) => {
		setFilter(filter);
		setPagination(prev => ({ ...prev, pageIndex: 0 }));
	};
	
	return (
		<DataTable<Service, never, ServicesFilterValues>
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
			// ExportComponent={ExportButton}
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
