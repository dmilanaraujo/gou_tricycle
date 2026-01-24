'use client';

import React from 'react';
import {toast} from 'sonner';
import {Check, Upload, X} from 'lucide-react';
import {
	FileImage,
	FileUpload,
	FileUploadDropzone,
	FileUploadItem,
	FileUploadItemDelete,
	FileUploadItemMetadata,
	FileUploadItemPreview,
	FileUploadItemPrimary,
	FileUploadItemProgress,
	FileUploadList,
	FileUploadTrigger,
} from '@/components/ui/file-upload';
import {Button} from '@/components/ui/button';
import {useImageUpload} from '@/hooks/use-image-upload';
import {useConfirm} from '@/components/common/confirm-dialog-provider';
import {setDefaultImage} from '@/lib/actions/drivers';
import {useLoadingRouter} from '@/providers/navigation-loading-provider';
import {Business, ImageType} from '@/types/business';
import {getPublicImageUrl} from '@/lib/utils';

interface ImagesFormProps {
	bucket: string;
	profile: Business;
}

export function ImagesForm({ bucket, profile }: ImagesFormProps) {
	const router = useLoadingRouter();
	const [files, setFiles] = React.useState<FileImage[]>(
		profile.images?.map(image => ({
			image,
			isRemote: true,
			path: image.path,
			primary: image.primary,
			fullPublicUrl: getPublicImageUrl(bucket, image.path),
			thumbnailPublicUrl: image.path_thumbnail ? getPublicImageUrl(bucket, image.path_thumbnail) : undefined,
		}))
	);
	
	const { uploadImage, removeImage } = useImageUpload();
	const confirm = useConfirm();
	
	const refreshPrimaryValue = (path: string) => {
		const updatedFiles: FileImage[] = files?.map(f => ({
			...f,
			primary: f.path == path,
		})) || [];
		setFiles(updatedFiles);
	}
	
	const onUpload = React.useCallback(
		async (
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
			const toastId = toast.loading('Subiendo imágenes...')
			try {
				// Process each file individually
				const uploadPromises = files.map(async (file) => {
					try {
						const result = await uploadImage(
							bucket,
							file.file!,
							profile.id,
							ImageType.normal,
							(file, progress) => onProgress({ file, path: file.name, primary: false }, progress)
						);
						file.path = result.path;
						file.primary = false;
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
				toast.success('Imágenes subidas correctamente', {
					id: toastId
				});
			} catch (error) {
				// This handles any error that might occur outside the individual upload processes
				toast.error("Error subiendo las imágenes", { id: toastId })
				console.error("Unexpected error during upload:", error);
			}
		},
		[],
	);
	
	const onFileRemove = React.useCallback(async (file: FileImage) => {
		if (!!file.path || !!file.image?.path) {
			const toastId = toast.loading('Eliminando imagen...')
			const result = await removeImage(bucket,file.path || file.image!.path);
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
	
	const handleSetPrimary = React.useCallback(async (file: FileImage) => {
		if (file.primary || file.image?.primary) {
			return;
		}
		const prompt = await confirm({
			dialogTitle: 'Confirme',
			description: 'Desea cambiar la imagen por defecto?'
		})
		if (prompt) {
			const toastId = toast.loading('Actualizando imagen por defecto...')
			try {
				const path = file.path || file.image!.path;
				const result = await setDefaultImage(path);
				if (result) {
					refreshPrimaryValue(path);
					toast.success('Imagen por defecto actualizada correctamente', {
						id: toastId
					});
				} else {
					toast.error('Error actualizando la imagen por defecto', { id: toastId });
				}
			} catch (e) {
				toast.error('Error actualizando la imagen por defecto', { id: toastId });
			}
		}
	}, []);
	
	const maxFiles = 3;
	const maxSize = 3;
	return (
		<div className="space-y-6 w-full">
			<div className="flex justify-center mb-4">
				<div className="relative w-full">
					<FileUpload
						value={files}
						onValueChange={setFiles}
						maxFiles={maxFiles}
						maxSize={maxSize * 1024 * 1024}
						className="w-full"
						accept="image/*"
						onUpload={onUpload}
						onFileReject={onFileReject}
						onFileRemove={onFileRemove}
						multiple
						disabled={files.length == maxFiles}
					>
						<FileUploadDropzone>
							<div className="flex flex-col items-center gap-1 text-center">
								<div className="flex items-center justify-center rounded-full border p-2.5">
									<Upload className="size-6 text-muted-foreground" />
								</div>
								<p className="hidden md:block font-medium text-sm">Arrastre y suelte las imágenes aquí</p>
								{files.length == maxFiles ? (
									<p className="text-muted-foreground text-xs">
										Ya tiene el máximo de imágenes, para agregar una nueva elimine primero una de las existentes.
									</p>
								) : (
									 <>
										 <p className="hidden md:block text-muted-foreground text-xs">
											 O Toque para buscar las imágenes (máximo {maxFiles} imágenes y máximo {maxSize}MB cada una)
										 </p>
										 <p className="block md:hidden text-muted-foreground text-xs">
											 Toque para buscar las imágenes (máximo {maxFiles} imágenes y máximo {maxSize}MB cada una)
										 </p>
									 </>
								 )}
							
							</div>
							<FileUploadTrigger asChild>
								<Button variant="outline" size="sm" className="mt-2 w-fit">
									Busque las imágenes
								</Button>
							</FileUploadTrigger>
						</FileUploadDropzone>
						<FileUploadList orientation="horizontal" className='grid grid-cols-1 md:grid-cols-3'>
							{files.map((file, index) => (
								<FileUploadItem key={index} value={file} className="p-0">
									<FileUploadItemPreview className="w-full h-full">
										<FileUploadItemProgress circular={true}/>
									</FileUploadItemPreview>
									{/*<FileUploadItemPreview />*/}
									<FileUploadItemMetadata className="sr-only" />
									<FileUploadItemDelete asChild>
										<Button
											variant="secondary"
											size="icon"
											className="-top-1 -right-1 absolute size-5 rounded-full"
										>
											<X className="size-3" />
										</Button>
									</FileUploadItemDelete>
									<FileUploadItemPrimary asChild>
										<Button
											variant="ghost"
											size="icon"
											className="-bottom-1 left-0 absolute size-5 rounded-full"
											onClick={() => handleSetPrimary(file)}
										>
											<Check className="size-3" />
										</Button>
									</FileUploadItemPrimary>
								</FileUploadItem>
							))}
						</FileUploadList>
					</FileUpload>
				</div>
			</div>
		</div>
	);
}
