'use client';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl, FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateProfileSchema, UpdateProfileValues} from '@/lib/schemas/auth';
import {toast} from 'sonner';
import {LoaderCircle} from 'lucide-react';
import React, {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {Driver} from '@/types';
import {updateProfile} from '@/lib/actions/profile';
import {NativeSelect, NativeSelectOption} from '@/components/ui/native-select';
import {municipalities, provinces} from '@/lib/data/locations';
import {combustionTypes} from '@/lib/utils';

export function ProfileForm({ driver }: { driver: Driver; }) {
	const router = useRouter();
	const form = useForm<UpdateProfileValues>({
		resolver: zodResolver(UpdateProfileSchema),
		defaultValues: {
			alias: driver.alias  || '',
			province: driver.province || '',
			municipality: driver.municipality || '',
			vehicle_type: driver.vehicle_type || '',
		},
	});
	
	const { isValid, isSubmitting, isDirty, errors} = form.formState;
	const provinceValue = form.watch('province');
	// 2. Define a submit handler.
	async function onSubmit(values: UpdateProfileValues) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		try {
			const response = await updateProfile(values);
			if (!response.success) {
				response.errors?.forEach((error) => {
					toast.error('Error', {
						description: error.message,
					});
				});
				return;
			}
			toast.success('Hecho!', {
				description: 'Datos actualizados',
			});
			router.refresh()
		} catch (e) {
			toast.error('Error', {
				// @ts-expect-error only
				description: e.message
			});
		}
		
	}
	
	return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='alias'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Alias</FormLabel>
									<FormControl>
										<Input placeholder='Entre su alias' {...field} />
									</FormControl>
									<FormDescription>
										Nombre que saldrá visible en las búsquedas
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='province'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Provincia</FormLabel>
									<FormControl>
										<NativeSelect {...field} classNameContainer={'col-span-2 w-full'}>
											<NativeSelectOption value="">Seleccione...</NativeSelectOption>
											{provinces.map(p => (
												<NativeSelectOption key={p.value} value={p.value}>{p.label}</NativeSelectOption>
											))}
										</NativeSelect>
									</FormControl>
									<FormDescription>
										Provincia actual donde operará
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='municipality'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Municipio</FormLabel>
									<FormControl>
										<NativeSelect {...field} classNameContainer={'col-span-2 w-full'} >
											<NativeSelectOption value="">Seleccione...</NativeSelectOption>
											{(!!provinceValue && municipalities[provinceValue] || []).map(m => (
												<NativeSelectOption key={m.value} value={m.value}>{m.label}</NativeSelectOption>
											))}
										</NativeSelect>
									</FormControl>
									<FormDescription>
										Municipio actual donde operará
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='vehicle_type'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tipo de combustible</FormLabel>
									<FormControl>
										<NativeSelect {...field} classNameContainer={'col-span-2 w-full'}>
											<NativeSelectOption value="">Seleccione...</NativeSelectOption>
											{combustionTypes.map(({ value, label }) => (
												<NativeSelectOption key={value} value={value}>{label}</NativeSelectOption>
											))}
										</NativeSelect>
									</FormControl>
									<FormDescription>
										Tipo de combustible de su vehículo
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type='submit' className='w-full' disabled={!isValid || isSubmitting || !isDirty}>
						{isSubmitting ? (
							<span className="flex items-center">
								<LoaderCircle  className="mr-3 animate-spin"/>
								{'Enviando...'}
							</span>
						) : 'Actualizar'
						}
					</Button>
				</form>
			</Form>
	);
}
