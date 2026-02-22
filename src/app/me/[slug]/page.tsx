import React from 'react';
import {Statistics} from '@/components/dashboard/statistics';

export const dynamic = "force-dynamic";

export default async function BusinessPage() {

    return (
        <div className="flex flex-col justify-between h-full pb-12 md:mx-auto md:max-w-7xl">
            <Statistics/>
        </div>
    )
}
