import ProductTable from '@/components/product/table';
import {HeaderSection} from '@/components/layout/header-section';
import * as React from 'react';
import {Main} from '@/components/layout/main';
import {ProductSheet} from '@/components/product/product-sheet';

export default async function ProductsPage() {
	return (
		<Main fixed>
			<HeaderSection
				title='Productos'
				desc='Gestione sus productos aquí.'
				action={<ProductSheet/>}
			/>
			<div className="p-4">
				<ProductTable/>
			</div>
		</Main>
	)
}
