import { ConfirmSignupForm } from "@/components/auth/form-confirm-signup";
import Link from 'next/link';
import React from 'react';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {Button} from '@/components/ui/button';


export default async function ConfirmSignupPage() {
	
	const cookieStore = await cookies();
	const confirmPhone = cookieStore.get('confirm-signup')?.value;
	
	if (!confirmPhone) {
		redirect('/');
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
						<ConfirmSignupForm phone={confirmPhone}/>
					</div>
				</div>
				{/*<div className='flex justify-center mt-4 text-sm space-x-2'>*/}
				{/*	¿No está registrado?*/}
				{/*</div>*/}

				{/*<div className="flex justify-center mt-4 text-sm space-x-2">*/}
					
					{/*¿Ya tienes una cuenta?*/}
					{/*/!*<Link*!/*/}
					{/*/!*	href="/sign-in"*!/*/}
					{/*/!*	className="underline underline-offset-4 ml-2"*!/*/}
					{/*/!*>*!/*/}
					{/*/!*	Iniciar sesión*!/*/}
					{/*/!*</Link>*!/*/}
				{/*</div>*/}
			</div>
		</div>
	)
}
