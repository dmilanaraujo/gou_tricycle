import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {
	// Bot, CarTaxiFront,
	Check,
	// Gift,
} from 'lucide-react';
// import {NavButton} from "@/components/common/nav-button";
import React from "react";


export default async function SignUpSuccessPage() {

	const cookieStore = await cookies();
	const signupSuccess = cookieStore.get('sign-up-success')?.value;
	
	if (signupSuccess != 'true') {
		redirect('/');
	}

	return (
		<div className="py-16 px-8 md:px-0">
			<div className="mx-auto max-w-6xl">
				<div className="grid gap-6 lg:grid-cols-1">
					<div className="max-w-screen-lg mx-auto py-0 md:py-0 sm:px-6">
						<div className="flex flex-col items-center text-center space-y-4">
							<div
								className="h-16 w-16 flex items-center justify-center rounded-full bg-green-900 ring-8 ring-green-50">
								<Check className="h-10 w-10 text-white stroke-[3px]"/>
							</div>
							<div>
								<h1 className="text-3xl font-bold text-green-900">¡Bienvenid@, a nuestra plataforma!</h1>
								<p className="text-lg text-gray-600 mt-2">Su cuenta ha sido creada exitosamente.</p>
								<p className="text-lg text-gray-600 mt-2">A partir de ahora podrá acceder a nuestros servicios de forma personalizada.</p>
							</div>
						</div>
						{/*<div className="mt-10 sm:mt-16 flex flex-col items-center text-center space-y-4">*/}
						{/*	<NavButton size='lg' variant='default' textButton={t('general.first_ride_promo')} url="/" iconName="CarFront"/>*/}
						{/*</div>*/}
						{/*<div className="mt-10 sm:mt-16 flex flex-col items-center text-center space-y-4">*/}
						{/*	<NavButton size='lg' variant='default' textButton={t('not_found.back_home')} url="/"*/}
						{/*			   iconName="MoveRight"/>*/}
						{/*</div>*/}
					</div>
				</div>
			</div>
		</div>
	);
}
