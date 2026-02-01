"use client"

import { Button } from "@/components/ui/button"
import { Trash} from 'lucide-react'
import { toast } from "sonner"

import {formatDateByString, showActionErrors} from '@/lib/utils';
import {ItemActions, ItemContent, ItemDescription, ItemGroup, ItemTitle} from '../ui/item'
import {Item} from '@/components/ui/item';
import {Skeleton} from '@/components/ui/skeleton';
import {useDeleteBusinessDiscounts, useGetBusinessDiscounts} from '@/hooks/api/business';
import {useProfile} from '@/providers/profile-provider';

export function BusinessDiscountList() {
	const profile = useProfile();
	const { data, isLoading } = useGetBusinessDiscounts(profile.id);
	const { mutateAsync: deleteBusinessDiscounts, isPending: isDeletingBusinessDiscount } = useDeleteBusinessDiscounts();
	
	
	const handleDelete = async (id: string) => {
		const toastId = toast.loading("Eliminando descuento...")
		
		try {
			const result = await deleteBusinessDiscounts([id])
			if (!result.success) {
				showActionErrors(result.errors, toastId)
				return;
			}
			toast.success("Descuento eliminada", { id: toastId })
			// onSuccess?.()
		} catch (err) {
			console.error(err)
			toast.error("Error al eliminar la descuento", { id: toastId })
		}
	}
	
	if (isLoading) {
		return <DiscountListSkeleton/>
	}
	
	if (data?.length == 0) {
		return (
			<div className="flex justify-center w-full py-12">
				<div className="space-y-1 text-center">
					<h3 className="text-base font-semibold">No hay descuentos</h3>
					<p className="text-sm text-muted-foreground">
						Aún no has creado ningún descuento.
						Empieza agregando tu primera descuento.
					</p>
				</div>
			</div>
		)
	}
	
	return (
		<ItemGroup className="max-w-sm">
			{data?.map((discount, index) => (
				<Item key={discount.id} variant="outline" className='my-1 py-2'>
					<ItemContent className="gap-1">
						<ItemTitle className='text-green-700'>
							{discount.type == 'fixed' ? `$${discount.value}` : `${discount.value}%`}
						</ItemTitle>
						<ItemDescription className='flex justify-between'>
							<span>
								<span className='font-semibold'>Inicia:</span> {discount.starts_at ? formatDateByString(discount.starts_at) : '-'}
							</span>
							<span>
								<span className='font-semibold'>Termina:</span>  {discount.ends_at ? formatDateByString(discount.ends_at) : '-'}
							</span>
						</ItemDescription>
						
					</ItemContent>
					<ItemActions>
						<Button variant="ghost" size="icon" className="rounded-full cursor-pointer" onClick={() => handleDelete(discount.id)}>
							<Trash />
						</Button>
					</ItemActions>
				</Item>
			))}
		</ItemGroup>
	)
}

function DiscountListSkeleton() {
	return (
		<div className="max-w-sm">
			{[1, 2].map((i) => (
				<Item key={i} className='my-1'>
					<ItemContent className="gap-1">
						<Skeleton className="h-4 w-32" />
					</ItemContent>
					<ItemContent className="gap-1">
						<Skeleton className="h-4 w-32" />
					</ItemContent>
					<ItemActions>
						<Skeleton className="h-5 w-5 rounded-full" />
					</ItemActions>
				</Item>
			))}
		</div>
	)
}
