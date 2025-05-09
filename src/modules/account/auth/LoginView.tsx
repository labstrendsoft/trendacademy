import Link from 'next/link';
import { UserAuthForm } from '../components/auth/auth-form';

export default function LoginView() {
	return (
		<div className="max-w-[400px] mx-auto min-h-screen flex items-center justify-center flex-col ">
			<h1 className="mb-8 text-center text-xl font-semibold uppercase text-white">
				Iniciar sesión
			</h1>
			<UserAuthForm />
			<div className="text-center mt-6">
				<p className="text-gray-400 text-sm flex gap-2 items-center">
					¿No tienes una cuenta?{' '}
					<Link
						href="/auth/register"
						className="text-pink-500 hover:text-pink-400"
					>
						Regístrate
					</Link>
				</p>
			</div>
		</div>
	);
}
