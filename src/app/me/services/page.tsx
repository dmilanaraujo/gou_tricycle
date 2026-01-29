import {ServiceSheet} from "@/components/service/service-sheet";
import ServiceTable from '@/components/service/table';
import {HeaderSection} from '@/components/layout/header-section';
import * as React from 'react';
import {Main} from '@/components/layout/main';

export default async function ServicesPage() {
	return (
		<Main fixed>
			<HeaderSection
				title='Servicios'
				desc='Gestione sus servicios aquí.'
				action={<ServiceSheet />}
			/>
			<div className="p-4">
				<ServiceTable/>
			</div>
		</Main>
	)
}
