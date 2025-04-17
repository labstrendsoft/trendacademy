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

// Simulación de data
const testimonios = [
	{ id: 1, nombre: 'Ana', imagen: '/testimonio.png' },
	{ id: 2, nombre: 'Carlos', imagen: '/testimonio.png' },
	{ id: 3, nombre: 'Lucía', imagen: '/testimonio.png' },
	{ id: 4, nombre: 'Pedro', imagen: '/testimonio.png' },
	{ id: 5, nombre: 'María', imagen: '/testimonio.png' },
];

export const Testimonios = () => {
	const plugin = React.useRef(
		Autoplay({ delay: 2000, stopOnInteraction: true })
	);

	return (
		<div className="bg-[#0c0c1d] text-white py-16 px-4 md:px-8">
			<div className="max-w-4xl mx-auto">
				<h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
					¿Qué opinan nuestros alumnos?
				</h2>

				<Carousel
					plugins={[plugin.current]}
					className="w-full  mx-auto"
					onMouseEnter={plugin.current.stop}
					opts={{ loop: true }} // ✅ Hacemos que el carrusel sea infinito
				>
					<CarouselContent>
						{testimonios.map((item) => (
							<CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
								<div className="p-4">
									<div className="rounded-lg  shadow-lg">
										<Image
											src={item.imagen}
											alt={`Foto de ${item.nombre}`}
											width={300}
											height={300}
											className="w-full h-auto object-cover "
										/>
										<div className="mt-2 text-center text-sm font-medium">
											{item.nombre}
										</div>
									</div>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>

				<p className="text-center mt-12 max-w-2xl mx-auto text-sm md:text-base">
					Este curso está diseñado para dueños de salones de belleza que quieren
					escalar su negocio y aumentar sus ingresos.
				</p>
			</div>
		</div>
	);
};
