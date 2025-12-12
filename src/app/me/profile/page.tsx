import { redirect} from 'next/navigation';
import {ProfileForm} from '@/components/account/form-profile';
import {UpdatePasswordForm} from '@/components/auth/form-update-password';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import { ArrowLeft, Lock, User } from 'lucide-react';
import React from 'react';
import {getProfile} from '@/lib/actions/profile';
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ProfilePage() {
    
    const profileRes = await getProfile();
    if (!profileRes.success || !profileRes.data) {
        redirect("/sign-in");
    }
    const { data: driver } = profileRes;
    return (
        <div className="relative py-4 mx-auto px-4 max-w-full md:max-w-6xl">
            <h2 className="text-2xl leading-10 sm:text-4xl md:text-[40px] md:leading-[3.25rem] font-bold tracking-tight flex items-center gap-3">
                <Button asChild>
                    <Link href='/me'>
                        <ArrowLeft/>
                    </Link>
                </Button>
                {driver.phone.slice(-8)}
            </h2>
            
            <div className="mt-4 flex flex-col lg:flex-row gap-6">
                <div className="space-y-6">
                    
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
                            <ProfileForm driver={driver}/>
                        </CardContent>
                    </Card>
                    
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
                </div>
            </div>
        </div>
    )
}
