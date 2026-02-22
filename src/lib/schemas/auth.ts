import * as z from "zod";
import {isValidPhoneNumber} from 'libphonenumber-js';


export const PhoneSchema = z.string().min(10, "Número de teléfono inválido")
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

export const ProfileSchema = z.object({
	name: z.string(),
	phone: PhoneSchema,
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

export type SignUpFormValues = z.infer<typeof SignUpSchema>;
export type ProfileFormValues = z.infer<typeof ProfileSchema>;
export type UpdatePasswordValues = z.infer<typeof UpdatePasswordSchema>;
export type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;
