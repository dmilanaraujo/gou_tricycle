import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {AuthError, PostgrestError} from '@supabase/supabase-js';
import {ActionError, Driver, OptimizedImages, UploadFileError, type VehicleType} from '@/types';
import imageCompression from 'browser-image-compression';
import {z} from 'zod';
import {isAfter, parseISO, startOfDay} from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 * For production with a database like Supabase, it's more efficient to order randomly in the query itself.
 * Example with Supabase RPC: `await supabase.rpc('get_drivers_randomly', { p_province, p_municipality })`
 * where the SQL function would use `ORDER BY RANDOM()`.
 * @param array The array to shuffle.
 * @returns A new shuffled array.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export const formatZodErrors = (error: z.ZodError): ActionError[] =>
    error.issues.map((issue) => ({
        message: issue.message,
        path: issue.path || [],
    }));

export const formatSupabaseFunctionErrors = async (error: PostgrestError): Promise<ActionError[]> => {
  // if (error instanceof FunctionsHttpError) {
  //   const errorMessage = await error.context.json()
  //   console.log('Function returned an error', errorMessage)
  //   return [{ message: errorMessage }]
  // }
  // else if (error instanceof FunctionsRelayError) {
  //   return [{ message: 'customErrors.function_processing_error' }]
  // }
  // else if (error instanceof FunctionsFetchError) {
  //   return [{ message: 'customErrors.fetch_error' }]
  // }
  return [{ message: 'Ha ocurrido un error no especificado' }]
}


function parseConstraintError(
    error: PostgrestError,
    constraintMap: Record<string, string>
): string | null {
  if (!error) return null;
  
  for (const [constraint, msg] of Object.entries(constraintMap)) {
    if (error.message.includes(constraint)) {
      return msg;
    }
  }
  
  return null; // no match
}

export const formatSupabasePostgrestErrors = (error: PostgrestError, constraintMap: Record<string, string> = {}): ActionError[] => {
  console.log('Supabase Postgrest Error: ', {
    code: error.code,
    message: error.message,
  });
  const msgConstraint = parseConstraintError(error, constraintMap);
  if (msgConstraint) {
    return [{ message: msgConstraint}];
  }
  switch (error.code) {
    case "P0001": // raise_exception
      return [{ message: error.message }]
    case "23502": // not_null_violation
      return [{ message: 'El valor no puede ser nulo' }]
    case "23503": // foreign_key_violation
      return [{ message: 'El valor que intentas asignar no existe en la tabla relacionada' }]
    case "23505": // unique_violation
      return [{ message: 'Ya existe un registro con ese valor único.' }]
    
    case "23514": // check_violation
      return [{ message: 'El valor no cumple con las restricciones definidas' }]
    case "23000": // integrity_constraint_violation
    case "23001": // restrict_violation
    default:
      return [{ message: 'Ocurrió un error inesperado. Inténtalo más tarde' }];
  }
}

export const formatSupabaseAuthErrors = (error: AuthError): ActionError[] => {

    console.log('formatSupabaseAuthErrors', error);
    switch (error.code) {
        case "email_exists":
            return [{ message: 'El correo electrónico ya existe.' }]
        case "captcha_failed": // not_null_violation
            return [{ message: 'La verificación del captcha ha fallado.' }]
        case "email_address_invalid": // foreign_key_violation
            return [{ message: 'Use otro correo electrónico.' }]
        case "email_address_not_authorized": // unique_violation
            return [{ message: 'Este correo electrónico no está autorizado.' }]
        case "email_not_confirmed": // unique_violation
            return [{ message: 'Este correo electrónico no ha sido confirmado.' }]
        
        case "phone_exists":
            return [{ message: 'El teléfono ya existe.' }]
        case "phone_not_confirmed": // unique_violation
            return [{ message: 'Este teléfono no ha sido confirmado.' }]
        
        case "invalid_credentials": // check_violation
            return [{ message: 'Credenciales incorrectas' }]
        case "invite_not_found": // check_violation
            return [{ message: 'La invitación no existe o expiró' }]
        case "otp_expired": // check_violation
            return [{ message: 'El código expiró' }]
        case "same_password": // check_violation
            return [{ message: 'No puede usar la misma contraseña' }]
        case "session_expired": // check_violation
            return [{ message: 'Sesión expiró' }]
        case "sms_send_failed": // check_violation
            return [{ message: 'El envio del SMS ha fallado' }]
        case "user_already_exists": // check_violation
            return [{ message: 'El usuario ya existe' }]
        case "user_banned": // check_violation
            return [{ message: 'El usuario ha sido desabilitado' }]
        case "user_not_found": // check_violation
            return [{ message: 'El usuario no existe' }]
       
        default:
            if (error.message == "fetch failed") {
              return [{ message: 'Problemas de conexión. Inténtalo más tarde' }]
            }
            return [{ message: 'Ocurrió un error inesperado. Inténtalo más tarde' }];
    }
}

export const getTimeBySeconds = (secondsTime: number) => {
    const minutes = Math.floor(secondsTime / 60);
    const seconds = secondsTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export const isProfileComplete = (profile: Driver) => {
    return !(profile.images.length == 0 || !profile.alias || !profile.province || !profile.municipality || !profile.vehicle_type);
}
export const incompleteProfileData = (profile: Driver) => {
    const incompleteData = [];
    if (profile.images.length == 0) {
        incompleteData.push('Imágenes');
    }
    if (!profile.alias) {
        incompleteData.push('Alias');
    }
    if (!profile.province) {
        incompleteData.push('Provincia');
    }
    if (!profile.municipality) {
        incompleteData.push('Municipio');
    }
    if (!profile.vehicle_type) {
        incompleteData.push('Tipo combustible');
    }
    return incompleteData;
}

export const isDriverActive = (driver: Driver) => {
    if (!driver.active_at) return false;
    const inputDate = startOfDay(parseISO(driver.active_at))
    const today = startOfDay(new Date())
    return isAfter(inputDate, today)
}

export const combustionTypes: { value: VehicleType; label: string }[] = [
    { value: 'electric', label: 'Eléctrico' },
    { value: 'hybrid', label: 'Híbrido' },
    { value: 'combustion', label: 'Combustión' },
];

export async function optimizeImage(
    file: File,
    userId: string,
    imageIndex?: number
): Promise<OptimizedImages> {
    
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
        throw new Error('El archivo debe ser una imagen');
    }
    
    // Configuración para thumbnail (avatar en lista)
    const thumbnailOptions = {
        maxSizeMB: 0.08,
        maxWidthOrHeight: 150,
        useWebWorker: true,
        fileType: 'image/webp',
        initialQuality: 0.8
    };
    
    // Configuración para imagen completa (carrusel)
    const fullSizeOptions = {
        maxSizeMB: 0.15, // 150KB máximo
        maxWidthOrHeight: 1200,
        useWebWorker: true,
        fileType: 'image/webp',
        initialQuality: 0.8
    };
    
    try {
        // Comprimir ambas versiones en paralelo
        const [thumbnailBlob, fullSizeBlob] = await Promise.all([
            imageCompression(file, thumbnailOptions),
            imageCompression(file, fullSizeOptions)
        ]);
        
        // Crear nombres únicos para Supabase
        const timestamp = Date.now();
        const thumbnailName = `${userId}/thumb_${!!imageIndex ? imageIndex + '_' : ''}${timestamp}.webp`;
        const fullSizeName = `${userId}/full_${!!imageIndex ? imageIndex + '_' : ''}${timestamp}.webp`;
        
        // Convertir Blobs a Files
        const thumbnailFile = new File([thumbnailBlob], thumbnailName, {
            type: 'image/webp'
        });
        
        const fullSizeFile = new File([fullSizeBlob], fullSizeName, {
            type: 'image/webp'
        });
        
        // Crear URLs temporales para preview (opcional)
        const thumbnailUrl = URL.createObjectURL(thumbnailBlob);
        const fullSizeUrl = URL.createObjectURL(fullSizeBlob);
        
        return {
            thumbnail: thumbnailFile,
            fullSize: fullSizeFile,
            thumbnailUrl,
            fullSizeUrl
        };
    } catch (error) {
        console.error('Error al optimizar imagen:', error);
        throw new UploadFileError('No se pudo optimizar la imagen', file);
    }
}

/**
 * Procesa múltiples imágenes (hasta 3 para el perfil)
 */
export async function optimizeMultipleImages(
    files: File[],
    userId: string
): Promise<OptimizedImages[]> {
    
    // if (files.length > 3) {
    //     throw new Error('Máximo 3 imágenes permitidas');
    // }
    
    const optimizationPromises = files.map((file, index) =>
        optimizeImage(file, userId, index)
    );
    
    return Promise.all(optimizationPromises);
}

/**
 * Limpia las URLs temporales creadas para preview
 */
export function revokeImageUrls(images: OptimizedImages[]): void {
    images.forEach(img => {
        URL.revokeObjectURL(img.thumbnailUrl);
        URL.revokeObjectURL(img.fullSizeUrl);
    });
}

export function getPublicImageUrl(path: string) {
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/driver_images/${path}`;
}
