import * as z from "zod";
import {isValidPhoneNumber} from 'libphonenumber-js';
import {ActiveStatus} from '@/types';


export const PhoneSchemaWithoutMin = z.string()
	.refine(isValidPhoneNumber, { message: "Número de teléfono inválido" })

export const PhoneSchema = PhoneSchemaWithoutMin.min(10, "Número de teléfono inválido. Mínimo de 10 dígitos")

const PasswordSchema = z.string({ error: "Contraseña requerida" })
	.min(6, "Debe tener un mínimo de 6 caracteres");

export const EmailSchema = z.email({ error: "Correo electrónico requerido" });

export const PhoneLoginSchema = z.object({
	phone: PhoneSchema,
	password: PasswordSchema,
});

export const EmailLoginSchema = z.object({
	email: EmailSchema,
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
});

export const UpdatePhoneSchema = z.object({
	phone: PhoneSchema,
});

export const UpdateEmailSchema = z.object({
	email: EmailSchema,
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

export const ProfilesFilterSchema = z.object({
	columnId: z.string().nullable().optional(),
	value: z.string().optional().nullable(),
	name: z.string().optional(),
	profileId: z.string().nullable().optional(),
	statusFilters: z.object({
		[ActiveStatus.active]: z.boolean().optional().nullable(),
		[ActiveStatus.inactive]: z.boolean().optional().nullable(),
	}).optional().nullable(),
});

export type PhoneLoginFormValues = z.infer<typeof PhoneLoginSchema>;
export type EmailLoginFormValues = z.infer<typeof EmailLoginSchema>;
export type SignUpFormValues = z.infer<typeof SignUpSchema>;
export type ProfileFormValues = z.infer<typeof ProfileSchema>;
export type UpdatePhoneFormValues = z.infer<typeof UpdatePhoneSchema>;
export type UpdateEmailFormValues = z.infer<typeof UpdateEmailSchema>;
export type UpdatePasswordValues = z.infer<typeof UpdatePasswordSchema>;
export type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;
export type ProfilesFilterValues = z.infer<typeof ProfilesFilterSchema>;
