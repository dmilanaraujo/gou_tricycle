import {ImagesForm} from '@/components/common/form-images';
import * as React from 'react';
import {ContentSection} from '@/components/layout/content-section';
import {HeaderSection} from '@/components/layout/header-section';
import {Main} from '@/components/layout/main';
import {Wrench, Images} from 'lucide-react';
import {ProductEdit} from '@/components/product/product-edit';
import {IdParamsProps, Product} from '@/types';
import {getServiceById} from '@/lib/actions/service';
import {notFound} from 'next/navigation';
import {AppTabs} from '@/components/layout/app-tabs';

export const dynamic = "force-dynamic";

export default async function ProductEditPage({ params }: { params: Promise<IdParamsProps> }) {
	const { id } = await params;
	
	const product = await getServiceById<Product>(id);
	
	if (!product) {
		notFound();
	}
	
	const tabs =  [
		{
			name: 'Información general',
			value: 'general_info',
			icon: <Wrench size={18} />,
			content: (
				<ContentSection
					title='Producto'
					desc='Datos del producto'
				>
					<ProductEdit product={product}/>
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
					desc='Gestione las imágenes del producto'
				>
					<ImagesForm
						bucket='service_images'
						images={product?.images || []}
						extraMetadata={{ service_id: product?.id! }}
						extraPath={`/${product?.id!}`}
					/>
				</ContentSection>
			)
		},
	];
	
	return (
		<Main fixed>
			<HeaderSection
				title='Producto'
				desc='Gestione los datos del producto aquí.'
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
