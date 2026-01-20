import { ConfirmSignupForm } from "@/components/auth/form-confirm-signup";
import React from 'react';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {StepProgress} from '@/components/common/step-progress';


export default async function ConfirmSignupPage() {
	
	const cookieStore = await cookies();
	const confirmPhone = cookieStore.get('confirm-signup')?.value;
	
	if (!confirmPhone) {
		redirect('/me');
	}

	return (
		<div className={'flex justify-center items-center'}>
			<div>
				<div className='p-8'>
					<div className='px-0 pt-0'>
						<div className='text-2xl text-center'>Confirme su registro</div>
						<div className={'md:max-w-md text-center mt-2'}>Entre el código de verificación que fue enviado a su WhatsApp</div>
					</div>
					<div className='space-y-5 px-0 pb-0 pt-8'>
						<StepProgress/>
						<ConfirmSignupForm phone={confirmPhone}/>
					</div>
				</div>
			</div>
		</div>
	)
}
