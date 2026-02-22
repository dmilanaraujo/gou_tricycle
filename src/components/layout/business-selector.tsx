"use client"

import {useState} from 'react'
import { usePathname } from "next/navigation"
import {useProfile} from '@/providers/profile-provider';
import {Button} from '@/components/ui/button';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger} from '../ui/dropdown-menu';
import {SidebarMenuButton, useSidebar} from '@/components/ui/sidebar';
import {ChevronsUpDown, Plus} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {cn, getInitials, getPublicBusinessImageUrl} from '@/lib/utils';
import {BasicBusiness} from '@/types';
import {useLoadingRouter} from '@/providers/navigation-loading-provider';
import {useBusiness} from '@/providers/business-provider';

export function BusinessSelector() {
	const router = useLoadingRouter();
	const pathname = usePathname()
	const { isMobile } = useSidebar()
	const { businesses} = useProfile()
	const business = useBusiness();
	
	const [activeBusiness, setActiveBusiness] = useState<BasicBusiness>(business)
	
	// const businessId = params.businessId as string | undefined
	
	// 🔹 Auto seleccionar primer negocio si no existe en la URL
	// useEffect(() => {
	// 	if (!businessId && businesses.length > 0) {
	// 		router.replace(`/me/${businesses[0].id}`)
	// 	}
	// }, [businessId, businesses, router])
	
	if (!businesses.length) {
		return (
			<SidebarMenuButton size="lg" asChild>
				<Button variant='outline' className='cursor-pointer'>
					<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
						<Plus className="size-4" />
					</div>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-medium" onClick={() => router.push('/me/create') }>Crear su primer negocio</span>
						{/*<span className="truncate text-xs">Enterprise</span>*/}
					</div>
				</Button>
			</SidebarMenuButton>
		)
	}
	
	const handleChange = (selectedBusiness: BasicBusiness) => {
		if (!selectedBusiness.is_active) return false;
		
		const { slug } = selectedBusiness;
		
		setActiveBusiness(selectedBusiness);
		const segments = pathname.split("/").filter(Boolean)
		const subPath = segments.slice(2).join("/")
		
		const newPath = subPath ? `/me/${slug}/${subPath}` : `/me/${slug}`
		
		router.push(newPath)
	}
	
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
						<Avatar className="size-4 rounded-lg">
							<AvatarImage src={getPublicBusinessImageUrl(activeBusiness.logo)} alt={activeBusiness.name} />
							<AvatarFallback className="rounded-lg">{getInitials(activeBusiness.name)}</AvatarFallback>
						</Avatar>
					</div>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-medium">{activeBusiness.name}</span>
						{/*<span className="truncate text-xs">{activeBusiness.plan}</span>*/}
					</div>
					<ChevronsUpDown className="ml-auto" />
				</SidebarMenuButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
				align="start"
				side={isMobile ? "bottom" : "right"}
				sideOffset={4}
			>
				<DropdownMenuLabel className="text-muted-foreground text-xs">
					Negocios
				</DropdownMenuLabel>
				{businesses.map((item, index) => (
					<DropdownMenuItem
						key={item.name}
						onClick={() => handleChange(item)}
						className={cn('gap-2 p-2', !item.is_active ? 'text-gray-300' : 'cursor-pointer')}
						title={!item.is_active ? 'Desabilitado' : ''}
					>
						{/*<div className="flex size-6 items-center justify-center rounded-md border">*/}
						{/*	<team.logo className="size-3.5 shrink-0" />*/}
						{/*</div>*/}
						{item.name}
						{/*<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>*/}
					</DropdownMenuItem>
				))}
				<DropdownMenuSeparator />
				<DropdownMenuItem className="gap-2 p-2">
					<div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
						<Plus className="size-4" />
					</div>
					<div className="text-muted-foreground font-medium" onClick={() => router.push('/me/create') }>Crear negocio</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
