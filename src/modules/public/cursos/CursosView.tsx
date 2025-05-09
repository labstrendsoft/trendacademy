import React from 'react';
import ImagenNoDisponible from '@public/imagenNoDisponible.webp';

import { Course } from '@root/src/common/types/course';
import CourseCard from '@root/src/common/components/custom/CardCurso';

type CursosViewProps = {
	cursos: Course[];
};
export const CursosView = ({ cursos }: CursosViewProps) => {
	return (
		<div className="min-h-screen max-w-[1100px] mx-auto text-white py-16">
			<div className="text-white">
				<h2 className="text-xl font-bold text-white text-start mb-8">
					Cursos Trend Academy
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-10  mx-auto">
					{cursos.map((curso) => (
						<CourseCard
							key={curso.id}
							title={curso.title}
							imageAlt={curso.title}
							imageSrc={curso.imageUrl ?? ImagenNoDisponible} // usa imagen por defecto si no hay
							modules={curso.moduleCount} // puedes mapear los módulos reales si los tienes
							originalPrice={curso.price}
							discountedPrice="50"
						/>
					))}
				</div>
			</div>
		</div>
	);
};
