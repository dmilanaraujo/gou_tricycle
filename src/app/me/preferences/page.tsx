import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {ProfileForm} from '@/components/preferences/form-profile';
import {getProfile} from '@/lib/actions/profile';
import {redirect} from 'next/navigation';
import {ImagesForm} from '@/components/preferences/form-images';
import {UpdatePasswordForm} from '@/components/preferences/form-update-password';
import * as React from 'react';

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
			content: <ProfileForm profile={business}/>
		},
		{
			name: 'Imágenes',
			value: 'images',
			content: <ImagesForm profile={business}/>
		},
		{
			name: 'Actualizar contraseña',
			value: 'change_password',
			content: <UpdatePasswordForm/>
		}
	];
	
	return (
		<>
			<div className="flex items-center justify-between border-b p-4">
				<div className="flex flex-col">
					<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Preferencias</h4>
					<p className="text-sm text-muted-foreground">Gestione los datos de su negocio aquí.</p>
				</div>
			</div>
			<div className="p-4">
				<div className='w-full'>
					<Tabs defaultValue='general_info' className='flex gap-4 w-full'>
						<TabsList className='bg-background h-full flex-col rounded-none p-0'>
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
								<TabsContent key={tab.value} value={tab.value} className={'w-full flex justify-center'}>
									<div className='text-muted-foreground text-sm w-2xl'>{tab.content}</div>
								</TabsContent>
							))}
						</div>

					</Tabs>
				</div>
			</div>
		</>
	)
}
