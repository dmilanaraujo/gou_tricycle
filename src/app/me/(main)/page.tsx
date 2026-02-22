import {redirect} from 'next/navigation';
import React from 'react';
import {isProfileComplete} from '@/lib/utils';
import {getProfileCachedData} from '@/lib/actions/profile';
import {BusinessList} from '@/components/dashboard/business-list';

export const dynamic = "force-dynamic";

export default async function AccountPage() {
    const profile = await getProfileCachedData();
    const isComplete = isProfileComplete(profile!);
    if (!isComplete) {
        redirect("/me/profile");
    }

    return (
        <div className="mx-auto max-w-6xl w-full px-4 py-10 sm:px-6 lg:px-8">
            <h1 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
                Negocios
            </h1>
            <BusinessList/>
        </div>
    )
}
