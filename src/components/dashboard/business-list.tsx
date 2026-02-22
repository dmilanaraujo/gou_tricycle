"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { LayoutGrid, List, Plus, Search } from "lucide-react"
import {useDeleteBusiness, useGetMyBusinesses, useUpdateStatusBusiness} from '@/hooks/api/business';
import {BusinessCard} from '@/components/dashboard/business-card';
import Link from 'next/link';
import {Skeleton} from '@/components/ui/skeleton';
import {Business} from '@/types';
import {toast} from 'sonner';
import {showActionErrors} from '@/lib/utils';
import {useConfirm} from '@/components/common/confirm-dialog-provider';

type ViewMode = "grid" | "list"
type StatusFilter = "all" | "active" | "inactive"

export function BusinessList() {
	const [search, setSearch] = useState("")
	const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
	const [viewMode, setViewMode] = useState<ViewMode>("grid")
	const confirm = useConfirm();
	const { data, isLoading } = useGetMyBusinesses();
	const { mutateAsync: deleteBusiness, isPending: isPendingDeleting } = useDeleteBusiness();
	const { mutateAsync: updateStatusBusiness, isPending: isPendingUpdateStatus } = useUpdateStatusBusiness();
	
	const filtered = useMemo(() => {
		return data?.data?.filter((b) => {
			const matchesSearch =
				search === "" ||
				b.name.toLowerCase().includes(search.toLowerCase()) ||
				b.slug.toLowerCase().includes(search.toLowerCase())
			const matchesStatus =
				statusFilter === "all" ||
				(statusFilter === "active" && b.is_active) ||
				(statusFilter === "inactive" && !b.is_active)
			return matchesSearch && matchesStatus
		})
	}, [data, search, statusFilter])
	
	const handleDelete = async (item: Business) => {
		let toastId;
		try {
			const prompt = await confirm({
				dialogTitle: 'Eliminar el negocio?',
				description: 'La eliminación es irreversible. También se eliminarán todos los datos asociados al negocio como imágenes, productos y servicios.'
			});
			if (!prompt) return;
			toastId = toast.loading('Eliminando negocio')
			const result = await deleteBusiness(item.id);
			if (!result.success) {
				showActionErrors(result.errors, toastId)
				return;
			}
			toast.success("Negocio eliminado satisfactoriamente.", { id: toastId });
		} catch (error) {
			console.log(error);
			toast.error('Error', {
				id: toastId,
				description: 'Error eliminando negocio.'
			});
		}
	};
	
	const handleUpdateStatus = async (item: Business) => {
		let toastId;
		try {
			const prompt = await confirm({
				dialogTitle: 'Confirme',
				description: 'Desea desactivar el negocio?.'
			});
			if (!prompt) return;
			toastId = toast.loading('Actualizando estado del negocio')
			const result = await updateStatusBusiness({
				businessId: item.id,
				active: false
			});
			if (!result.success) {
				showActionErrors(result.errors, toastId)
				return;
			}
			toast.success("Estado actualizado satisfactoriamente.", { id: toastId });
		} catch (error) {
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
						<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							placeholder="Buscar un negocio"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="pl-9"
						/>
					</div>
					<Select
						value={statusFilter}
						onValueChange={(val) => setStatusFilter(val as StatusFilter)}
					>
						<SelectTrigger className="w-[130px]">
							<SelectValue placeholder="Estado" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">Todos</SelectItem>
							<SelectItem value="active">Activos</SelectItem>
							<SelectItem value="inactive">Inactivos</SelectItem>
						</SelectContent>
					</Select>
				</div>
				
				<div className="flex items-center gap-2 justify-end mt-2 md:mt-0">
					<div className="hidden md:flex items-center rounded-md border border-border">
						<Button
							variant={viewMode === "grid" ? "secondary" : "ghost"}
							size="icon-sm"
							onClick={() => setViewMode("grid")}
							className="rounded-r-none"
							aria-label="Vista de grilla"
						>
							<LayoutGrid className="size-4" />
						</Button>
						<Button
							variant={viewMode === "list" ? "secondary" : "ghost"}
							size="icon-sm"
							onClick={() => setViewMode("list")}
							className="rounded-l-none"
							aria-label="Vista de lista"
						>
							<List className="size-4" />
						</Button>
					</div>
					<Button className="cursor-pointer" asChild>
						<Link href='/me/create'>
							<Plus className="size-4" />
							Nuevo negocio
						</Link>
					</Button>
				</div>
			</div>
			
			{/* Grid / List */}
			{isLoading ? (
				viewMode === "grid" ? (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{Array.from({ length: 3 }).map((_, i) => (
							<BusinessCardSkeleton key={i} />
						))}
					</div>
				) : (
					<div className="flex flex-col gap-3">
						{Array.from({ length: 3 }).map((_, i) => (
							<BusinessCardSkeleton key={i} />
						))}
					</div>
				)
			) : filtered?.length === 0 ? (
				<div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
					<p className="text-sm text-muted-foreground">
						No se encontraron negocios
					</p>
				</div>
			) : viewMode === "grid" ? (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
					{filtered?.map((business) => (
						<BusinessCard key={business.id} business={business} onDelete={handleDelete} onDisable={handleUpdateStatus}/>
					))}
				</div>
			) : (
				    <div className="flex flex-col gap-3 w-full">
					    {filtered?.map((business) => (
						    <BusinessCard key={business.id} business={business}  onDelete={handleDelete} onDisable={handleUpdateStatus}/>
					    ))}
				    </div>
			    )}
		</div>
	)
}


function BusinessCardSkeleton() {
	return (
		<div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-5">
			{/* Header */}
			<div className="flex items-start justify-between gap-2">
				<div className="flex items-center gap-3">
					<Skeleton className="size-8 rounded-md" />
					<div className="flex flex-col gap-1.5">
						<Skeleton className="h-3.5 w-32" />
						<Skeleton className="h-3 w-24" />
					</div>
				</div>
				<Skeleton className="size-6 rounded-md" />
			</div>
			
			{/* Badges */}
			<div className="flex flex-wrap items-center gap-1.5">
				<Skeleton className="h-5 w-14 rounded-full" />
				<Skeleton className="h-5 w-18 rounded-full" />
				<Skeleton className="h-5 w-16 rounded-full" />
			</div>
			
			{/* Bottom line */}
			<Skeleton className="h-3 w-36" />
		</div>
	)
}
