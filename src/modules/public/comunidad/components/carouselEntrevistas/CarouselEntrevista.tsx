'use client';

import { useState, useEffect } from 'react';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
} from '@shadcnui/carousel';
import ImageNoDisponible from '@public/imagenNoDisponible.webp';
import { CardEntrevista } from '../CardEntrevista';

const entrevistasData = [
	{
		imgSrc: ImageNoDisponible,
		title: 'Entrevista con Juan Sánchez',
		description:
			'Hablamos sobre desarrollo frontend, React y tendencias modernas.',
		url: '/entrevistas/juan-sanchez',
	},
	{
		imgSrc: ImageNoDisponible,
		title: 'Conversación con Ana López',
		description: 'Ana comparte su experiencia liderando equipos de producto.',
		url: '/entrevistas/ana-lopez',
	},
	{
		imgSrc: ImageNoDisponible,
		title: 'Diálogo con Carlos Pérez',
		description: 'Discutimos sobre innovación en UX y UI para startups.',
		url: '/entrevistas/carlos-perez',
	},
];

export default function CarouselEntrevista() {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!api) {
			return;
		}

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap());

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap());
		});
	}, [api]);

	return (
		<div className="w-full bg-[#0a0a1a] ">
			<div className="max-w-6xl mx-auto">
				<div>
					<h2 className="text-base font-bold text-white text-start mb-4">
						Entrevistas
					</h2>

					<Carousel
						setApi={setApi}
						className="w-full"
						opts={{
							align: 'start',
							loop: true,
						}}
					>
						<CarouselContent>
							{entrevistasData.map((item, index) => (
								<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
									<CardEntrevista
										imgSrc={item.imgSrc}
										title={item.title}
										description={item.description}
										url={item.url}
									/>
								</CarouselItem>
							))}
						</CarouselContent>
						<div className="flex items-center justify-center mt-10 relative">
							<CarouselPrevious className="bg-[#636378] left-[42%] hover:bg-[#636378]/90 text-[#070A19] hover:text-[#070A19] cursor-pointer border-none" />
							<span className="text-xs text-gray-400 max-w-[100px] mx-auto">
								Pág {current + 1} de {count}
							</span>
							<CarouselNext className="bg-[#636378] right-[42%] hover:bg-[#636378]/90 text-[#070A19] hover:text-[#070A19] cursor-pointer border-none" />
						</div>
					</Carousel>
				</div>
			</div>
		</div>
	);
}
