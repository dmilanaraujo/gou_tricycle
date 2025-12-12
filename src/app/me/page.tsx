import { createClient } from "@/lib/supabase/server";
import {notFound, redirect} from 'next/navigation';
import React from 'react';
import {getProfile} from '@/lib/actions/profile';
import { StatusForm } from "@/components/account/form-status";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AccountPage() {
    const supabase = await createClient();
    
    const {data: {user}, error} = await supabase.auth.getUser();
    if (error || !user) {
        redirect("/sign-in");
    }
    const profileRes = await getProfile();
    if (!profileRes.success) {
        notFound();
    }
    
    
    const { online } = profileRes.data!;
    return (
        <div className="flex flex-col justify-between h-full pb-12">
            <div className={'text-center h-full'}>
                <div className={'flex items-center h-full justify-center flex-col'}>
                    <h2 className="text-3xl leading-10 sm:text-4xl md:text-[40px] md:leading-[3.25rem] font-bold tracking-tight">
                        {!online ? 'Ponte en línea' : 'Estás en línea'}
                    </h2>
                    <div className="flex justify-center space-y-6 py-8">
                        <StatusForm profile={profileRes.data!}/>
                    </div>
                </div>
            </div>
            
            <div className="flex justify-center space-y-6 px-4">
                <Button asChild className={'w-full'}>
                    <Link href='/me/profile'>
                        Editar mis datos
                    </Link>
                </Button>
            </div>
        </div>
    )
}
