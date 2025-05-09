'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, LogIn } from 'lucide-react';
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
import { LoginSchema } from '../../auth/shemas';
import { Login } from '../../auth/actions/login';

type ProductFormValues = z.infer<typeof LoginSchema>;

export function UserAuthForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	// const router = useRouter();
	// const { status } = useSession();

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			passwords: '',
		},
	});

	const onSubmit = async (data: ProductFormValues) => {
		setError('');
		setSuccess('');

		startTransition(() => {
			Login(data)
				.then((values) => {
					if (values?.error) {
						setError(values.error);
					}
					if (values?.success) {
						setSuccess(values.success);
						window.location.replace('/inicio');
					}
				})
				.catch(() => setError('algún problema ocurrió'));
		});
	};

	return (
		<div className=" grid w-full gap-6">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full font-montserrat-fuente "
				>
					<div className="grid gap-2">
						<div className="mb-1 grid gap-6">
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
												className="h-12 text-white bg-[#1a1d35] border-[#2a2d45] focus-visible:ring-0 focus-visible:border-gray-600 placeholder:text-gray-100/40"
												placeholder="name@example.com"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="passwords"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor={field.name} className="text-white mb-2">
											Contraseña
										</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													id={field.name}
													type={showPassword ? 'text' : 'password'}
													disabled={isPending}
													className="h-12 text-white bg-[#1a1d35] border-[#2a2d45] focus-visible:ring-0 focus-visible:border-gray-600 placeholder:text-gray-100/40"
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
						</div>
						<FormError message={error} />
						<FormSuccess message={success} />
						{isPending ? (
							<Button
								disabled
								className="w-full mt-4 text-base cursor-pointer bg-[#d11f73] hover:bg-[#d81b60] text-white h-12 shadow-lg shadow-[#e91e63]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#e91e63]/30"
							>
								<Loader2 className="mr-2 h-6 w-6 animate-spin" />
								Iniciar Sesión
							</Button>
						) : (
							<Button
								type="submit"
								className="w-full mt-4 text-base cursor-pointer bg-[#d11f73] hover:bg-[#d81b60] text-white h-12 shadow-lg shadow-[#e91e63]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#e91e63]/30"
							>
								<LogIn className="h-6 w-6" />
								Iniciar Sesión
							</Button>
						)}
					</div>
				</form>
			</Form>
		</div>
	);
}
