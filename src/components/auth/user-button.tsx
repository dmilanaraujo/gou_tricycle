
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from '../ui/dropdown-menu';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {LogoutButton} from '@/components/auth/logout-button';
import {ChevronsUpDown} from 'lucide-react';
import {getInitials, getPublicBusinessImageUrl} from '@/lib/utils';
import {getProfileCachedData} from '@/lib/actions/profile';

export async function UserButton() {
    const profile = await getProfileCachedData();
    if (!profile) {
        return (
            <Button asChild>
                <Link href='/me'>
                    Entrar o Registrarse
                </Link>
            </Button>
        );
    }
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div
                    className="flex items-center"
                >
                    <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={getPublicBusinessImageUrl(profile.logo)} alt={profile.name} />
                        <AvatarFallback className="rounded-lg">{getInitials(profile.name)}</AvatarFallback>
                    </Avatar>
                    {/*<div className="grid flex-1 text-left text-sm leading-tight">*/}
                    {/*    /!*<span className="truncate font-semibold">{fullName}</span>*!/*/}
                    {/*    <span className="truncate font-semibold">{'name'}</span>*/}
                    {/*    <span className="truncate text-xs">{user.email}</span>*/}
                    {/*</div>*/}
                    <ChevronsUpDown className="ml-auto size-4" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side={"bottom"}
                align="end"
                sideOffset={4}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-3 pt-4 text-left text-sm">
                        {/*<Avatar className="h-8 w-8 rounded-lg">*/}
                        {/*    /!*<AvatarImage src={avatar} alt={fullName} />*!/*/}
                        {/*    /!*<AvatarFallback className="rounded-lg">{avatarFallback}</AvatarFallback>*!/*/}
                        {/*    <AvatarFallback className="rounded-lg">{'NA'}</AvatarFallback>*/}
                        {/*</Avatar>*/}
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">{profile.name}</span>
                            <span className="truncate text-xs">{profile.phone}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <a href={'/me'} className={'px-3 cursor-pointer'}>
                        Mi panel
                    </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <LogoutButton className={'bg-transparent text-blue-900 hover:bg-transparent cursor-pointer px-5'}>
                        Cerrar
                    </LogoutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
