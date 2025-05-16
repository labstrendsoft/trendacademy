import CourseCardProgress from '@root/src/common/components/custom/CardCursoPogress';
import React from 'react';

import { CourseMe } from '@root/src/common/types/course';

type CursosViewProps = {
	cursos: CourseMe[];
};

export const MisCursosView = ({ cursos }: CursosViewProps) => {
	return (
		<div className="min-h-screen max-w-[1100px] mx-auto text-white py-16">
			<div className="text-white">
				<h2 className="text-xl font-bold text-white text-start mb-8">
					Mis Cursos
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-10  mx-auto">
					{cursos.map((curso) => (
						<CourseCardProgress key={curso.id} curso={curso} />
					))}
				</div>
			</div>
		</div>
	);
};
