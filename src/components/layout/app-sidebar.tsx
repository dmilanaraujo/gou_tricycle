"use client"

import * as React from "react"
import { LayoutDashboard, Settings, Grid, ListOrdered, CloudUpload } from 'lucide-react'

import { NavUser } from "@/components/auth/nav-user"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem, SidebarRail,
	useSidebar,
} from '@/components/ui/sidebar'
import {useBusinesses, useProfile} from '@/providers/profile-provider';
import {BusinessSelector} from '@/components/layout/business-selector';
import {useMemo} from 'react';
import {useBusiness} from '@/providers/business-provider';
import Link from 'next/link';

export function AppSidebar({ ...props } : React.ComponentProps<typeof Sidebar>) {
	const profile = useProfile();
	const businesses = useBusinesses();
	const business = useBusiness();
	
	const sidebarNavs = useMemo(() => {
		return  [
			{
				title: profile.is_admin ? 'Negocios' : 'Mis negocios',
				url: "/me",
				icon: LayoutDashboard,
				isActive: true,
			},
			{
				title: "Importar",
				url: `/me/${business.slug}/import`,
				icon: CloudUpload,
				isActive: false,
			},
			{
				title: profile.is_admin ? 'Servicios' : 'Mis servicios',
				url: `/me/${business.slug}/services`,
				icon: Grid,
				isActive: false,
			},
			{
				title: profile.is_admin ? 'Productos' : 'Mis productos',
				url: `/me/${business.slug}/products`,
				icon: ListOrdered,
				isActive: false,
			},
			{
				title: "Preferencias",
				url: `/me/${business.slug}/preferences`,
				icon: Settings,
				isActive: false,
			}
		]
	},[profile.is_admin, business.slug])
	// Note: I'm using state to show active item.
	// IRL you should use the url/router.
	const [activeItem, setActiveItem] = React.useState(sidebarNavs[0])
	const { setOpen } = useSidebar()
	
	const navItems = useMemo(() => {
		return businesses.length == 0 ? [sidebarNavs[0]] : sidebarNavs;
	}, [businesses]);
	
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<BusinessSelector/>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					{/*<SidebarGroupLabel>Platform</SidebarGroupLabel>*/}
					<SidebarMenu>
						{navItems.map((item) => (
							<SidebarMenuItem key={item.title} className='py-1'>
								<SidebarMenuButton asChild
								                   onClick={() => {
									                   setActiveItem(item)
									                   setOpen(true)
								                   }}
								                   isActive={activeItem?.title === item.title}
								>
									<Link href={item.url}>
										<item.icon />
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<NavUser/>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
