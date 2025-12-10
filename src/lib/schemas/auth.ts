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
	password: PasswordSchema,
	confirm_password: z.string({ error: "Valor requerido" })
		.min(6, "Debe tener un mínimo de 6 caracteres"),
}).refine(data => data.password === data.confirm_password, {
	message: "Las contraseñas no coinciden",
	path: ["confirm_password"],
});

export const UpdateUserSchema = z.object({
	phone: PhoneSchema.optional(),
	alias: z.string().optional(),
});

export const UpdatePasswordSchema = z.object({
	password: z.string({ error: "Valor requerido" })
		.min(6, "Debe tener un mínimo de 6 caracteres"),
	confirm_password: z.string({ error: "Valor requerido" })
		.min(6, "Debe tener un mínimo de 6 caracteres"),
}).refine(data => data.password === data.confirm_password, {
	message: "Las contraseñas no coinciden",
	path: ["confirm_password"],
});

export const AvatarSchema = z.object({
	avatar: z
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
export type UpdateUserValues = z.infer<typeof UpdateUserSchema>;
export type AvatarFormValues = z.infer<typeof AvatarSchema>;
export type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;
export type VerifyOtpFormValues = z.infer<typeof VerifyOtpSchema>;
