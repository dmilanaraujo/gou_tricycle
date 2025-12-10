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
        <div className="relative py-16 z-10 mx-auto px-4 max-w-full md:max-w-6xl">
            <h2 className="text-3xl leading-10 sm:text-4xl md:text-[40px] md:leading-[3.25rem] font-bold tracking-tight">
                {!online ? 'Ponte en línea' : 'Estás en línea'}
            </h2>
            {/* <p className="text-slate-600">Datos personales de su cuenta</p> */}
            
            <div className="mt-4 flex flex-col gap-6">
                <div className="flex justify-center space-y-6 py-8">
                    <StatusForm profile={profileRes.data!}/>
                </div>
                
                <div className="flex justify-center space-y-6">
                    <Button asChild>
                        <Link href='/me/profile'>
                            Editar mis datos
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
