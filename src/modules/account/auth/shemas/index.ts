import * as z from 'zod';

const emailOrPhoneRegex =
	/^(\d{9}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

export const LoginSchema = z.object({
	email: z
		.string()
		.nonempty({ message: 'El campo no puede estar vacío' })
		.regex(emailOrPhoneRegex, {
			message:
				'Ingrese un correo electrónico válido o un número de celular de 9 dígitos',
		}),
	passwords: z.string({ required_error: 'Este campo es requerido' }).min(1, {
		message: 'Escriba su contraseña',
	}),
});

export const RegisterSchema = z
	.object({
		email: z.string().email({ message: 'Email inválido' }),
		password: z.string().min(6, { message: 'Mínimo 6 caracteres' }),
		confirmPassword: z.string().min(6, { message: 'Mínimo 6 caracteres' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Las contraseñas no coinciden',
		path: ['confirmPassword'],
	});
