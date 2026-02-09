import * as z from "zod";
import {isValidPhoneNumber} from 'libphonenumber-js';


const PhoneSchema = z.string().min(10, "Número de teléfono inválido")
	.refine(isValidPhoneNumber, { message: "Número de teléfono inválido" })

const PasswordSchema = z.string({ error: "Contraseña requerida" })
	.min(6, "Debe tener un mínimo de 6 caracteres");

export const LoginSchema = z.object({
	phone: PhoneSchema,
	password: PasswordSchema,
});
export const SignUpSchema = z.object({
	phone: PhoneSchema,
	name: z.string({ error: "El nombre es requerido" }).min(1, 'El nombre es requerido'),
	password: PasswordSchema,
	confirm_password: z.string({ error: "Valor requerido" })
		.min(6, "Debe tener un mínimo de 6 caracteres"),
}).refine(data => data.password === data.confirm_password, {
	message: "Las contraseñas no coinciden",
	path: ["confirm_password"],
});

export const CompleteProfileSchema = z.object({
	name: z.string(),
	section_id: z.string({ error: 'El tipo de negocio es requerido'}).min(1),
	whatsapp: PhoneSchema,
	province: z.string({ error: 'La provincia es requerida'}).min(1),
	municipality: z.string({ error: 'El municipio es requerido' }).min(1),
	description: z.string().optional(),
	address: z.string().optional(),
});

export const UpdateProfileSchema = CompleteProfileSchema.partial();

export const UpdatePasswordSchema = z.object({
	password: z.string({ error: "Valor requerido" })
		.min(6, "Debe tener un mínimo de 6 caracteres"),
	confirm_password: z.string({ error: "Valor requerido" })
		.min(6, "Debe tener un mínimo de 6 caracteres"),
}).refine(data => data.password === data.confirm_password, {
	message: "Las contraseñas no coinciden",
	path: ["confirm_password"],
});

export const ImageSchema = z.object({
	image: z
		.instanceof(File)
		.refine((file) => file.size <= 5 * 1024 * 1024, 'El archivo debe ser menor a 5MB')
		.refine(
			(file) => ['image/jpeg', 'image/png'].includes(file.type),
			'Solo se permiten archivos JPEG o PNG'
		),
});

export const ForgotPasswordSchema = z.object({
	phone: PhoneSchema,
	// captcha_token: z.string().optional().describe("Token del captcha"),
})

export const VerifyOtpSchema = z.object({
	phone: z.string({ error: "Valor requerido" }),
	otp: z.string({ error: "Valor requerido" }).describe("Codigo enviado via sms o whatsapp"),
	captcha_token: z.string().optional().describe("Token del captcha"),
})

export type UpdatePasswordValues = z.infer<typeof UpdatePasswordSchema>;
export type UpdateProfileValues = z.infer<typeof UpdateProfileSchema>;
export type CompleteProfileValues = z.infer<typeof CompleteProfileSchema>;
export type ImageFormValues = z.infer<typeof ImageSchema>;
export type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;
export type VerifyOtpFormValues = z.infer<typeof VerifyOtpSchema>;
