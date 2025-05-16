import Image from 'next/image';
import ButtonAcademy from './ButtonAcademy';
import { Progress } from '../shadcnui/progress';
import { CourseMe } from '../../types/course';

import ImagenNoDisponible from '@public/imagenNoDisponible.webp';

type CursosViewProps = {
	curso: CourseMe;
};

export default function CourseCardProgress({ curso }: CursosViewProps) {
	const { title, imageUrl, id } = curso.course;
	const firstLessonId = curso.firstLessonId; // Asumimos que esto ya viene con el curso

	return (
		<div className="rounded-lg overflow-hidden font-montserrat-fuente">
			<div>
				<Image
					src={imageUrl || ImagenNoDisponible}
					alt={title}
					className=" object-cover"
					width={350}
					height={350}
				/>
			</div>
			<div className="bg-white p-4 text-black max-h-[200px]">
				<h3 className=" font-bold text-[#0e0a1f] leading-tight max-w-[270px] mb-1.5">
					{title}
				</h3>
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-4">
						<Progress
							value={curso.progress}
							className="bg-gray-200 [&_[data-slot=progress-indicator]]:bg-green-500 h-1"
						/>
						<span className="text-[#939393] font-normal font-montserrat-fuente">
							{curso.progress}%
						</span>
					</div>

					<ButtonAcademy
						href={`/curso/${id}/clase/${firstLessonId}`}
						variant="filled"
						className="py-2 w-fit"
					>
						Continuar Curso
					</ButtonAcademy>
				</div>
			</div>
		</div>
	);
}
