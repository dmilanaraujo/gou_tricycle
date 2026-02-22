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
import { zodResolver } from '@hookform/resolvers/zod';
import {toast} from 'sonner';
import {LoaderCircle} from 'lucide-react';
import React from 'react';
import {updateBusiness} from '@/lib/actions/business';
import {NativeSelect, NativeSelectOption} from '@/components/ui/native-select';
import {municipalities, provinces} from '@/lib/data/locations';
import {useLoadingRouter} from '@/providers/navigation-loading-provider';
import {Business} from '@/types/business';
import {Textarea} from '@/components/ui/textarea';
import {PhoneInput} from '@/components/ui/phone-input';
import {useGetSections} from '@/hooks/api/section';
import {BusinessFormValues, BusinessSchema} from '@/lib/schemas/business';

export function FormProfileForm({ business }: { business: Business; }) {
	const router = useLoadingRouter();
	const form = useForm<BusinessFormValues>({
		resolver: zodResolver(BusinessSchema),
		defaultValues: {
			name: business.name  || '',
			description: business.description  || '',
			province: business.province || '',
			municipality: business.municipality || '',
			address: business.address || '',
			whatsapp: business.whatsapp || '',
		},
	});
	
	const { data: sections, isLoading: isLoadingSections } = useGetSections();
	
	const { isValid, isSubmitting, isDirty, errors} = form.formState;
	const provinceValue = form.watch('province');
	// 2. Define a submit handler.
	async function onSubmit(values: BusinessFormValues) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		try {
			const response = await updateBusiness({id: business.id, ...values});
			if (!response.success) {
				response.errors?.forEach((error) => {
					toast.error('Error', {
						description: error.message,
					});
				});
				return;
			}
			toast.success('Hecho!', {
				description: 'Perfil actualizado',
			});
			router.push('/me');
			// router.refresh()
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
					<div className='grid grid-cols-1 gap-4'>
						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
							<FormField
								control={form.control}
								name='province'
								render={({ field }) => (
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
										<FormMessage />
									</FormItem>
								)}
							/>
							
							<FormField
								control={form.control}
								name='municipality'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Municipio<span className="text-red-600">*</span></FormLabel>
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
						</div>
					
						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Descripción</FormLabel>
									<FormControl>
										<Textarea placeholder='Entre la descripción' {...field} />
									</FormControl>
									<FormDescription>
										Descripción de su negocio
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='address'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Dirección</FormLabel>
									<FormControl>
										<Textarea placeholder='Entre la dirección' {...field} />
									</FormControl>
									<FormDescription>
										Dirección física de su negocio si la tiene
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
						) : 'Guardar'
						}
					</Button>
				</form>
			</Form>
	);
}
