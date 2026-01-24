import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {ProfileForm} from '@/components/preferences/form-profile';
import {getProfile} from '@/lib/actions/profile';
import {redirect} from 'next/navigation';
import {ImagesForm} from '@/components/preferences/form-images';
import {UpdatePasswordForm} from '@/components/preferences/form-update-password';
import * as React from 'react';
import {ContentSection} from '@/components/layout/content-section';
import {ScrollArea} from '@/components/ui/scroll-area';
import {HeaderSection} from '@/components/layout/header-section';
import {Main} from '@/components/layout/main';
import {Wrench, Key, Images} from 'lucide-react';
import {LogoBannerForm} from '@/components/preferences/form-logo-banner';

export const dynamic = "force-dynamic";

export default async function PreferencesPage() {
	const profileRes = await getProfile();
	if (!profileRes.success || !profileRes.data) {
		redirect("/sign-in");
	}
	const {data: business} = profileRes;
	
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
					<ProfileForm profile={business}/>
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
					<LogoBannerForm profile={business} bucket='business_images'/>
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
					<ImagesForm profile={business} bucket='business_images'/>
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
			<Tabs defaultValue='general_info' className='flex gap-4 w-full'>
				<TabsList className="bg-background flex-col rounded-none border-l p-0 justify-start">
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
				<div className={'w-full'}>
					{tabs.map(tab => (
						<TabsContent key={tab.value} value={tab.value} className={'flex w-full overflow-y-hidden px-1'}>
							<ScrollArea
								key={tab.value}
								// orientation='horizontal'
								type="always"
								className='hidden w-full min-w-40 bg-background px-1 md:block'
							>
							{tab.content}
							</ScrollArea>
						</TabsContent>
					))}
				</div>

			</Tabs>
		</Main>
	)
}
