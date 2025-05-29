import ButtonAcademy from '@/common/components/custom/ButtonAcademy';
import { auth } from '@root/auth';
import CourseCardProgress from '@root/src/common/components/custom/CardCursoPogress';
import { CourseMe } from '@root/src/common/types/course';

export default async function CursosTop() {
	const session = await auth();
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_BACKEND}/course/enrollments/${session?.user.id}/preview`,
		{
			headers: {
				Authorization: `Bearer ${session?.user.token}`, // asegúrate que el token esté ahí
			},
		}
	);

	const cursos = await res.json();
	// Si no hay cursos, no retorna nada
	if (!cursos || cursos.length === 0) {
		return null;
	}
	return (
		<div className="bg-[#070A19] w-full overflow-hidden py-16">
			<div className="max-w-[1100px] mx-auto flex items-center h-full">
				<div className="text-white">
					<h2 className="text-xl font-bold text-white text-start mb-8">
						Mis Cursos
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-10  mx-auto">
						{cursos.map((curso: CourseMe) => (
							<CourseCardProgress key={curso.id} curso={curso} />
						))}
					</div>

					<div className="text-center mt-8">
						<ButtonAcademy
							href="/misCursos"
							variant="filled"
							className="bg-trendacademy-azul hover:bg-[#003366] py-2.5"
						>
							Ver todos
						</ButtonAcademy>
					</div>
				</div>
			</div>
		</div>
	);
}
