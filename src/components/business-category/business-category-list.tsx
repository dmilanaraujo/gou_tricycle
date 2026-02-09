"use client"

import { Button } from "@/components/ui/button"
import { Trash} from 'lucide-react'
import { toast } from "sonner"

import {showActionErrors} from '@/lib/utils';
import {useDeleteBusinessCategories, useGetBusinessCategories} from '@/hooks/api/business';
import {ItemActions, ItemContent, ItemGroup, ItemMedia, ItemTitle} from '../ui/item'
import {Item} from '@/components/ui/item';
import {DynamicIcon} from 'lucide-react/dynamic';
import {Skeleton} from '@/components/ui/skeleton';
import {useProfile} from '@/providers/profile-provider';
import {useConfirm} from '@/components/common/confirm-dialog-provider';

export function BusinessCategoryList() {
	const profile = useProfile();
	const { data, isLoading } = useGetBusinessCategories(profile.id);
	const { mutateAsync: deleteBusinessCategories, isPending: isDeletingBusinessCategory } = useDeleteBusinessCategories();
	const confirm = useConfirm();
	
	const handleDelete = async (id: string) => {
		let toastId;
		try {
			const prompt = await confirm({
				dialogTitle: 'Confirme',
				description: 'Desea eliminar la categoría?'
			})
			if (!prompt) return;
			
			toastId = toast.loading("Eliminando categoria...")
			const result = await deleteBusinessCategories([id])
			if (!result.success) {
				showActionErrors(result.errors, toastId)
				return;
			}
			toast.success("Categoria eliminada", { id: toastId })
		} catch (err) {
			console.error(err)
			toast.error("Error al eliminar la categoria", { id: toastId })
		}
	}
	
	if (isLoading) {
		return <CategoryListSkeleton/>
	}
	
	if (data?.length == 0) {
		return (
			<div className="flex justify-center w-full py-12">
				<div className="space-y-1 text-center">
					<h3 className="text-base font-semibold">No hay categorías</h3>
					<p className="text-sm text-muted-foreground">
						Aún no has creado ninguna categoría.
						Empieza agregando tu primera categoría.
					</p>
				</div>
			</div>
		)
	}
	
	return (
		<ItemGroup className="max-w-sm">
			{data?.map((category, index) => (
				<Item key={category.id} variant="outline" className='my-1 py-2'>
					<ItemMedia variant="image">
						{category.icon && <DynamicIcon name={category.icon}/>}
					</ItemMedia>
					<ItemContent className="gap-1">
						<ItemTitle>{category.name}</ItemTitle>
						{/*<ItemDescription>{person.email}</ItemDescription>*/}
					</ItemContent>
					<ItemActions>
						<Button variant="ghost" size="icon" className="rounded-full cursor-pointer" onClick={() => handleDelete(category.id)}>
							<Trash />
						</Button>
					</ItemActions>
				</Item>
			))}
		</ItemGroup>
	)
}

function CategoryListSkeleton() {
	return (
		<div className="max-w-sm">
			{[1, 2].map((i) => (
				<Item key={i} className='my-1'>
					<Skeleton className="h-6 w-6 rounded-md" />
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
