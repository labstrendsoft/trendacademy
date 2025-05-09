import Link from 'next/link';
import { UserAuthRegisterForm } from '../components/auth/register-form';

export default function RegisterView() {
	return (
		<div className="max-w-[400px] mx-auto min-h-screen flex items-center justify-center flex-col ">
			<h1 className="mb-8 text-center text-xl font-semibold uppercase text-white">
				Registrar Usuario
			</h1>
			<UserAuthRegisterForm />
			<div className="text-center mt-6">
				<p className="text-gray-400 text-sm flex gap-2 items-center">
					¿Tienes una cuenta?{' '}
					<Link
						href="/auth/login"
						className="text-pink-500 hover:text-pink-400"
					>
						Inicia Sesión
					</Link>
				</p>
			</div>
		</div>
	);
}
