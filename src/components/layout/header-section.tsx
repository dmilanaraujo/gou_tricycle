import {Separator} from '@/components/ui/separator';

type HeaderSectionProps = {
	title: string
	desc: string
}

export function HeaderSection({ title, desc }: HeaderSectionProps) {
	return (
		<>
			<div className='space-y-0.5'>
				<h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
					{title}
				</h1>
				<p className='text-muted-foreground'>
					{desc}
				</p>
			</div>
			<Separator className='my-4 lg:my-6'/>
		</>
	
	)
}
