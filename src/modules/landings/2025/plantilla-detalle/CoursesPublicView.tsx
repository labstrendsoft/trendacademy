'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import BeautyCourseBenefits from './components/BeautyCourseBenefits';
import CourseAccessFeatures from './components/AccesoCurso';
import { Testimonios } from './components/Testimonios';
import { Lanzamiento } from './components/Lanzamiento';
import { Check } from 'lucide-react';
import CoursesStyles from './styles/courses.module.css';
import { cn } from '@/lib/utils';
import logoTrend from '@public/logo.webp';

import trendPersonas from '@public/trend-personas-movil.png';
import { socialLinks } from '@/common/data/redes';

// Forzar que el componente se renderice solo en el cliente
const BannerBlackFriday = dynamic(
	() => import('@/common/components/countDownTimer'),
	{
		ssr: false,
		loading: () => (
			<div style={{ height: '58px' }} className="w-full bg-black" />
		),
	}
);
const features = [
	'Acceso a una comunidad privada de dueños de salones.',
	'Plantillas de anuncios y contenido para redes sociales.',
	'Sesión en vivo de preguntas y respuestas.',
];

export const CoursesPublicView = () => {
	return (
		<div className="bg-black ">
			{/* Otro Banner con una fecha diferente */}
			<div className={cn(CoursesStyles.transicionBanner, 'sticky z-30 top-0')}>
				<BannerBlackFriday saleEndDate={new Date('2025-07-08T23:59:59')} />
			</div>
			<div
				className={cn(
					'relative max-w-[1200px] mx-auto  pt-16  lg:pt-[100px] lg:pb-[150px] overflow-hidden'
				)}
			>
				<div
					className={cn(
						CoursesStyles.fondoTop,
						' absolute  h-full top-5 max-w-[950px] right-0'
					)}
				/>
				<div className="max-w-[450px] xl:max-w-[560px] max-lg:mx-auto flex flex-col justify-center items-center relative z-10 ">
					<Image
						src={logoTrend}
						alt="logo de trendacademy"
						className="object-contain w-[120px] lg:w-[150px] h-auto  mb-6 lg:mb-10"
					/>
					<p className="text-lg lg:text-xl text-white font-bold  leading-tight max-w-[480px] text-center mb-4 px-2">
						Convierte tu salón en un negocio rentable con los métodos y
						estrategias que utilizan los mejores salones del mundo
					</p>
					<p className="text-[#EFEFEF] mb-8 text-sm text-center">
						¡No esperes más, transforma tu salón hoy!
					</p>

					<div className="flex items-end justify-center gap-2 mb-10 lg:mb-12">
						<div className="pl-8 pr-6 relative pb-2 text-white ">
							<div className="text-[10px] absolute left-2 -top-1.5 font-bold flex flex-col leading-none">
								Precio <span>Normal</span>
							</div>
							<div className="absolute left-2 right-0 top-[45%] h-[1.5px] bg-white translate-y-[-50%] mx-4"></div>

							<span className="text-sm font-bold">S/</span>
							<span className="text-2xl lg:text-3xl font-bold ml-1">799</span>
							<span className="text-xl font-bold">.00</span>
						</div>

						<div className="pl-7 pr-5 relative py-2 rounded-xl bg-gradient-to-r from-[#054C9B] to-rose-400 border-2 border-[#FF00C9] shadow-lg text-white">
							<span className="text-[10px] absolute left-3 top-2.5 font-bold">
								Oferta
							</span>
							<span className="text-sm font-bold">S/</span>
							<span className="text-3xl font-bold ml-1">299</span>
							<span className="text-xl font-bold">.00</span>
						</div>
					</div>

					<Link
						href="/cursos/marketing-belleza"
						className="mb-4	 px-10 py-2 bg-[#054C9B] text-white rounded-lg text-lg   hover:bg-[#054C9B] transition"
					>
						Comprar Curso
					</Link>
				</div>
				<div className="lg:hidden w-full">
					<Image
						src={trendPersonas}
						alt="foto del equipo trend"
						className="object-cover max-w-[400px] w-full mx-auto pr-10"
					/>
				</div>
				<p className="text-center mt-8 w-full text-xs lg:text-sm absolute bottom-4 px-2 lg:bottom-6 z-10 text-white max-w-[400px] lg:max-w-full left-1/2 -translate-x-1/2 leading-snug">
					Descubre cómo los grandes salones atraen y fidelizan clientes sin
					depender del boca a boca.
				</p>
			</div>

			<BeautyCourseBenefits />
			<CourseAccessFeatures />
			<Testimonios />
			<Lanzamiento />

			<div className="px-8">
				<div className="bg-[#111827] px-8 py-6 rounded-xl max-w-xl mx-auto border border-[#E62480] mt-10 mb-5">
					<div className="space-y-4">
						{features.map((feature, index) => (
							<div key={index} className="flex items-start gap-3">
								<div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#054C9B] flex items-center justify-center mt-0.5">
									<Check className="w-3 h-3 text-white" />
								</div>
								<p className="text-white text-base">{feature}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="max-w-[1000px] mx-auto flex flex-col justify-center items-center">
				<p className="text-[#EFEFEF]  text-center">
					¡Oferta especial! Precio reducido por tiempo limitado.
				</p>
				<p className="text-[#EFEFEF] mb-10 text-sm text-center">
					¡No esperes más, transforma tu salón hoy!
				</p>

				<div className="flex items-end justify-center gap-2 mb-10">
					<div className="pl-8 pr-6 relative pb-2 text-white ">
						<div className="text-[10px] absolute left-2 -top-1.5 font-bold flex flex-col leading-none">
							Precio <span>Normal</span>
						</div>
						<div className="absolute left-2 right-0 top-[45%] h-[1.5px] bg-white translate-y-[-50%] mx-4"></div>

						<span className="text-sm font-bold">S/</span>
						<span className="text-2xl lg:text-3xl font-bold ml-1">799</span>
						<span className="text-xl font-bold">.00</span>
					</div>

					<div className="pl-7 pr-5 relative py-2 rounded-xl bg-gradient-to-r from-[#054C9B] to-rose-400 border-2 border-[#FF00C9] shadow-lg text-white">
						<span className="text-[10px] absolute left-3 top-2.5 font-bold">
							Oferta
						</span>
						<span className="text-sm font-bold">S/</span>
						<span className="text-3xl font-bold ml-1">299</span>
						<span className="text-xl font-bold">.00</span>
					</div>
				</div>

				<p className="text-[#EFEFEF] mb-2 text-xs text-center">
					Acceso inmediato al curso al inscribirte.
				</p>

				<Link
					href="/cursos/marketing-belleza"
					className="mb-20	 px-16 py-2 bg-[#054C9B] text-white rounded-lg text-lg   hover:bg-[#054C9B]  "
				>
					Comprar Curso
				</Link>
			</div>

			<div className=" flex flex-col justify-center items-center ">
				<Image
					src={logoTrend}
					alt="logo de trendacademy"
					className="object-cover w-[120px] h-auto mb-6 "
				/>

				<div className="flex items-center gap-4">
					{socialLinks.map((social, index) => (
						<Link
							key={index}
							href={social.url}
							className=" flex items-center  "
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								src={social.icon}
								alt={social.name}
								className="hover:opacity-80 object-contain transition-opacity w-[25px] h-[25px]
									"
							/>
						</Link>
					))}
				</div>
			</div>
			<div className="flex flex-col gap-4 text-[#EFEFEF] w-full py-8  max-lg:px-4">
				<div className="flex md:flex-row flex-wrap items-center gap-3 md:gap-4 justify-center max-w-[1000px] mx-auto w-full border-b border-white text-xs sm:text-sm pb-4">
					<span>Términos y condiciones</span>
					<span>Políticas de privacidad</span>
					<span>Políticas de Cookies</span>
				</div>
				<p className="text-center text-xs md:text-sm">
					© 2025 TRENDACADEMY. TODOS LOS DERECHOS RESERVADOS
				</p>
			</div>
		</div>
	);
};
