import * as React from 'react';
import {HeaderSection} from '@/components/layout/header-section';
import {Main} from '@/components/layout/main';
import {BusinessCreate} from '@/components/business/business-create';

export const dynamic = "force-dynamic";

export default async function CreateBusinessPage() {
	return (
		<Main fixed>
			<HeaderSection
				title='Crear negocio'
				desc='Rellene los datos de su negocio aquí.'
			/>
			<div className='flex justify-center items-center'>
				<BusinessCreate/>
			</div>
		</Main>
	)
}
