'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { FormError } from './form-error';
import { FormSuccess } from './form-exitoso';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@shadcnui/form';
import { Input } from '@shadcnui/input';
import { Button } from '@shadcnui/button';
import { RegisterSchema } from '../../auth/shemas';
import { signIn } from 'next-auth/react';

type ProductFormValues = z.infer<typeof RegisterSchema>;

export function UserAuthRegisterForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (data: ProductFormValues) => {
		setError('');
		setSuccess('');
		const { email, password } = data;
		startTransition(async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_BACKEND}/auth/register`,
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ email, password }),
					}
				);

				const json = await res.json();

				if (!res.ok) {
					throw new Error(json.message || 'Algo salió mal');
				}

				setSuccess('Registro exitoso. ¡Bienvenido!');
				form.reset();
				const signInRes = await signIn('credentials', {
					email: data.email,
					password: data.password,
					redirect: false, // <== controlamos nosotros la redirección
				});

				if (signInRes?.ok) {
					window.location.replace('/inicio');
				} else {
					throw new Error('Error al iniciar sesión automáticamente');
				}

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				setError(err.message || 'Error al registrar');
			}
		});
	};

	return (
		<div className="grid w-full gap-6">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full font-montserrat-fuente"
				>
					<div className="grid gap-2">
						<div className="mb-1 grid gap-6">
							{/* Email */}
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-white mb-2">Email</FormLabel>
										<FormControl>
											<Input
												type="text"
												disabled={isPending}
												className="h-12 text-white bg-[#070A19] border-[#161A31] focus-visible:ring-0 focus-visible:border-gray-600 placeholder:text-gray-100/40"
												placeholder="name@example.com"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Password */}
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-white mb-2">
											Contraseña
										</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													type={showPassword ? 'text' : 'password'}
													disabled={isPending}
													className="h-12 text-white bg-[#070A19] border-[#161A31] focus-visible:ring-0 focus-visible:border-gray-600 placeholder:text-gray-100/40"
													placeholder="Escribe tu contraseña"
													{...field}
												/>
												<Button
													type="button"
													variant="ghost"
													size="icon"
													className="absolute top-0 right-0 h-full cursor-pointer hover:bg-transparent text-white hover:text-white"
													onClick={() => setShowPassword(!showPassword)}
													disabled={!field.value}
												>
													{showPassword ? (
														<EyeOff className="h-5 w-5" />
													) : (
														<Eye className="h-5 w-5" />
													)}
												</Button>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Confirmar contraseña */}
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-white mb-2">
											Confirmar contraseña
										</FormLabel>
										<FormControl>
											<Input
												type={showPassword ? 'text' : 'password'}
												disabled={isPending}
												className="h-12 text-white bg-[#070A19] border-[#161A31] focus-visible:ring-0 focus-visible:border-gray-600 placeholder:text-gray-100/40"
												placeholder="Vuelve a escribir tu contraseña"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormError message={error} />
						<FormSuccess message={success} />

						<Button
							type="submit"
							disabled={isPending}
							className="w-full mt-4 text-base cursor-pointer bg-[#d11f73] hover:bg-[#d81b60] text-white h-12 shadow-lg shadow-[#e91e63]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#e91e63]/30"
						>
							{isPending ? (
								<>
									<Loader2 className="mr-2 h-6 w-6 animate-spin" />
									Registrando...
								</>
							) : (
								<>Registrar cuenta</>
							)}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
