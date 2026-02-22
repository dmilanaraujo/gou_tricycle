'use client';

import { UseFormReturn} from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	FormControl, FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {LoaderCircle} from 'lucide-react';
import React from 'react';
import {NativeSelect, NativeSelectOption} from '@/components/ui/native-select';
import {municipalities, provinces} from '@/lib/data/locations';
import {Textarea} from '@/components/ui/textarea';
import {PhoneInput} from '@/components/ui/phone-input';
import {BusinessFormValues} from '@/lib/schemas/business';
import { ReusableForm } from '../common/reusable-form';
import {useGetSections} from '@/hooks/api/section';

interface BusinessFormProps {
	form: UseFormReturn<BusinessFormValues>
}

export function BusinessForm({form}: BusinessFormProps) {
	const { data: sections, isLoading: isLoadingSections } = useGetSections();
	// const { isValid, isSubmitting, isDirty, errors} = form.formState;
	const provinceValue = form.watch('province');
	
	return (
		<ReusableForm form={form} className='w-full space-y-6'>
			<div className='grid grid-cols-1 gap-4'>
				<FormField
					control={form.control}
					name='name'
					render={({field}) => (
						<FormItem>
							<FormLabel>Nombre del negocio<span className="text-red-600">*</span></FormLabel>
							<FormControl>
								<Input placeholder='Entre el nombre' {...field} />
							</FormControl>
							<FormDescription>
								Nombre que saldrá visible en las búsquedas
							</FormDescription>
							<FormMessage/>
						</FormItem>
					)}
				/>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<FormField
					control={form.control}
					name='section_id'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tipo de negocio<span className="text-red-600">*</span></FormLabel>
							<FormControl>
								<NativeSelect {...field} classNameContainer={'col-span-2 w-full'}>
									<NativeSelectOption value="">Seleccione...</NativeSelectOption>
									{sections?.map(p => (
										<NativeSelectOption key={p.id} value={p.id}>{p.name}</NativeSelectOption>
									))}
								</NativeSelect>
							</FormControl>
							<FormDescription>
								El tipo de su negocio
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="whatsapp"
					render={({field}) => (
						<FormItem className="space-y-0 mt-0">
							<FormLabel>Número de contacto<span className="text-red-600">*</span></FormLabel>
							<FormControl>
								<PhoneInput value={field.value} onChange={field.onChange} defaultCountry="CU" countries={['CU']}
								            international={false} placeholder='Entre el WhatsApp'/>
							</FormControl>
							<FormDescription>
								Número de contacto de WhatsApp
							</FormDescription>
							<FormMessage/>
						</FormItem>
					)}
				/>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<FormField
					control={form.control}
					name='province'
					render={({field}) => (
						<FormItem>
							<FormLabel>Provincia<span className="text-red-600">*</span></FormLabel>
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
							<FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='municipality'
					render={({field}) => (
						<FormItem>
							<FormLabel>Municipio<span className="text-red-600">*</span></FormLabel>
							<FormControl>
								<NativeSelect {...field} classNameContainer={'col-span-2 w-full'}>
									<NativeSelectOption value="">Seleccione...</NativeSelectOption>
									{(!!provinceValue && municipalities[provinceValue] || []).map(m => (
										<NativeSelectOption key={m.value} value={m.value}>{m.label}</NativeSelectOption>
									))}
								</NativeSelect>
							</FormControl>
							<FormDescription>
								Municipio actual donde operará
							</FormDescription>
							<FormMessage/>
						</FormItem>
					)}
				/>
			</div>
			<div className='grid grid-cols-1 gap-4'>
				<FormField
					control={form.control}
					name='description'
					render={({field}) => (
						<FormItem>
							<FormLabel>Descripción</FormLabel>
							<FormControl>
								<Textarea placeholder='Entre la descripción' {...field} />
							</FormControl>
							<FormDescription>
								Descripción de su negocio
							</FormDescription>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='address'
					render={({field}) => (
						<FormItem>
							<FormLabel>Dirección</FormLabel>
							<FormControl>
								<Textarea placeholder='Entre la dirección' {...field} />
							</FormControl>
							<FormDescription>
								Dirección física de su negocio si la tiene
							</FormDescription>
							<FormMessage/>
						</FormItem>
					)}
				/>
			</div>
			{/*<Button type='submit' className='w-full' disabled={!isValid || isSubmitting || !isDirty}>*/}
			{/*	{isSubmitting ? (*/}
			{/*		<span className="flex items-center">*/}
			{/*			<LoaderCircle className="mr-3 animate-spin"/>*/}
			{/*			{'Enviando...'}*/}
			{/*		</span>*/}
			{/*	) : 'Actualizar'*/}
			{/*	}*/}
			{/*</Button>*/}
		</ReusableForm>
	);
}
