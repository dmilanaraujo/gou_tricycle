"use client"

import {
	ChevronsUpDown,
} from "lucide-react"

import {
	Avatar,
	AvatarFallback,
} from "@/components/ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar"
import {LogoutButton} from '@/components/auth/logout-button';
import {getInitials, getPublicBusinessImageUrl} from '@/lib/utils';
import {useProfile} from '@/providers/profile-provider';

export function NavUser() {
	const { isMobile } = useSidebar()
	const profile = useProfile();
	
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:h-8 md:p-0"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								{/*<AvatarImage src={getPublicBusinessImageUrl(profile.logo)} alt={profile.name} />*/}
								<AvatarFallback className="rounded-lg">{getInitials(profile.name)}</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{profile.name}</span>
								{/*<span className="truncate text-xs">{profile.phone}</span>*/}
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									{/*<AvatarImage src={getPublicBusinessImageUrl(profile.logo)} alt={profile.name} />*/}
									<AvatarFallback className="rounded-lg">{getInitials(profile.name)}</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									{/*<span className="truncate font-medium">{profile.name}</span>*/}
									<span className="truncate text-xs">{profile.phone}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						{/*<DropdownMenuSeparator />*/}
						{/*<DropdownMenuGroup>*/}
						{/*	/!*<DropdownMenuItem>*!/*/}
						{/*	/!*	<BadgeCheck />*!/*/}
						{/*	/!*	Account*!/*/}
						{/*	/!*</DropdownMenuItem>*!/*/}
						{/*	<DropdownMenuItem>*/}
						{/*		<CreditCard />*/}
						{/*		Pago*/}
						{/*	</DropdownMenuItem>*/}
						{/*	<DropdownMenuItem>*/}
						{/*		<Bell />*/}
						{/*		Notificationes*/}
						{/*	</DropdownMenuItem>*/}
						{/*</DropdownMenuGroup>*/}
						{/*<DropdownMenuSeparator />*/}
						<DropdownMenuItem>
							{/*<LogOut />*/}
							{/*Log out*/}
							<LogoutButton className={'bg-transparent text-blue-900 hover:bg-transparent cursor-pointer'}>
								Cerrar
							</LogoutButton>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
