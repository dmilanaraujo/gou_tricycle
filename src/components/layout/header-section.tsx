import {Separator} from '@/components/ui/separator';
import * as React from 'react';

type HeaderSectionProps = {
	title: string
	desc: string
	action?: React.ReactNode
}

export function HeaderSection({ title, desc, action }: HeaderSectionProps) {
	return (
		<>
			<div className='space-y-0.5 flex justify-between items-end'>
				<div>
					<h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
						{title}
					</h1>
					<p className='text-muted-foreground'>
						{desc}
					</p>
				</div>
				{action}
			</div>
			<Separator className='my-4 lg:my-6'/>
		</>
	
	)
}
