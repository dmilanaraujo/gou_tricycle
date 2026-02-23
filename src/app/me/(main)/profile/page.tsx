import {FormProfile} from '@/components/auth/form-profile';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {UpdatePasswordForm} from '@/components/preferences/form-update-password';
import * as React from 'react';
import {ContentSection} from '@/components/layout/content-section';
import {ScrollArea} from '@/components/ui/scroll-area';
import {HeaderSection} from '@/components/layout/header-section';
import {Main} from '@/components/layout/main';
import {Wrench, Key, Phone} from 'lucide-react';
import {UpdatePhoneForm} from '@/components/auth/form-update-phone';

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
	
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
			name: 'Actualizar teléfono',
			value: 'change_phone',
			icon: <Phone size={18} />,
			content: (
				<ContentSection
					title='Teléfono'
					desc='Actualice su número de teléfono'
				>
					<UpdatePhoneForm/>
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
				<Tabs defaultValue='general_info' className='flex gap-4 w-full flex-col md:flex-row md:w-4xl'>
					<TabsList className="bg-background flex-col rounded-none border-l p-0 justify-start h-full md:h-10">
						{tabs.map(tab => (
							<TabsTrigger
								key={tab.value}
								value={tab.value}
								className='bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full w-full justify-start rounded-none border-0 border-l-2 border-transparent data-[state=active]:shadow-none'
							>
								{tab.name}
							</TabsTrigger>
						))}
					</TabsList>
					
					{tabs.map(tab => (
						<TabsContent key={tab.value} value={tab.value} className={'flex w-full px-1'}>
							<ScrollArea className='w-full md:max-h-[calc(100vh-270px)] px-3'>
								{tab.content}
							</ScrollArea>
						</TabsContent>
					))}
				
				</Tabs>
			</div>
		
		</Main>
	)
}
