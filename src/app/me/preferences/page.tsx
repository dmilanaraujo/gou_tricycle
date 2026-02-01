import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {ProfileForm} from '@/components/preferences/form-profile';
import {redirect} from 'next/navigation';
import {ImagesForm} from '@/components/common/form-images';
import {UpdatePasswordForm} from '@/components/preferences/form-update-password';
import * as React from 'react';
import {ContentSection} from '@/components/layout/content-section';
import {ScrollArea} from '@/components/ui/scroll-area';
import {HeaderSection} from '@/components/layout/header-section';
import {Main} from '@/components/layout/main';
import {Wrench, Key, Images} from 'lucide-react';
import {LogoBannerForm} from '@/components/preferences/form-logo-banner';
import {getProfileCachedData} from '@/lib/actions/profile';

export const dynamic = "force-dynamic";

export default async function PreferencesPage() {
	const business = await getProfileCachedData();
	
	const tabs =  [
		{
			name: 'Información general',
			value: 'general_info',
			icon: <Wrench size={18} />,
			content: (
				<ContentSection
					title='Perfil'
					desc='Datos del perfil de su negocio'
				>
					<ProfileForm/>
				</ContentSection>
			)
		},
		{
			name: 'Logo y Banner',
			value: 'logo_banner',
			icon: <Wrench size={18} />,
			content: (
				<ContentSection
					title='Logo y banner de su negocio'
					desc='Suba las imágenes del logo y banner de su negocio'
				>
					<LogoBannerForm bucket='business_images'/>
				</ContentSection>
			)
		},
		{
			name: 'Imágenes',
			value: 'images',
			icon: <Images size={18} />,
			content: (
				<ContentSection
					title='Imágenes'
					desc='Gestione las imágenes para hacer visible su negocio'
				>
					<ImagesForm bucket='business_images' images={business?.images || []}/>
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
		}
	];
	
	return (
		<Main fixed>
			<HeaderSection
				title='Preferencias'
				desc='Gestione los datos de su negocio aquí.'
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
							<ScrollArea className='w-full md:max-h-[calc(100vh-270px)]'>
								{tab.content}
							</ScrollArea>
						</TabsContent>
					))}
				
				</Tabs>
			</div>
		
		</Main>
	)
}
