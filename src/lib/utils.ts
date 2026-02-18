import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {AuthError, PostgrestError} from '@supabase/supabase-js';
import {ActionError, BusinessDiscount, ImageType, OptimizedImages, UploadFileError, type VehicleType} from '@/types';
import imageCompression from 'browser-image-compression';
import {z} from 'zod';
import {Business} from '@/types/business';
import {toast} from 'sonner';
import {format, isAfter, isEqual, parseISO, startOfDay} from 'date-fns';

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
    const code = error.code;
    switch (error.code) {
        case "email_exists":
            return [{ code, message: 'El correo electrónico ya existe.' }]
        case "captcha_failed": // not_null_violation
            return [{ code, message: 'La verificación del captcha ha fallado.' }]
        case "email_address_invalid": // foreign_key_violation
            return [{ code, message: 'Use otro correo electrónico.' }]
        case "email_address_not_authorized": // unique_violation
            return [{ code, message: 'Este correo electrónico no está autorizado.' }]
        case "email_not_confirmed": // unique_violation
            return [{ code, message: 'Este correo electrónico no ha sido confirmado.' }]
        
        case "phone_exists":
            return [{ code, message: 'El teléfono ya existe.' }]
        case "phone_not_confirmed": // unique_violation
            return [{ code, message: 'Este teléfono no ha sido confirmado.' }]
        
        case "invalid_credentials": // check_violation
            return [{ code, message: 'Credenciales incorrectas' }]
        case "invite_not_found": // check_violation
            return [{ code, message: 'La invitación no existe o expiró' }]
        case "otp_expired": // check_violation
            return [{ code, message: 'El código expiró' }]
        case "same_password": // check_violation
            return [{ code, message: 'No puede usar la misma contraseña' }]
        case "session_expired": // check_violation
            return [{ code, message: 'Sesión expiró' }]
        case "sms_send_failed": // check_violation
            return [{ code, message: 'El envio del SMS ha fallado' }]
        case "user_already_exists": // check_violation
            return [{ code, message: 'El usuario ya existe' }]
        case "user_banned": // check_violation
            return [{ code, message: 'El usuario ha sido desabilitado' }]
        case "user_not_found": // check_violation
            return [{ code, message: 'El usuario no existe' }]
       
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

export const isProfileComplete = (profile: Business) => {
    return profile.name && profile.province && profile.municipality;
}

export const isBusinessActive = (business: Business) => {
    // if (!business.active_at) return false;
    // const inputDate = startOfDay(parseISO(business.active_at))
    // const today = startOfDay(new Date())
    // return isAfter(inputDate, today)
    return business.is_active;
}

export const isBusinessProducts = (business: Business) => {
    if (business.section.slug == 'transport'){
        return false;
    }
    return true;
}

export const combustionTypes: { value: VehicleType; label: string }[] = [
    { value: 'electric', label: 'Eléctrico' },
    { value: 'hybrid', label: 'Híbrido' },
    { value: 'combustion', label: 'Combustión' },
];

export async function optimizeImage(
    file: File,
    userId: string,
    type: ImageType,
    extraPath?: string,
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
        const compressionTasks = [
            imageCompression(file, fullSizeOptions)
        ];
        if (type == ImageType.normal) {
            compressionTasks.push(imageCompression(file, thumbnailOptions))
        }
        // Comprimir ambas versiones en paralelo
        const [fullSizeBlob, thumbnailBlob] = await Promise.all(compressionTasks);
        
        // Crear nombres únicos para Supabase
        const timestamp = Date.now();
        const thumbnailName = `${userId}${extraPath}/thumb_${!!imageIndex ? imageIndex + '_' : ''}${timestamp}.webp`;
        const fullSizeName = `${userId}${extraPath}/full_${!!imageIndex ? imageIndex + '_' : ''}${timestamp}.webp`;
        
        // Convertir Blobs a Files
        const thumbnailFile = type == ImageType.normal ? new File([thumbnailBlob], thumbnailName, {
            type: 'image/webp'
        }) : undefined;
        
        const fullSizeFile = new File([fullSizeBlob], fullSizeName, {
            type: 'image/webp'
        });
        
        // Crear URLs temporales para preview (opcional)
        const thumbnailUrl = type == ImageType.normal ? URL.createObjectURL(thumbnailBlob) : '';
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
 * Limpia las URLs temporales creadas para preview
 */
export function revokeImageUrls(images: OptimizedImages[]): void {
    images.forEach(img => {
        if (!!img.thumbnailUrl) {
            URL.revokeObjectURL(img.thumbnailUrl);
        }
        URL.revokeObjectURL(img.fullSizeUrl);
    });
}

export function getPublicImageUrl(bucket: string, path: string) {
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
}

export function getPublicBusinessImageUrl(path: string) {
    return getPublicImageUrl('business_images', path);
}

export function getPublicServiceImageUrl(path: string) {
    return getPublicImageUrl('service_images', path);
}

export const showActionErrors = (errors?: ActionError[], toastId?: string|number) => {
    errors?.forEach((error) => {
        toast.error('Error', {
            id: toastId,
            description: error.message,
        });
    });
}

export function getInitials(...words: string[]) {
    return words.filter(n => !!n).map(w => w.charAt(0).toUpperCase()).join('');
}

export function slugify(name: string) {
    const schema = z.string().slugify();
    return schema.parse(name);
}

export function formatDateByString(date: string, f: string = 'dd/MM/yyyy') {
    return format(parseISO(date), f);
}

export function applyDiscount(
    price: number,
    priceUsd: number,
    discount?: BusinessDiscount | null
) {
    if (!discount || !discount.is_active) {
        return {
            finalPrice: formatPrice(price, "CUP"),
            finalPriceUsd: formatPrice(priceUsd, "CUP"),
            label: null,
        }
    }

    if (discount.type === "percent") {
        const final = price - (price * discount.value) / 100
        const finalUsd = priceUsd - (priceUsd * discount.value) / 100

        return {
            finalPrice: formatPrice(final, "CUP"),
            finalPriceUsd: formatPrice(finalUsd, "CUP"),
            label: `-${discount.value}%`,
        }
    }

    if (discount.type === "fixed") {
        const final = price - discount.value
        const finalUsd = priceUsd - discount.value

        return {
            finalPrice: formatPrice(final, "CUP"),
            finalPriceUsd: formatPrice(finalUsd, "CUP"),
            label: `-$${discount.value}`,
        }
    }

    return {
        finalPrice: formatPrice(price, "CUP"),
        finalPriceUsd: formatPrice(priceUsd, "CUP"),
        label: null,
    }
}

function formatPrice(value: number, currency: "USD" | "CUP" = "USD",) {
    return new Intl.NumberFormat('es-CU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value)
}

export function isAfterOrEqual(date: Date, compareDate: Date = new Date()) {
    const today = startOfDay(compareDate);
    return  isAfter(date, today)  || isEqual(date, today);
}

export function isAfterToday(date: Date) {
    const today = startOfDay(new Date());
    return  isAfter(date, today);
}

export function getPublicUrl() {
    const url = process.env.NEXT_PUBLIC_SITE_URL! || '';
    return url.endsWith('/') ? url.slice(-1) : url;
}
