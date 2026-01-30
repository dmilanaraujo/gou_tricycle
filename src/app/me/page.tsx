import {redirect} from 'next/navigation';
import React from 'react';
import {isBusinessActive, isProfileComplete} from '@/lib/utils';
import {Statistics} from '@/components/dashboard/statistics';
import {getProfileCachedData} from '@/lib/actions/profile';

export const dynamic = "force-dynamic";

export default async function AccountPage() {
    const business = await getProfileCachedData();
    const isComplete = isProfileComplete(business!);
    if (!isComplete) {
        redirect("/me/profile");
    }
    const isActive = isBusinessActive(business!)
    const online = true;
    return (
        <div className="flex flex-col justify-between h-full pb-12 md:mx-auto md:max-w-6xl">
            <Statistics/>
            {/*<div className={'h-full'}>*/}
            {/*    {!isActive && (*/}
            {/*        <div className={'p-4'}>*/}
            {/*            <Alert variant="destructive">*/}
            {/*                <AlertCircleIcon />*/}
            {/*                <AlertTitle>Su cuenta aún no está activa.</AlertTitle>*/}
            {/*                <AlertDescription>*/}
            {/*                    <p>Debe realizar el pago de la subcripción para activar su cuenta.</p>*/}
            {/*                </AlertDescription>*/}
            {/*            </Alert>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*    <div className={'flex items-center h-full justify-center flex-col'}>*/}
            {/*       */}
            {/*        <h2 className="text-3xl leading-10 sm:text-4xl md:text-[40px] md:leading-[3.25rem] font-bold tracking-tight">*/}
            {/*            {!isActive ? 'Inactivo' : (*/}
            {/*                !online ? 'Ponte en línea' : 'Estás en línea'*/}
            {/*            )}*/}
            {/*        </h2>*/}
            {/*        <div className="flex justify-center space-y-6 py-8">*/}
            {/*            <StatusForm profile={profileRes.data!}/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            
            {/*<div className="flex justify-center space-y-6 px-4">*/}
            {/*    <Button asChild className={'w-full'}>*/}
            {/*        <Link href='/me/profile'>*/}
            {/*            Editar mis datos*/}
            {/*        </Link>*/}
            {/*    </Button>*/}
            {/*</div>*/}
        </div>
    )
}
