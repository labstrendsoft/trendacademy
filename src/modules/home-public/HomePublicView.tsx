import React from 'react';
import HomePublicStyles from './styles/homePublic.module.css';
import { cn } from '@/lib/utils';
import { EmblaOptionsType } from 'embla-carousel';
import EmblaCarousel from './components/carouselBanner/CarouselMain';
import { CarouselLogosClientes } from './components/carouselLogos/LogosCarousel';
import CarouselAlumnos from './components/carouselAlumnos/CarouselAlumnosMain';
import CursosTop from './components/CursosTop/CursosTop';
import CaracteristicasMain from '../courses-public/components/caracteristicas/CarecteristicasMain';

const OPTIONS: EmblaOptionsType = {};

export const HomePublicView = () => {
	return (
		<div className="h-full">
			<div
				className={cn(
					HomePublicStyles.fondo,
					'h-[calc(100vh-130px-64px)] relative'
				)}
			>
				<div className=" max-w-[1100px] mx-auto h-full  flex items-center ">
					<EmblaCarousel options={OPTIONS} />
				</div>
			</div>
			<div className="bg-[#090710] w-full overflow-hidden h-[130px]">
				<div className="max-w-[1100px] mx-auto flex items-center h-full">
					<CarouselLogosClientes />
				</div>
			</div>
			<div className="bg-[#070A19] w-full overflow-hidden py-16">
				<div className="max-w-[1100px] mx-auto flex items-center h-full">
					<CursosTop />
				</div>
			</div>
			<div className="bg-[#090710] w-full overflow-hidden py-16">
				<div className="max-w-[1100px] mx-auto flex items-center h-full">
					<CaracteristicasMain />
				</div>
			</div>
			<div className="bg-[#070A19] w-full overflow-hidden py-16">
				<div className="max-w-[1100px] mx-auto flex items-center h-full">
					<CarouselAlumnos />
				</div>
			</div>
		</div>
	);
};
