import {redirect} from 'next/navigation';
import React from "react";
import {getProfileCachedData} from '@/lib/actions/profile';
import {UserX} from 'lucide-react';

export const dynamic = "force-dynamic";

export default async function CompleteProfilePage() {
	
	const business = await getProfileCachedData();
	if (!business) {
		redirect("/sign-in");
	}

	return (
		<div className={'flex justify-center items-center'}>
			<div>
				<div className='py-8'>
					<div className='px-0 pt-0'>
						<div className='text-2xl text-center'>Su negocio aún no ha sido activado</div>
						<div className={'md:max-w-md text-center mt-2'}>Una vez su negocio sea activado podrá entrar a su perfil y gestionar su información general y sus productos y servicios</div>
					</div>
					<div className='flex justify-center mt-8'>
						<UserX className='size-16 text-red-600'/>
					</div>
				</div>
			</div>
		</div>
	);
}
