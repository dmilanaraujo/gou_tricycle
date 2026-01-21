"use client"

import * as React from "react"
import { Command, Settings, Home, Grid } from 'lucide-react'

import { NavUser } from "@/components/auth/nav-user"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarInput,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar"
import {Business} from '@/types/business';

// This is sample data
const sidebarNavs = [
	{
		title: "Inicio",
		url: "/me",
		icon: Home,
		isActive: true,
	},
	{
		title: "Mis servicios",
		url: "/me/services",
		icon: Grid,
		isActive: false,
	},
	{
		title: "Preferencias",
		url: "/me/preferences",
		icon: Settings,
		isActive: false,
	}
]

export function AppSidebar({ profile, ...props }: React.ComponentProps<typeof Sidebar> & { profile: Business}) {
	// Note: I'm using state to show active item.
	// IRL you should use the url/router.
	const [activeItem, setActiveItem] = React.useState(sidebarNavs[0])
	const { setOpen } = useSidebar()
	
	return (
		<Sidebar
			collapsible="icon"
			className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
			{...props}
		>
			{/* This is the first sidebar */}
			{/* We disable collapsible and adjust width to icon. */}
			{/* This will make the sidebar appear as icons. */}
			<Sidebar
				collapsible="none"
				// className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
				className="w-[calc(var(--sidebar-width-icon)+1px)]!"
			>
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
								<a href="#">
									<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
										<Command className="size-4" />
									</div>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-medium">{profile.name}</span>
										<span className="truncate text-xs">{profile.description}</span>
									</div>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupContent className="px-1.5 md:px-0">
							<SidebarMenu>
								{sidebarNavs.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											tooltip={{
												children: item.title,
												hidden: false,
											}}
											onClick={() => {
												setActiveItem(item)
												setOpen(true)
											}}
											isActive={activeItem?.title === item.title}
											className="px-2.5 md:px-2"
										>
											
											<a href={item.url || '#'}>
												<item.icon/>
												{/*{item.title}*/}
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
				<SidebarFooter>
					<NavUser profile={profile} />
				</SidebarFooter>
			</Sidebar>
			
			{/* This is the second sidebar */}
			{/* We disable collapsible and let it fill remaining space */}
			{/*<Sidebar collapsible="none" className="hidden flex-1 md:flex">*/}
			{/*	<SidebarHeader className="gap-3.5 border-b p-4">*/}
			{/*		<div className="flex w-full items-center justify-between">*/}
			{/*			<div className="text-foreground text-base font-medium">*/}
			{/*				{activeItem?.title}*/}
			{/*			</div>*/}
			{/*			/!*<Label className="flex items-center gap-2 text-sm">*!/*/}
			{/*			/!*	<span>Unreads</span>*!/*/}
			{/*			/!*	<Switch className="shadow-none" />*!/*/}
			{/*			/!*</Label>*!/*/}
			{/*		</div>*/}
			{/*		/!*<SidebarInput placeholder="Type to search..." />*!/*/}
			{/*	</SidebarHeader>*/}
			{/*	<SidebarContent>*/}
			{/*		<SidebarGroup className="px-0">*/}
			{/*			<SidebarGroupContent>*/}
			{/*				/!*<SidebarMenu>*!/*/}
			{/*				/!*	{data.nav.map((item) => (*!/*/}
			{/*				/!*		<SidebarMenuItem key={item.name}>*!/*/}
			{/*				/!*			<SidebarMenuButton*!/*/}
			{/*				/!*				asChild*!/*/}
			{/*				/!*				isActive={item.name === "Messages & media"}*!/*/}
			{/*				/!*			>*!/*/}
			{/*				/!*				<a href="#">*!/*/}
			{/*				/!*					<item.icon />*!/*/}
			{/*				/!*					<span>{item.name}</span>*!/*/}
			{/*				/!*				</a>*!/*/}
			{/*				/!*			</SidebarMenuButton>*!/*/}
			{/*				/!*		</SidebarMenuItem>*!/*/}
			{/*				/!*	))}*!/*/}
			{/*				/!*</SidebarMenu>*!/*/}
			{/*			</SidebarGroupContent>*/}
			{/*		</SidebarGroup>*/}
			{/*	</SidebarContent>*/}
			{/*</Sidebar>*/}
		</Sidebar>
	)
}
