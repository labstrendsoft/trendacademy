'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
} from '@shadcnui/carousel';
import ImagenPorDefecto from '@public/curso1.png';

const testimonios = [
	{
		id: 1,
		nombre: 'Doris Janampa',
		estrellas: 5,
		texto:
			'El curso me pareció espectacular, aprendí todo lo que necesitaba, super recomendado...',
		imagen: '', // Agrega el campo de imagen
	},
	{
		id: 2,
		nombre: 'Fiorella Chavez',
		estrellas: 5,
		texto:
			'El curso me pareció espectacular, aprendí todo lo que necesitaba, super recomendado...',
		imagen: '',
	},
	{
		id: 3,
		nombre: 'Jaime Chero',
		estrellas: 5,
		texto:
			'El curso me pareció espectacular, aprendí todo lo que necesitaba, super recomendado...',
		imagen: '',
	},
	{
		id: 4,
		nombre: 'Carlos Mendoza',
		estrellas: 5,
		texto:
			'El curso me pareció espectacular, aprendí todo lo que necesitaba, super recomendado...',
		imagen: '',
	},
	{
		id: 5,
		nombre: 'María Sánchez',
		estrellas: 5,
		texto:
			'El curso me pareció espectacular, aprendí todo lo que necesitaba, super recomendado...',
		imagen: '',
	},
];

export default function CarouselAlumnos() {
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
		<div className="w-full bg-[#0a0a1a] px-4 font-montserrat-fuente">
			<div className="max-w-6xl mx-auto">
				<div>
					<h2 className="text-xl font-bold text-white text-center mb-12">
						¿Qué opinan nuestros alumnos?
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
							{testimonios.map((testimonio) => (
								<CarouselItem
									key={testimonio.id}
									className="md:basis-1/2 lg:basis-1/3"
								>
									<div className="bg-[#FFFFFF] rounded-lg overflow-hidden h-full">
										<div className="p-6">
											<div className="flex items-center mb-4">
												{/* Imagen del testimonio */}
												<div className="w-12 h-12 bg-gray-200 rounded-full  mr-4 border border-[#054C9B] overflow-hidden">
													<Image
														src={testimonio.imagen || ImagenPorDefecto} // Usamos la imagen personalizada
														alt={testimonio.nombre}
														className="w-full h-full object-cover"
													/>
												</div>
												<div>
													<h3 className="font-medium text-gray-900">
														{testimonio.nombre}
													</h3>
													<div className="flex">
														{Array.from({ length: testimonio.estrellas }).map(
															(_, i) => (
																<Star
																	key={i}
																	className="w-4 h-4 fill-[#054C9B] text-[#054C9B]"
																/>
															)
														)}
													</div>
												</div>
											</div>
											<p className="text-gray-600 text-sm">
												{testimonio.texto}
											</p>
										</div>
										<div className="px-6 pt-0 pb-4">
											<button className="text-[#054C9B] text-sm font-medium hover:underline">
												Ver más
											</button>
										</div>
									</div>
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
