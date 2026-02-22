'use client';

import React from 'react';
import { toast } from 'sonner';
import { ImageOff,  Trash2} from 'lucide-react';
import {
	FileImage,
	FileUpload,
	FileUploadDropzone,
	FileUploadItem, FileUploadItemDelete,
	FileUploadItemMetadata,
	FileUploadItemPreview,
	FileUploadItemProgress,
	FileUploadList,
	FileUploadTrigger,
} from '@/components/ui/file-upload';
import {Button} from '@/components/ui/button';
import {useImageUpload} from '@/hooks/use-image-upload';
import {useConfirm} from '@/components/common/confirm-dialog-provider';
import {useLoadingRouter} from '@/providers/navigation-loading-provider';
import {ImageType} from '@/types/business';
import {getPublicImageUrl} from '@/lib/utils';
import {useBusiness} from '@/providers/business-provider';

interface LogoBannerFormProps {
	bucket: string;
}

export function LogoBannerForm({ bucket }: LogoBannerFormProps) {
	const business = useBusiness()
	const router = useLoadingRouter();
	const [logo, setLogo] = React.useState<FileImage[]>(business.logo ? [{
		isRemote: true,
		path: business.logo,
		primary: false,
		fullPublicUrl: getPublicImageUrl(bucket, business.logo),
	}] : []);
	const [banner, setBanner] = React.useState<FileImage[]>(business.banner ?[{
		isRemote: true,
		path: business.banner,
		primary: false,
		fullPublicUrl: getPublicImageUrl(bucket, business.banner),
	}] : []);

	const { uploadImage, removeImage } = useImageUpload();
	const confirm = useConfirm();
	
	const onUpload = React.useCallback(
		async (
			type: ImageType,
			files: FileImage[],
			{
				onProgress,
				onSuccess,
				onError,
			}: {
				onProgress: (file: FileImage, progress: number) => void;
				onSuccess: (file: FileImage) => void;
				onError: (file: FileImage, error: Error) => void;
			},
		) => {
			const toastId = toast.loading('Subiendo imagen...')
			try {
				// Process each file individually
				const uploadPromises = files.map(async (file) => {
					try {
						const result = await uploadImage({
							bucket,
							file: file.file!,
							businessId: business.id,
							type,
						    onProgress:	(file, progress) => onProgress({ file, path: file.name, primary: false }, progress)
						});
						file.path = result.path;
						onSuccess(file);
					} catch (error) {
						onError(
							file,
							error instanceof Error ? error : new Error("La subida ha fallado"),
						);
						throw error;
						// toast.error("Error subiendo la imagen", { id: toastId })
					}
				});

				// Wait for all uploads to complete
				await Promise.all(uploadPromises);
				router.refresh()
				toast.success('Imagen subida correctamente', {
					id: toastId
				});
			} catch (error) {
				// This handles any error that might occur outside the individual upload processes
				toast.error("Error subiendo la imagen", { id: toastId })
				console.error("Unexpected error during upload:", error);
			}
		},
		[],
	);
	
	const onFileRemove = React.useCallback(async (type: ImageType, file: FileImage) => {
		if (!!file.path || !!file.image?.path) {
			const toastId = toast.loading('Eliminando imagen...')
			const result = await removeImage(bucket, file.path || file.image!.path);
			if (result) {
				toast.success('Imagen eliminada correctamente', {
					id: toastId
				});
			} else {
				toast.error('Error eliminando la imagen', { id: toastId });
				throw new Error('Error eliminando la imagen');
			}
		}
	}, []);
	
	const onFileReject = React.useCallback((file: FileImage, message: string) => {
		toast(message, {
			description: `"${file.file!.name.length > 20 ? `${file.file!.name.slice(0, 20)}...` : file.file!.name}" ha sido rechazado`,
		});
	}, []);
	
	const maxFiles = 1;
	const maxSize = 3;
	return (
		<div className="space-y-10 w-full pt-4">
			<div>
				<h3 className="text-lg font-medium text-muted-foreground">Logotipo</h3>
				<div className="flex justify-center mb-4">
					<div className="relative w-full">
						<FileUpload
							value={logo}
							onValueChange={setLogo}
							maxFiles={maxFiles}
							maxSize={maxSize * 1024 * 1024}
							className="w-full"
							accept="image/*"
							onUpload={async (files, options) => {
								await onUpload(ImageType.logo, files, options);
							}}
							onFileReject={onFileReject}
							onFileRemove={async (file) => {
								await onFileRemove(ImageType.logo, file);
							}}
							multiple
							// disabled={logo.length == maxFiles}
						>
							{/*<FileUploadDropzone>*/}
							<div className="flex flex-col items-center gap-1 text-center rounded-lg border-2 border-dashed outline-none pb-6">
								<div className="flex items-center justify-center rounded-full w-full">
									<FileUploadList orientation="horizontal" className="border-none w-full min-h-24">
										{logo.map((file, index) => (
											<FileUploadItem key={index} value={file} className="p-0 w-full h-full border-none flex-row items-center justify-center">
												<FileUploadItemPreview className="size-40 rounded-full border-none my-6"/>
												<FileUploadItemMetadata className="sr-only"/>
												<FileUploadItemDelete asChild>
													{/*<Button*/}
													{/*	variant="secondary"*/}
													{/*	size="icon"*/}
													{/*	className="-top-1 -right-1 absolute size-5 rounded-full"*/}
													{/*>*/}
													{/*	<X className="size-3"/>*/}
													{/*</Button>*/}
													<Button
														variant="destructive"
														size="sm"
														title={'Eliminar logotipo'}
														className="top-0 right-0 absolute cursor-pointer"
													>
														<Trash2 className="size-3"/>
														Eliminar
													</Button>
												</FileUploadItemDelete>
											</FileUploadItem>
										))}
									</FileUploadList>
								
								</div>
								
								{logo.length == maxFiles ? (
									<p className="text-muted-foreground text-xs">
										Para subir un nuevo logotipo elimine el actual.
									</p>
								) : (
									<div className='pt-6 flex justify-center flex-col items-center'>
										<ImageOff className="size-6 text-muted-foreground"/>
										<p className="p-2 text-muted-foreground text-xs">
											Toque para buscar la imagen, máximo {maxSize}MB cada una)
										</p>
									</div>
								
								)}
								{logo.length == 0 && (
									<FileUploadTrigger asChild>
										<Button variant="outline" size="sm" className="mt-4 w-fit">
											Busque el logotipo
										</Button>
									</FileUploadTrigger>
								)}
							</div>

							
							{/*</FileUploadDropzone>*/}
						</FileUpload>
					</div>
				</div>
			</div>
			
			<div>
				<h3 className="text-lg font-medium text-muted-foreground">Banner</h3>
				<div className="flex justify-center mb-4">
					<div className="relative w-full">
						<FileUpload
							value={banner}
							onValueChange={setBanner}
							maxFiles={maxFiles}
							maxSize={maxSize * 1024 * 1024}
							className="w-full"
							accept="image/*"
							onUpload={async (files, options) => {
								await onUpload(ImageType.banner, files, options);
							}}
							onFileReject={onFileReject}
							onFileRemove={async (file) => {
								await onFileRemove(ImageType.banner, file);
							}}
							multiple
							// disabled={banner.length == maxFiles}
						>
							<FileUploadList orientation="horizontal" className={'w-full border-none p-0 min-h-24'}>
								{banner.length == 0 && <ImageOff className="size-6 text-muted-foreground"/>}
								{banner.map((file, index) => (
									<FileUploadItem key={index} value={file} className="p-0 w-full">
										<FileUploadItemPreview className="w-full h-full rounded-none overflow-hidden">
											<FileUploadItemProgress circular={true}/>
										</FileUploadItemPreview>
										{/*<FileUploadItemPreview />*/}
										<FileUploadItemMetadata className="sr-only"/>
										<FileUploadItemDelete asChild>
											<Button
												variant="destructive"
												size="sm"
												title={'Eliminar banner'}
												className="top-2 right-2 absolute cursor-pointer"
											>
												<Trash2 className="size-3"/>
												Eliminar
											</Button>
										</FileUploadItemDelete>
									</FileUploadItem>
								))}
							</FileUploadList>
							<FileUploadDropzone>
								<div className="flex flex-col items-center gap-1 text-center w-full">
									{banner.length == maxFiles ? (
										<p className="text-muted-foreground text-xs">
											Para subir un nuevo banner elimine el actual.
										</p>
									) : (
										 <>
											 <p className="hidden md:block font-medium text-sm">Arrastre y suelte su banner aquí</p>
											 <p className="hidden md:block text-muted-foreground text-xs">
												 O Toque para buscar la imagen, máximo {maxSize}MB cada una)
											 </p>
											 <p className="block md:hidden text-muted-foreground text-xs">
												 Toque para buscar la imagen, máximo {maxSize}MB cada una)
											 </p>
										 </>
									 )}
								
								</div>
								{banner.length == 0 && (
									<FileUploadTrigger asChild>
										<Button variant="outline" size="sm" className="mt-2 w-fit">
											Busque el banner
										</Button>
									</FileUploadTrigger>
								)}
							</FileUploadDropzone>
						</FileUpload>
					</div>
				</div>
			</div>
		
		</div>
	);
}
