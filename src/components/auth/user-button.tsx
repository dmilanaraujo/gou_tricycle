
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {createClient} from '@/lib/supabase/server';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from '../ui/dropdown-menu';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {LogoutButton} from '@/components/auth/logout-button';
import {ChevronsUpDown} from 'lucide-react';

export async function UserButton() {
    const supabase = await createClient();
    const {data: {user}, error} = await supabase.auth.getUser();
    if (!user) {
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
                        {/*<AvatarImage src={avatar} alt={fullName} />*/}
                        {/*<AvatarFallback className="rounded-lg">{avatarFallback}</AvatarFallback>*/}
                        <AvatarFallback className="rounded-lg">{'NA'}</AvatarFallback>
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
                            {/*<span className="truncate font-semibold">{fullName}</span>*/}
                            <span className="truncate font-semibold">{'Name'}</span>
                            <span className="truncate text-xs">{user.phone}</span>
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
