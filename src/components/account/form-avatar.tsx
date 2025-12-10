'use client';

import {ControllerRenderProps, useForm} from 'react-hook-form';
import React, {ChangeEvent, useEffect, useRef} from 'react';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { AvatarFormValues, AvatarSchema } from '@/lib/schemas/auth';
import { uploadAvatar } from '@/lib/actions/auth';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import { User } from '@supabase/auth-js';
import {Camera, User2} from 'lucide-react';

interface AvatarFormProps {
	user: User;
}

export function AvatarForm({ user }: AvatarFormProps) {
	const [previewUrl, setPreviewUrl] = useState<string | null>(user.user_metadata?.avatar_url || null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	
	const form = useForm<AvatarFormValues>({
		resolver: zodResolver(AvatarSchema),
	});
	
	useEffect(() => {
		return () => {
			if (previewUrl) URL.revokeObjectURL(previewUrl);
		};
	}, [previewUrl]);
	
	const onSubmit = async (data: AvatarFormValues) => {
		try {
			const response = await uploadAvatar(data);
			if (!response.success) {
				response.errors?.forEach((error) => {
					toast.error('Error', {
						description: error.message,
					});
				});
				return;
			}
			setPreviewUrl(response.data!);
			toast.success('Hecho!', {
				description: 'Imagen subida',
			});
		} catch (e: unknown) {
			toast.error('Error', {
				// @ts-expect-error only
				description: t(e.message)
			});
		}
	};
	
	const { user_metadata } = user || {};
	const { first_name } = user_metadata || {};
	const avatarFallback = first_name?.charAt(0).toUpperCase();
	
	const handleAvatarClick = () => {
		fileInputRef.current?.click();
	};
	
	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>, field: ControllerRenderProps<AvatarFormValues>) => {
		const file = e.target.files?.[0];
		if (file) {
			field.onChange(file);
			setPreviewUrl(URL.createObjectURL(file)); // Vista previa local
			await form.handleSubmit(onSubmit)(); // Dispara el envío del formulario
		} else {
			setPreviewUrl(null)
		}
	};
	
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
				<div className="flex justify-center mb-4">
					<div className="relative">
						<Avatar className="w-24 h-24 border-4 border-white bg-white">
							<AvatarImage src={previewUrl || "Avatar"} alt="Avatar" className="object-cover aspect-square"/>
							<AvatarFallback className="text-9xl">
								{avatarFallback ? avatarFallback : <User2 className="text-primary w-24 h-24"/>}
							</AvatarFallback>
						</Avatar>
						<FormLabel
							onClick={handleAvatarClick}
							className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-full cursor-pointer border-4 border-white"
						>
							<Camera className="w-5 h-5"/>
						</FormLabel>
						
						<FormField
							control={form.control}
							name="avatar"
							render={({field}) => (
								<FormItem>
									<div className="flex items-center space-x-4">
										<FormControl>
											<Input
												type="file"
												accept="image/*"
												className="hidden"
												ref={fileInputRef}
												onChange={(e) => handleFileChange(e, field)}
											/>
										</FormControl>
									</div>
									<FormMessage/>
								</FormItem>
							)}
						/>
					
					</div>
				</div>
			</form>
		</Form>
	);
}
