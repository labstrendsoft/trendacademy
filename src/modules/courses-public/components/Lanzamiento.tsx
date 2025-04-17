import { cn } from '@/lib/utils';
import React from 'react';
import CoursesStyles from '../styles/courses.module.css';
import Image from 'next/image';

interface CourseCardProps {
	title: string;
	imageSrc: string;
	altText: string;
}
function CourseCard({ title, imageSrc, altText }: CourseCardProps) {
	return (
		<div className="flex flex-col">
			<div className="relative bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg overflow-hidden h-48">
				<div className="absolute top-2 left-2 bg-white text-black text-xs font-bold px-3 py-1 rounded-md">
					CURSO
				</div>
				<Image
					src={imageSrc || '/placeholder.svg'}
					alt={altText}
					width={300}
					height={200}
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
			imageSrc: '/placeholder.svg?height=200&width=300',
			altText: 'Marketing para Salones de Belleza',
		},
		{
			id: 2,
			title: 'Fotografía y Video para Salones con Celular',
			imageSrc: '/placeholder.svg?height=200&width=300',
			altText: 'Fotografía y Video para Salones con Celular',
		},
		{
			id: 3,
			title: 'Instagram para Salones de Belleza',
			imageSrc: '/placeholder.svg?height=200&width=300',
			altText: 'Instagram para Salones de Belleza',
		},
		{
			id: 4,
			title: 'WhatsApp para Profesionales',
			imageSrc: '/placeholder.svg?height=200&width=300',
			altText: 'WhatsApp para Profesionales',
		},
		{
			id: 5,
			title: 'El Poder de la Marca',
			imageSrc: '/placeholder.svg?height=200&width=300',
			altText: 'El Poder de la Marca',
		},
		{
			id: 6,
			title: 'Cap Cut Pro',
			imageSrc: '/placeholder.svg?height=200&width=300',
			altText: 'Cap Cut Pro',
		},
	];
	return (
		<div className={cn(CoursesStyles.fondo, 'h-screen')}>
			<div className="text-center py-20">
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
