"use client";

import { Button } from "@/components/ui/button";
import React from 'react';
import {Check, Copy, LoaderCircle} from 'lucide-react';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {useForm} from 'react-hook-form';
import {BusinessSettingsCatalogSchema, BusinessSettingsCatalogValues} from '@/lib/schemas/business';
import {zodResolver} from '@hookform/resolvers/zod';
import {toast} from 'sonner';
import {useUpdateSettingsCatalog} from '@/hooks/api/business';
import {useProfile} from '@/providers/profile-provider';
import {InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText} from '@/components/ui/input-group';
import {getPublicUrl} from '@/lib/utils';
import {useCopyToClipboard} from '@/hooks/use-copy-to-clipboard';

export function CatalogForm() {
	const profile = useProfile();
	const baseUrl = getPublicUrl();
	const [ copyToClipboard, isCopied ]= useCopyToClipboard()
	const form = useForm<BusinessSettingsCatalogValues>({
		resolver: zodResolver(BusinessSettingsCatalogSchema),
		defaultValues: {
			slug: profile.slug || '',
		},
		mode: 'all'
	});
	const { mutateAsync: updateSettingsCatalog, isPending: isPendingUpdate } = useUpdateSettingsCatalog();
	const { isValid, isSubmitting} = form.formState;
	
	// 2. Define a submit handler.
	async function onSubmit(values: BusinessSettingsCatalogValues) {
		// Do something with the form values.
		try {
			const response = await updateSettingsCatalog({
				businessId: profile.id,
				params: values
			});
			if (!response.success) {
				response.errors?.forEach((error) => {
					toast.error('Error', {
						description: error.message,
					});
				});
				return;
			}
			toast.success('Hecho', {
				description: 'Datos actualizados correctamente',
			});
		} catch (e) {
			toast.error('Error', {
				// @ts-expect-error only
				description: e.message
			});
		}
		
	}
	
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="grid grid-cols-1 w-full">
					<FormField
						control={form.control}
						name="slug"
						render={({field}) => (
							<FormItem>
								<FormLabel>Url de su catálogo</FormLabel>
								<FormControl>
									<InputGroup>
										<InputGroupAddon>
											<InputGroupText>{baseUrl}/c/</InputGroupText>
										</InputGroupAddon>
										<InputGroupInput placeholder="mi-negocio" className="!pl-0.5" {...field}/>
										<InputGroupAddon align="inline-end" className='!m-0'>
											<InputGroupButton
												aria-label="Copy"
												title="Copiar enlace del catálogo"
												className='cursor-pointer'
												size="icon-xs"
												onClick={async () => {
													await copyToClipboard(`${baseUrl}/c/${field.value}`)
												}}
											>
												{isCopied ? <Check /> : <Copy />}
											</InputGroupButton>
										</InputGroupAddon>
									</InputGroup>
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit" className="w-full" disabled={!isValid || isSubmitting}>
					{isSubmitting ? (
						<span className="flex items-center">
						<LoaderCircle  className="mr-3 animate-spin"/>
							Enviando...
					</span>
					) : 'Actualizar' }
				</Button>
			</form>
		</Form>
	);
}
