import * as React from 'react';
import {HeaderSection} from '@/components/layout/header-section';
import {Main} from '@/components/layout/main';
import Import from '@/components/import/import';

export const dynamic = "force-dynamic";

export default async function ImportPage() {
	
	return (
		<Main fixed>
			<HeaderSection
				title='Importar'
				desc='Suba sus productos y servicios desde un excel.'
			/>
			<div className='flex justify-center items-center'>
				<Import/>
			</div>
		</Main>
	)
}
