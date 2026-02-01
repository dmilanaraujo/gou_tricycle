import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {ImagesForm} from '@/components/common/form-images';
import * as React from 'react';
import {ContentSection} from '@/components/layout/content-section';
import {ScrollArea} from '@/components/ui/scroll-area';
import {HeaderSection} from '@/components/layout/header-section';
import {Main} from '@/components/layout/main';
import {Wrench, Images} from 'lucide-react';
import {ServiceEdit} from '@/components/service/service-edit';
import {IdParamsProps, Service} from '@/types';
import {getServiceById} from '@/lib/actions/service';
import {notFound} from 'next/navigation';

export const dynamic = "force-dynamic";

export default async function ServiceEditPage({ params }: { params: Promise<IdParamsProps> }) {
	const { id } = await params;
	
	const service = await getServiceById<Service>(id);
	
	if (!service) {
		notFound();
	}
	
	const tabs =  [
		{
			name: 'Información general',
			value: 'general_info',
			icon: <Wrench size={18} />,
			content: (
				<ContentSection
					title='Servicio'
					desc='Datos del servicio'
				>
					<ServiceEdit service={service}/>
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
					desc='Gestione las imágenes del servicio'
				>
					<ImagesForm
						bucket='service_images'
						images={service?.images || []}
						extraMetadata={{ service_id: service?.id! }}
			            extraPath={`/${service?.id!}`}
					/>
				</ContentSection>
			)
		},
	];
	
	return (
		<Main fixed>
			<HeaderSection
				title='Servicio'
				desc='Gestione los datos del servicio aquí.'
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
