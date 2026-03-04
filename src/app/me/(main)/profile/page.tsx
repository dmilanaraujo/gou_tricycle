import {FormProfile} from '@/components/auth/form-profile';
import {UpdatePasswordForm} from '@/components/preferences/form-update-password';
import * as React from 'react';
import {ContentSection} from '@/components/layout/content-section';
import {HeaderSection} from '@/components/layout/header-section';
import {Main} from '@/components/layout/main';
import {Wrench, Key, Phone} from 'lucide-react';
import {UpdatePhoneForm} from '@/components/auth/form-update-phone';
import {getProfileCachedData} from '@/lib/actions/profile';
import {UpdateEmailForm} from '@/components/auth/form-update-email';
import {AppTabs} from '@/components/layout/app-tabs';

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
	const profile = await getProfileCachedData();
	const showPhone = !!profile?.phone;
	const tabs =  [
		{
			name: 'Información de perfil',
			value: 'general_info',
			icon: <Wrench size={18} />,
			content: (
				<ContentSection
					title='Perfil'
					desc='Datos del perfil de su usuario'
				>
					<FormProfile/>
				</ContentSection>
			)
		},
		{
			name: 'Actualizar contraseña',
			value: 'change_password',
			icon: <Key size={18} />,
			content: (
				<ContentSection
					title='Contraseña'
					desc='Cambie su contraseña'
				>
					<UpdatePasswordForm/>
				</ContentSection>
			)
		},
		{
			name: showPhone ? 'Actualizar teléfono' : 'Actualizar correo electrónico',
			value: 'change_username',
			icon: <Phone size={18} />,
			content: (
				<ContentSection
					title={showPhone ? 'Teléfono' : 'Correo electrónico'}
					desc={showPhone ? 'Actualice su número de teléfono' : 'Actualice su correo electrónico'}
				>
					{showPhone ? <UpdatePhoneForm/> : <UpdateEmailForm/>}
				</ContentSection>
			)
		}
	];
	
	return (
		<Main fixed>
			<HeaderSection
				title='Actualizar perfil del usuario'
				desc='Actualice los datos de su perfil aquí.'
			/>
			<div className='flex justify-center flex-col items-center'>
				<AppTabs
					defaultValue='general_info'
					tabs={tabs}
				/>
			</div>
		</Main>
	)
}
