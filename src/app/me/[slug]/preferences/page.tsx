import {ImagesForm} from '@/components/common/form-images';
import * as React from 'react';
import {ContentSection} from '@/components/layout/content-section';
import {HeaderSection} from '@/components/layout/header-section';
import {Main} from '@/components/layout/main';
import {Wrench, Key, Images, LayoutGrid} from 'lucide-react';
import {LogoBannerForm} from '@/components/preferences/form-logo-banner';
import {CatalogForm} from '@/components/preferences/form-catalog';
import {BusinessParamsProps} from '@/types';
import {getBusinessBySlugCachedData} from '@/lib/actions/business';
import {BusinessEdit} from '@/components/business/business-edit';
import {AppTabs} from '@/components/layout/app-tabs';

export const dynamic = "force-dynamic";

export default async function PreferencesPage({ params }: { params: Promise<BusinessParamsProps> }) {
	const { slug } = await params;
	const business = await getBusinessBySlugCachedData(slug);
	
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
					<BusinessEdit/>
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
			name: 'Catálogo',
			value: 'update_settings_catalog',
			icon: <LayoutGrid size={18}/>,
			content: (
				<ContentSection
					title='Catálogo'
					desc='Actualice las preferencias de su catálogo'
				>
					<CatalogForm/>
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
				<AppTabs
					defaultValue='general_info'
					tabs={tabs}
				/>
			</div>
		</Main>
	)
}
