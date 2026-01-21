import {ServiceSheet} from "@/components/service/service-sheet";
import ServiceTable from '@/components/service/table';

export default function ServicesPage() {
	return (
		<>
			<div className="flex items-center justify-between border-b p-4">
				<div className="flex flex-col">
					<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Servicios</h4>
					<p className="text-sm text-muted-foreground">Gestione sus servicios aquí.</p>
				</div>
				<ServiceSheet />
			</div>
			<div className="p-4">
				<ServiceTable/>
			</div>
		</>
	)
}
