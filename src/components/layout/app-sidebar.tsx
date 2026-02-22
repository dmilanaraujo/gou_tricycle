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
import {useProfile} from '@/providers/profile-provider';
import {BusinessSelector} from '@/components/layout/business-selector';
import {useMemo} from 'react';
import {useBusiness} from '@/providers/business-provider';

// This is sample data
const sidebarNavs = [
	{
		title: "Mis negocios",
		url: "/me",
		icon: LayoutDashboard,
		isActive: true,
	},
	{
		title: "Importar",
		url: "/me/[slug]/import",
		icon: CloudUpload,
		isActive: false,
	},
	{
		title: "Mis servicios",
		url: "/me/[slug]/services",
		icon: Grid,
		isActive: false,
	},
	{
		title: "Mis productos",
		url: "/me/[slug]/products",
		icon: ListOrdered,
		isActive: false,
	},
	{
		title: "Preferencias",
		url: "/me/[slug]/preferences",
		icon: Settings,
		isActive: false,
	}
]

export function AppSidebar({ ...props } : React.ComponentProps<typeof Sidebar>) {
	const profile = useProfile();
	const business = useBusiness();
	// Note: I'm using state to show active item.
	// IRL you should use the url/router.
	const [activeItem, setActiveItem] = React.useState(sidebarNavs[0])
	const { setOpen } = useSidebar()
	
	const navItems = useMemo(() => {
		return profile.businesses.length == 0 ? [sidebarNavs[0]] : sidebarNavs;
	}, [profile.businesses]);
	
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
									<a href={item.url.replace('[slug]', business.slug)}>
										<item.icon />
										<span>{item.title}</span>
									</a>
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
