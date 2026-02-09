'use client';

import {toast} from 'sonner';
import {CheckIcon, XIcon} from 'lucide-react';
import React, { useState } from 'react';
import {useRouter} from 'next/navigation';
import { Switch } from '../ui/switch';
import { updateStatus } from '@/lib/actions/drivers';
import {isBusinessActive} from '@/lib/utils';
import {Business} from '@/types/business';

export function StatusForm({ profile }: { profile: Business; }) {
	// const [checked, setChecked] = useState(profile.online);
	const [checked, setChecked] = useState(false);
	const router = useRouter();
	const isActive = isBusinessActive(profile);
	async function onChange(newValue: boolean) {
		setChecked(newValue);
		try {
			const response = await updateStatus(newValue);
			if (!response.success) {
				setChecked(!newValue)
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
			setChecked(!newValue)
			toast.error('Error', {
				// @ts-expect-error only
				description: e.message
			});
		}
	}
	
	return (
		<div className="relative inline-grid h-7 grid-cols-[1fr_1fr] items-center text-sm font-medium">
			<Switch
				checked={isActive && checked}
				onCheckedChange={setChecked}
				disabled={!isActive}
				className="peer data-[state=unchecked]:bg-input/50 absolute inset-0 h-[inherit] w-14 [&_span]:z-10 [&_span]:size-6.5 [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-7 [&_span]:data-[state=checked]:rtl:-translate-x-7"
				aria-label="Cambiar mi estado"
			/>
			<span className="pointer-events-none relative ml-0.5 flex min-w-8 items-center justify-center text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-6 peer-data-[state=unchecked]:rtl:-translate-x-6">
	          <XIcon className="size-4" aria-hidden="true"/>
	        </span>
			<span className="peer-data-[state=checked]:text-background pointer-events-none relative flex min-w-8 items-center justify-center text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:-translate-x-full peer-data-[state=unchecked]:invisible peer-data-[state=checked]:rtl:translate-x-full">
	          <CheckIcon className="size-4" aria-hidden="true"/>
	        </span>
		</div>
	);
}
