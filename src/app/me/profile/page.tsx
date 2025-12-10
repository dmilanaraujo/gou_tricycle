import { createClient } from "@/lib/supabase/server";
import {notFound, redirect} from 'next/navigation';
import {ProfileForm} from '@/components/account/form-profile';
import {UpdatePasswordForm} from '@/components/auth/form-update-password';
import {AvatarForm} from '@/components/account/form-avatar';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {
    ArrowLeft,
    Lock, Mail, Phone,
    Star,
    User,
} from 'lucide-react';
import React from 'react';
import {Separator} from "@/components/ui/separator";
import {getProfile} from '@/lib/actions/profile';
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ProfilePage() {
    const supabase = await createClient();
    
    const {data: {user}, error} = await supabase.auth.getUser();
    if (error || !user) {
        redirect("/sign-in");
    }
    const profileRes = await getProfile();
    if (!profileRes.success) {
        notFound();
    }
    
    
    // const { rating, number_reservations, number_referred, referral_code, total_meters} = profileRes.data!;
    return (
        <div className="relative py-16 z-10 mx-auto px-4 max-w-full md:max-w-6xl">
            <h2 className="text-3xl leading-10 sm:text-4xl md:text-[40px] md:leading-[3.25rem] font-bold tracking-tight">
                <Button asChild>
                    <Link href='/me'>
                        <ArrowLeft/>
                    </Link>
                </Button>
                Información personal
            </h2>
            <p className="text-slate-600">Datos personales de su cuenta</p>
            
            <div className="mt-4 flex flex-col lg:flex-row gap-6">
                <div className="md:w-1/3 space-y-6">
                    <Card className="border-0 shadow-none bg-muted rounded-xl overflow-hidden">
                        <CardHeader className="flex flex-col items-center">
                            <AvatarForm user={user}/>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="bg-white rounded-lg mt-4">
                                <ul>
                                    {user.phone && (
                                        <li className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                                    <Phone className="text-white h-4 w-4"/>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-foreground font-medium">{user.phone}</p>
                                                    <p className="text-xs text-muted-foreground">Teléfono</p>
                                                </div>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            
                        </CardContent>
                    </Card>
                </div>
                
                <div className="md:w-2/3 space-y-6">
                    <Card className="shadow-none border border-border/80 rounded-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <div
                                    className="shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                    <Lock className="text-white h-4 w-4"/>
                                </div>
                                <span className="text-2xl font-semibold tracking-tight">
                                    Cambiar contraseña
                                </span>
                            </CardTitle>
                            <CardDescription>
                                Actualice su contraseña
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <UpdatePasswordForm/>
                        </CardContent>
                    </Card>
                    
                    <Card className="shadow-none border border-border/80 rounded-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <div
                                    className="shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                    <User className="text-white h-4 w-4"/>
                                </div>
                                <span className="text-2xl font-semibold tracking-tight">
										Información personal
									</span>
                            </CardTitle>
                            <CardDescription>Datos personales</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ProfileForm user={user}/>
                        </CardContent>
                    </Card>
                    
                </div>
            </div>
        </div>
    )
}
