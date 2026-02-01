import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {ImagesForm} from '@/components/common/form-images';
import * as React from 'react';
import {ContentSection} from '@/components/layout/content-section';
import {ScrollArea} from '@/components/ui/scroll-area';
import {HeaderSection} from '@/components/layout/header-section';
import {Main} from '@/components/layout/main';
import {Wrench, Images} from 'lucide-react';
import {ProductEdit} from '@/components/product/product-edit';
import {IdParamsProps, Product} from '@/types';
import {getServiceById} from '@/lib/actions/service';
import {notFound} from 'next/navigation';

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
