import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {LayoutDashboard} from 'lucide-react';

const BusinessNotFound = () => {
	return (
		<main className='h-screen flex justify-center items-center'>
			<section className='pt-8 flex max-w-4xl flex-col items-center gap-6 self-center text-center pb-8 sm:pb-6'>
				<h1 className='text-3xl leading-[1.29167] font-semibold text-balance sm:text-4xl lg:text-5xl'>
					Negocio no encontrado
				</h1>
				<p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
					No existe el negocio al que intenta acceder o sus datos no están correctamente configurados. Contactenos para resolver su problema.
				</p>
				<Button asChild>
					<Link href="/me"><LayoutDashboard/> Mi panel</Link>
				</Button>
			</section>
		</main>
	
	)
}

export default BusinessNotFound
