'use client'

import * as React from 'react'
import {useMemo, useState} from 'react'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {Plus, Power, Search} from 'lucide-react'
import {useDeleteBusiness, useInfinityBusinesses, useUpdateStatusBusiness} from '@/hooks/api/business';
import {BusinessCard} from '@/components/dashboard/business-card';
import Link from 'next/link';
import {Skeleton} from '@/components/ui/skeleton';
import {ActiveStatus, Business} from '@/types';
import {toast} from 'sonner';
import {cn, groupBusinessesByProfiles, showActionErrors} from '@/lib/utils';
import {useConfirm} from '@/components/common/confirm-dialog-provider';
import {DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {Separator} from '@/components/ui/separator';
import {ProfileSelector} from '@/components/common/profile-selector';
import {Label} from '@/components/ui/label';
import {Switch} from '@/components/ui/switch';
import {BusinessFiltersValues} from '@/lib/schemas/business';


export function BusinessListAdmin() {
	const confirm = useConfirm();
	const [groupByUser, setGroupByUser] = useState(false)
	const [filter, setFilter] = useState<BusinessFiltersValues>({
		profile_id: '',
		name: '',
		only_logged_user: false,
		statusFilters: {
			active: true,
			inactive: true
		},
	})
	
	const activeChecked = useMemo(() => {
		return filter.statusFilters?.active ?? true;
	}, [filter.statusFilters?.active]);
	
	const inactiveChecked = useMemo(() => {
		return filter.statusFilters?.inactive ?? true;
	}, [filter.statusFilters?.inactive]);
	
	const hasStatusFilter = useMemo(() => {
		return !(activeChecked && inactiveChecked);
	}, [filter.statusFilters]);
	
	const handleStatusFilter = (status: ActiveStatus, checked: boolean) => {
		const newStatusFilters = {
			...filter.statusFilters,
			[status]: checked
		};
		setFilter({
			...filter,
			statusFilters: newStatusFilters
		});
	};
	
	const setFilters = (fieldName: keyof BusinessFiltersValues, fieldValue: any) => {
		setFilter({
			...filter,
			[fieldName]: fieldValue
		});
	}
	
	const { data, isLoading } = useInfinityBusinesses({...filter, limit: 50})
	const {mutateAsync: deleteBusiness, isPending: isPendingDeleting} = useDeleteBusiness();
	const {mutateAsync: updateStatusBusiness, isPending: isPendingUpdateStatus} = useUpdateStatusBusiness();
	
	const businesses = useMemo(() => {
		return data?.pages.flatMap(p => p.data || []) || []
	}, [data])
	
	const groupedBusinesses  = useMemo(() => {
		return groupBusinessesByProfiles(businesses)
	}, [businesses])
	
	const handleDelete = async (item: Business) => {
		let toastId;
		try {
			const prompt = await confirm({
				dialogTitle: 'Eliminar el negocio?',
				description: 'La eliminación es irreversible. También se eliminarán todos los datos asociados al negocio como imágenes, productos y servicios.'
			});
			if (!prompt) {
				return;
			}
			toastId = toast.loading('Eliminando negocio')
			const result = await deleteBusiness(item.id);
			if (!result.success) {
				showActionErrors(result.errors, toastId)
				return;
			}
			toast.success('Negocio eliminado satisfactoriamente.', {id: toastId});
		}
		catch (error) {
			console.log(error);
			toast.error('Error', {
				id: toastId,
				description: 'Error eliminando negocio.'
			});
		}
	};
	
	const handleUpdateStatus = async (item: Business, status: boolean) => {
		let toastId;
		try {
			const prompt = await confirm({
				dialogTitle: 'Confirme',
				description: `Desea ${status ? 'activar' : 'desactivar'} el negocio?.`
			});
			if (!prompt) {
				return;
			}
			toastId = toast.loading('Actualizando estado del negocio')
			const result = await updateStatusBusiness({
				businessId: item.id,
				active: status
			});
			if (!result.success) {
				showActionErrors(result.errors, toastId)
				return;
			}
			toast.success('Estado actualizado satisfactoriamente.', {id: toastId});
		}
		catch (error) {
			console.log(error);
			toast.error('Error', {
				id: toastId,
				description: 'Error actualizando estado del negocio.'
			});
		}
	};
	
	
	return (
		<div className="flex flex-col gap-6 w-full">
			{/* Toolbar */}
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex flex-1 items-center gap-3">
					<div className="relative max-w-xs flex-1">
						<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"/>
						<Input
							placeholder="Buscar un negocio"
							value={filter.name || ''}
							onChange={(e) => setFilters('name', e.target.value)}
							className="pl-9"
						/>
					</div>
					{/*<ProfileSelector*/}
					{/*	value={filter.profile_id || ''}*/}
					{/*	onChange={(value) => setFilters('profile_id', value)}*/}
					{/*	defaultSelectAuthUser={false}*/}
					{/*	placeholder="Filter por usuario"*/}
					{/*	showClear={true}*/}
					{/*/>*/}

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								size="sm"
								className="border-dashed"
								data-active={hasStatusFilter ? 'true' : 'false'}
							>
								<Power className="ml-2 h-4 w-4"/>
								Estado
								{hasStatusFilter && <span className="ml-1">*</span>}
							</Button>
						</DropdownMenuTrigger>
						
						<DropdownMenuContent align="end">
							<DropdownMenuCheckboxItem
								key="filter-active"
								className="capitalize cursor-pointer"
								checked={activeChecked}
								onCheckedChange={(checked) => handleStatusFilter(ActiveStatus.active, Boolean(checked))}
							>
								Activo
							</DropdownMenuCheckboxItem>
							
							<DropdownMenuCheckboxItem
								key="filter-inactive"
								className="capitalize cursor-pointer"
								checked={inactiveChecked}
								onCheckedChange={(checked) => handleStatusFilter(ActiveStatus.inactive, Boolean(checked))}
							>
								Inactivo
							</DropdownMenuCheckboxItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<div className="flex items-center gap-2">
						<Label>
							Agrupar por usuario
						</Label>
						<Switch
							checked={groupByUser}
							onCheckedChange={setGroupByUser}
						/>
					</div>
				</div>
				
				<div className="flex items-center gap-2 justify-end mt-2 md:mt-0">
					<Button className="cursor-pointer" asChild>
						<Link href="/me/create">
							<Plus className="size-4"/>
							Nuevo negocio
						</Link>
					</Button>
				</div>
			</div>
			
			{/* Grid / List */}
			{isLoading ? (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{Array.from({length: 3}).map((_, i) => (
						<BusinessCardSkeleton key={i}/>
					))}
				</div>
			) : businesses?.length === 0 ? (
				<div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
					<p className="text-sm text-muted-foreground">
						No se encontraron negocios
					</p>
				</div>
			) :  (
				<div className="grid grid-cols-1 gap-4 w-full">
					{groupByUser && (
						Object.entries(groupedBusinesses).map(([profileId, { profile, businesses }]) => (
							<div key={profileId} className='pb-2'>
								<div className="font-semibold flex gap-3 items-center">
									{!!profile.name && (
										<span className='text-gray-800'>
											{profile.name}
										</span>
									)}
									<span className={cn(!!profile.name ? 'text-gray-500 text-sm' : '')}>
									{profile.phone || profile.email}
								</span>
								</div>
								<Separator className="mt-2 mb-3"/>
								<BusinessesRow businesses={businesses} onDelete={handleDelete} onUpdateStatus={handleUpdateStatus}/>
							</div>
						))
					)}
					{!groupByUser && (
						<BusinessesRow businesses={businesses} onDelete={handleDelete} onUpdateStatus={handleUpdateStatus} showUsernames={true}/>
					)}
				</div>
			)}
		</div>
	)
}

function BusinessesRow({ businesses, onDelete, onUpdateStatus, showUsernames }: {
	businesses: Business[],
	onDelete?: (business: Business) => void,
	onUpdateStatus?: (business: Business, status: boolean) => void
	showUsernames?: boolean
}) {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
			{businesses.length == 0 && (
				<div className="flex w-full text-sm">
					No se encontraron negocios
				</div>
			)}
			{businesses?.map((business) => (
				<BusinessCard
					key={business.id}
					business={business}
					onDelete={onDelete}
					onEnable={(item) => onUpdateStatus?.(item, true)}
					onDisable={(item) => onUpdateStatus?.(item, false)}
					showUsernames={showUsernames}
				/>
			))}
		</div>
	)
}

function BusinessCardSkeleton() {
	return (
		<div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-5">
			{/* Header */}
			<div className="flex items-start justify-between gap-2">
				<div className="flex items-center gap-3">
					<Skeleton className="size-8 rounded-md"/>
					<div className="flex flex-col gap-1.5">
						<Skeleton className="h-3.5 w-32"/>
						<Skeleton className="h-3 w-24"/>
					</div>
				</div>
				<Skeleton className="size-6 rounded-md"/>
			</div>
			
			{/* Badges */}
			<div className="flex flex-wrap items-center gap-1.5">
				<Skeleton className="h-5 w-14 rounded-full"/>
				<Skeleton className="h-5 w-18 rounded-full"/>
				<Skeleton className="h-5 w-16 rounded-full"/>
			</div>
			
			{/* Bottom line */}
			<Skeleton className="h-3 w-36"/>
		</div>
	)
}
