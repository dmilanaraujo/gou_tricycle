'use client';

import {CalendarX2Icon, TriangleAlertIcon, TruckIcon, XIcon} from 'lucide-react';
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const StatisticsCardData = [
	{
		icon: <TruckIcon className='size-4' />,
		value: '42',
		title: 'Shipped Orders',
		changePercentage: '+18.2%'
	},
	{
		icon: <TriangleAlertIcon className='size-4' />,
		value: '8',
		title: 'Damaged Returns',
		changePercentage: '-8.7%'
	},
	{
		icon: <CalendarX2Icon className='size-4' />,
		value: '27',
		title: 'Missed Delivery Slots',
		changePercentage: '+4.3%'
	}
]

export function Statistics() {
	
	return (
		<div className='grid grid-cols-2 gap-6 lg:grid-cols-3'>
			{/* Statistics Cards */}
			<div className='col-span-full grid gap-6 sm:grid-cols-3 md:max-lg:grid-cols-1'>
				{StatisticsCardData.map((card, index) => (
					<Card key={card.value} className={'gap-4'}>
						<CardHeader className='flex items-center'>
							<div className='bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded-md'>
								{card.icon}
							</div>
							<span className='text-2xl'>{card.value}</span>
						</CardHeader>
						<CardContent className='flex flex-col gap-2'>
							<span className='font-semibold'>{card.title}</span>
							<p className='space-x-2'>
								<span className='text-sm'>{card.changePercentage}</span>
								<span className='text-muted-foreground text-sm'>than last week</span>
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
