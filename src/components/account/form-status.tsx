'use client';

import { Button } from '@/components/ui/button';
import {toast} from 'sonner';
import {LoaderCircle} from 'lucide-react';
import React, { useState } from 'react';
import {useRouter} from 'next/navigation';
import { Switch } from '../ui/switch';
import { updateStatus } from '@/lib/actions/drivers';
import { Driver } from '@/types';
import {Label} from '@/components/ui/label';

export function StatusForm({ profile }: { profile: Driver; }) {
	const [value, setValue] = useState(profile.online);
	const [isSubmitting, setSubmitting] = useState(false);
	const router = useRouter();
	
	async function onChange(newValue: boolean) {
		setValue(newValue);
		try {
			setSubmitting(true);
			const response = await updateStatus(newValue);
			if (!response.success) {
				setValue(!newValue)
				response.errors?.forEach((error) => {
					toast.error('Error', {
						description: error.message,
					});
				});
				return;
			}
			toast.success('Hecho!', {
				description: 'Estado actualizado',
			});
			router.refresh()
		} catch (e) {
			setValue(!newValue)
			toast.error('Error', {
				// @ts-expect-error only
				description: e.message
			});
		} finally {
			setSubmitting(false);
		}
		
	}
	
	return (
		<div className='flex justify-center gap-4 space-y-8'>
			
			
			<div className="flex items-center space-x-2">
				{/*<Label>Fuera de línea</Label>*/}
				<Switch
					// className={'h-12 w-12'}
					// value={value.toString()}
					checked={value}
					onCheckedChange={onChange}
				/>
				{/*<Label>En línea</Label>*/}
			</div>
		</div>
	);
}
