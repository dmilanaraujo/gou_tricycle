import { useState} from 'react';
import {ImageType, UploadedImage, UploadFileError} from '@/types';
import {getPublicImageUrl, optimizeImage, revokeImageUrls} from '@/lib/utils';
import {createClient} from '@/lib/supabase/client';

interface UseImageUploadReturn {
	uploadImage: (
		bucket: string,
		file: File,
		userId: string,
		type: ImageType,
		onProgress?: (file: File, progress: number) => void
	) => Promise<UploadedImage>;
	removeImage: (bucket: string, path: string) => Promise<boolean>;
	isUploading: boolean;
	progress: number;
	error: string | null;
}

export function useImageUpload(): UseImageUploadReturn {
	const [isUploading, setIsUploading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState<string | null>(null);
	
	const uploadImage = async (
		bucket: string,
		file: File,
		userId: string,
		type: ImageType,
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
			
			const optimizedImage = await optimizeImage(file, userId, type)
			setProgress(20);
			onProgress?.(file, 20);
			
			// Paso 2: Subir a Supabase (80% del progreso)
			if (optimizedImage.thumbnail) {
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
			}

			const { error: erroFullSize } = await supabase.storage
					.from(bucket)
					.upload(optimizedImage.fullSize.name, optimizedImage.fullSize, {
						cacheControl: '31536000',
						upsert: false,
						metadata: {
							business_id: userId,
							logo: type == ImageType.logo,
							banner: type == ImageType.banner,
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
			
			
			setProgress(95);
			onProgress?.(file, 95);
			
			const uploadedImage = {
				thumbnailUrl: optimizedImage.thumbnail ? getPublicImageUrl(bucket, optimizedImage.thumbnail.name) : '',
				fullSizeUrl: getPublicImageUrl(bucket, optimizedImage.fullSize.name),
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
	
	const removeImage = async (bucket: string, path: string) => {
		if (!path) {
			return false;
		}
		try {
			const supabase = createClient()
			const { error } = await supabase.storage
				.from(bucket)
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
