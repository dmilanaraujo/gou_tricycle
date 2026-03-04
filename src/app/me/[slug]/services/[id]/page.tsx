import {ImagesForm} from '@/components/common/form-images';
import * as React from 'react';
import {ContentSection} from '@/components/layout/content-section';
import {HeaderSection} from '@/components/layout/header-section';
import {Main} from '@/components/layout/main';
import {Wrench, Images} from 'lucide-react';
import {ServiceEdit} from '@/components/service/service-edit';
import {IdParamsProps, Service} from '@/types';
import {getServiceById} from '@/lib/actions/service';
import {notFound} from 'next/navigation';
import {AppTabs} from '@/components/layout/app-tabs';

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
				<AppTabs
					defaultValue='general_info'
					tabs={tabs}
				/>
			</div>
		</Main>
	)
}
