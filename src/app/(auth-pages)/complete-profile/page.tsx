import {redirect} from 'next/navigation';
import React from "react";
import {getProfile} from '@/lib/actions/profile';
import {FormProfileForm} from '@/components/auth/form-complete-profile';
import {StepProgress} from '@/components/common/step-progress';

export const dynamic = "force-dynamic";

export default async function CompleteProfilePage() {
	
	const profileRes = await getProfile();
	if (!profileRes.success || !profileRes.data) {
		redirect("/sign-in");
	}
	const { data: business } = profileRes;

	return (
		<div className={'flex justify-center items-center'}>
			<div>
				<div className='py-8'>
					<div className='px-0 pt-0'>
						<div className='text-2xl text-center'>Complete su perfil</div>
						<div className={'md:max-w-md text-center mt-2'}>La veracidad de su información dará confianza a sus clientes</div>
					</div>
					<div className='space-y-5 px-0 pb-0 pt-8'>
						<StepProgress active={2}/>
						<FormProfileForm business={business}/>
					</div>
				</div>
			</div>
		</div>
	);
}
