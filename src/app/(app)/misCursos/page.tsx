import { auth } from '@root/auth';
import { MisCursosView } from '@root/src/modules/aplication/misCursos/MisCursosView';

export default async function MisCursos() {
	const session = await auth();
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_BACKEND}/course/enrollments/${session?.user.id}`,
		{
			headers: {
				Authorization: `Bearer ${session?.user.token}`, // asegúrate que el token esté ahí
			},
		}
	);

	const cursos = await res.json();
	return <MisCursosView cursos={cursos} />;
}
