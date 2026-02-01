import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Home} from 'lucide-react';

const ProfileNotFound = () => {
	return (
		<main className='h-screen flex justify-center items-center'>
			<section className='pt-8 flex max-w-4xl flex-col items-center gap-6 self-center text-center pb-8 sm:pb-6'>
				<h1 className='text-3xl leading-[1.29167] font-semibold text-balance sm:text-4xl lg:text-5xl'>
					Perfil no encontrado
				</h1>
				<p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
					No existe ningún perfil asociado a su usuario. Contactenos para resolver su problema.
				</p>
				<Button asChild>
					<Link href="/"><Home/> Inicio</Link>
				</Button>
			</section>
		</main>
	
	)
}

export default ProfileNotFound
