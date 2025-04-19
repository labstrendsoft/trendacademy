import React from 'react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/common/components/shadcnui/carousel';
import anaImg from '../../../../public/testimonio.png';
import { cn } from '@/lib/utils';
import StyleCarousel from '../styles/courses.module.css';

// Simulación de data
const testimonios = [
	{ id: 1, nombre: 'Ana', imagen: anaImg },
	{ id: 2, nombre: 'Carlos', imagen: anaImg },
	{ id: 3, nombre: 'Lucía', imagen: anaImg },
	{ id: 4, nombre: 'Pedro', imagen: anaImg },
	{ id: 5, nombre: 'María', imagen: anaImg },
];

export const Testimonios = () => {
	const plugin = React.useRef(
		Autoplay({ delay: 2000, stopOnInteraction: true })
	);

	return (
		<div className="bg-[#0c0c1d] text-white py-16 overflow-hidden">
			<div className="max-w-5xl mx-auto w-full ">
				<h2 className="text-2xl md:text-3xl font-bold max-w-[300px] mx-auto sm:max-w-full text-center mb-12">
					¿Qué opinan nuestros alumnos?
				</h2>

				<Carousel
					plugins={[plugin.current]}
					className={cn(StyleCarousel.carouselShadow, 'w-full')}
					onMouseEnter={plugin.current.stop}
					onMouseLeave={plugin.current.reset}
				>
					<CarouselContent>
						{testimonios.map((item) => (
							<CarouselItem
								key={item.id}
								className=" basis-1/2 sm:basis-1/3 xl:basis-1/4 w-full select-none pointer-events-none"
							>
								<Image
									src={item.imagen}
									alt={`Foto de ${item.nombre}`}
									placeholder="blur"
									className=" h-auto object-cover  "
								/>
								<div className="mt-2 text-center text-sm font-medium hidden">
									{item.nombre}
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="bg-[#E62480] hover:bg-[#E62480] hover:text-white cursor-pointer text-white border-none absolute bottom-1/2 left-[5%] sm:-left-[2%] z-10 " />
					<CarouselNext className="bg-[#E62480] hover:bg-[#E62480] hover:text-white cursor-pointer text-white border-none absolute bottom-1/2 right-[5%] sm:-right-[2%] z-20" />
				</Carousel>
			</div>
		</div>
	);
};
