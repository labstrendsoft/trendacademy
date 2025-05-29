import { auth } from '@root/auth';
import { CursosView } from '@root/src/modules/public/cursos/CursosView';

export default async function CursosDisponibles() {
	const session = await auth();

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_BACKEND}/course/available/${session?.user.id}`,
		{
			headers: {
				Authorization: `Bearer ${session?.user.token}`, // asegúrate que el token esté ahí
			},
		}
	);
	const cursos = await res.json();

	if (!cursos || cursos.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen text-center px-4 lg:px-0">
				<h2 className="text-2xl font-semibold text-gray-200 dark:text-white">
					¡Ya estás inscrito en todos los cursos disponibles! 🎉
				</h2>
				<p className="mt-2 text-gray-300 dark:text-gray-300">
					Estamos preparando nuevos cursos para ti. 🚀
				</p>
			</div>
		);
	}
	return <CursosView cursos={cursos} />;
}
