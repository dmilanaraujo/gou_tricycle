import ProductTable from '@/components/product/table';
import {HeaderSection} from '@/components/layout/header-section';
import * as React from 'react';
import {Main} from '@/components/layout/main';
import {getProfileCachedData} from '@/lib/actions/profile';
import {ProductSheet} from '@/components/product/product-sheet';

export default async function ProductsPage() {
	const business = await getProfileCachedData();
	return (
		<Main fixed>
			<HeaderSection
				title='Productos'
				desc='Gestione sus productos aquí.'
				action={<ProductSheet profile={business!}/>}
			/>
			<div className="p-4">
				<ProductTable/>
			</div>
		</Main>
	)
}
