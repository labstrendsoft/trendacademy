import { cn } from '@/lib/utils';
import React from 'react';
import CoursesStyles from '../styles/courses.module.css';
import Image from 'next/image';
import cursoImg from '../../../../public/curso1.png';

interface CourseCardProps {
	title: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	imageSrc: any;
	altText: string;
}
function CourseCard({ title, imageSrc, altText }: CourseCardProps) {
	return (
		<div className="flex flex-col max-sm:min-w-[300px] max-sm:mx-auto">
			<div className="relative bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg overflow-hidden h-48">
				<div className="absolute top-2 left-2 bg-white text-black text-xs font-bold px-3 py-1 rounded-md z-10">
					CURSO
				</div>
				<Image
					src={imageSrc || '/placeholder.svg'}
					alt={altText}
					className="w-full h-full object-cover opacity-80"
				/>
			</div>
			<div className="mt-3 text-center">
				<h3 className="text-white text-sm font-medium">{title}</h3>
			</div>
		</div>
	);
}
export const Lanzamiento = () => {
	const courses = [
		{
			id: 1,
			title: 'Marketing para Salones de Belleza',
			imageSrc: cursoImg,
			altText: 'Marketing para Salones de Belleza',
		},
		{
			id: 2,
			title: 'Fotografía y Video para Salones con Celular',
			imageSrc: cursoImg,
			altText: 'Fotografía y Video para Salones con Celular',
		},
		{
			id: 3,
			title: 'Instagram para Salones de Belleza',
			imageSrc: cursoImg,
			altText: 'Instagram para Salones de Belleza',
		},
		{
			id: 4,
			title: 'WhatsApp para Profesionales',
			imageSrc: cursoImg,
			altText: 'WhatsApp para Profesionales',
		},
		{
			id: 5,
			title: 'El Poder de la Marca',
			imageSrc: cursoImg,
			altText: 'El Poder de la Marca',
		},
		{
			id: 6,
			title: 'Cap Cut Pro',
			imageSrc: cursoImg,
			altText: 'Cap Cut Pro',
		},
	];
	return (
		<div
			className={cn(
				CoursesStyles.fondo,
				'lg:h-screen bg-[#080B1A] flex items-center justify-center py-20 px-8'
			)}
		>
			<div className="text-center  ">
				<p className="text-white text-lg mb-6">¡Solo por lanzamiento!</p>
				<h2 className="text-2xl md:text-3xl font-bold text-center mb-8 max-w-[800px] mx-auto text-white">
					Accede por un año a toda nuestra plataforma de cursos y
					actualizaciones
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-[1000px] mx-auto">
					{courses.map((course) => (
						<CourseCard
							key={course.id}
							title={course.title}
							imageSrc={course.imageSrc}
							altText={course.altText}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
