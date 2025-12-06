'use client'

import { useEffect } from 'react'
import {Button} from '@/components/ui/button';
import {RefreshCw} from "lucide-react";

export default function Error({ error, reset }: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	
	useEffect(() => {
		console.error(error)
	}, [error])
	
	return (
		<div className="md:pt-[50px] md:pb-[50px] items-center justify-center text-center">
			  <span className='text-9xl font-extrabold text-primary'>
				500
			  </span>
			<h2 className='text-primary text-2xl font-bold'>{'Algo salió mal'}</h2>
			<div className='mt-8 flex justify-center gap-2'>
				<Button className={'mt-8'} onClick={() => reset()}>
					<RefreshCw />
					{'Intente nuevamente'}
				</Button>
			</div>
		</div>
	)
}
