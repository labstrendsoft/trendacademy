import ButtonAcademy from '@/common/components/custom/ButtonAcademy';
import CourseCard from '@root/src/common/components/custom/CardCurso';
import { Course } from '@root/src/common/types/course';
// import CourseCard from '@/common/components/custom/CardCurso';
// import Curso1 from '@public/curso1.png';
// import Curso2 from '@public/curso2.png';
// import Curso3 from '@public/curso3.png';
export default async function NuevosCursos() {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_BACKEND}/course/recent`
	);

	const cursos = await res.json();
	// Si no hay cursos, no retorna nada
	if (!cursos || cursos.length === 0) {
		return null;
	}
	return (
		<div className="text-white">
			<h2 className="text-xl font-bold text-white text-start mb-8">
				Nuevos Cursos
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-10  mx-auto">
				{cursos.map((curso: Course) => (
					<CourseCard key={curso.id} curso={curso} />
				))}
			</div>

			<div className="text-center mt-8">
				<ButtonAcademy
					href="/cursos-disponibles"
					variant="filled"
					className="bg-trendacademy-azul hover:bg-[#003366] py-2.5"
				>
					Ver todos los cursos
				</ButtonAcademy>
			</div>
		</div>
	);
}
