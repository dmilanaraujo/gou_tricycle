import { useState} from 'react';
import { UploadedImage, UploadFileError} from '@/types';
import {getPublicImageUrl, optimizeImage, revokeImageUrls} from '@/lib/utils';
import {createClient} from '@/lib/supabase/client';

interface UseImageUploadReturn {
	uploadImage: (file: File, userId: string, onProgress?: (file: File, progress: number) => void) => Promise<UploadedImage>;
	removeImage: (path: string) => Promise<boolean>;
	isUploading: boolean;
	progress: number;
	error: string | null;
}

export function useImageUpload(): UseImageUploadReturn {
	const [isUploading, setIsUploading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState<string | null>(null);
	
	const uploadImage = async (
		file: File,
		userId: string,
		onProgress?: (file: File, progress: number) => void
	): Promise<UploadedImage> => {
		setIsUploading(true);
		setProgress(0);
		setError(null);
		// setFile(null);
		
		try {
			const supabase = createClient()
			// Paso 1: Optimizar imágenes (20% del progreso)
			setProgress(10);
			onProgress?.(file, 10);
			
			const optimizedImage = await optimizeImage(file, userId)
			setProgress(20);
			onProgress?.(file, 20);
			
			// Paso 2: Subir a Supabase (80% del progreso)
			const bucket = 'driver_images';
			// try {
			const { error: errorThumbnail } = await supabase.storage
				.from(bucket)
				.upload(optimizedImage.thumbnail.name, optimizedImage.thumbnail, {
					cacheControl: '31536000', // 1 año
					upsert: false
				});
			setProgress(60);
			onProgress?.(file, 60);
			
			if (errorThumbnail) {
				throw new UploadFileError('Error al subir el thumbnail', file);
			}
			// try {
			const { error: erroFullSize } = await supabase.storage
					.from(bucket)
					.upload(optimizedImage.fullSize.name, optimizedImage.fullSize, {
						cacheControl: '31536000',
						upsert: false,
						metadata: {
							driver_id: userId
						}
					});
				setProgress(80);
				onProgress?.(file, 80);
				
			if (erroFullSize) {
				if (optimizedImage.thumbnailUrl) {
					await supabase.storage
						.from(bucket)
						.remove([optimizedImage.thumbnailUrl]);
				}
				throw new UploadFileError('Error al subir la imagen', file);
			}
			
			// } catch (err) {
			// 	throw new UploadFileError('Error al subir el thumbnail', file);
			// }
			

			// Paso 3: Obtener URLs públicas
			// const { data: thumbData } = supabase.storage
			// 	.from('driver-images')
			// 	.getPublicUrl(optimizedImage.thumbnail.name);
			//
			// setProgress(90);
			// onProgress?.(file, 90);
			//
			// const { data: fullData } = supabase.storage
			// 	.from('driver-images')
			// 	.getPublicUrl(optimizedImage.fullSize.name);
			
			setProgress(95);
			onProgress?.(file, 95);
			
			const uploadedImage = {
				// thumbnailUrl: thumbData.publicUrl,
				thumbnailUrl: getPublicImageUrl(optimizedImage.thumbnail.name),
				// fullSizeUrl: fullData.publicUrl,
				fullSizeUrl: getPublicImageUrl(optimizedImage.fullSize.name),
				path: optimizedImage.fullSize.name
			};
			
			// Limpiar URLs temporales
			revokeImageUrls([optimizedImage]);
			
			setProgress(100);
			onProgress?.(file, 100);
			
			return uploadedImage;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
			setError(errorMessage);
			throw err;
		} finally {
			setIsUploading(false);
		}
	};
	
	const removeImage = async (path: string) => {
		if (!path) {
			return false;
		}
		try {
			const supabase = createClient()
			const { error } = await supabase.storage
				.from('driver_images')
				.remove([path]);
		} catch (err) {
			return false;
		}
		return true;
	}
	
	
	return {
		uploadImage,
		removeImage,
		isUploading,
		progress,
		error
	};
}
