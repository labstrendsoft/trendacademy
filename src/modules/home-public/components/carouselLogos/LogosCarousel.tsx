'use client';

import Autoscroll from 'embla-carousel-auto-scroll';
import { cn } from '@/lib/utils';
import { LogosClientesData } from '../../data/logosCarousel';
import { Carousel, CarouselContent, CarouselItem } from '@shadcnui/carousel';
import StyleCarousel from '../../styles/homePublic.module.css';

import Image from 'next/image';

export const CarouselLogosClientes = () => {
	const data = LogosClientesData();

	return (
		<>
			<Carousel
				opts={{
					loop: true,
					align: 'start',
				}}
				plugins={[
					Autoscroll({
						startDelay: 0,
						speed: 1.5,
						stopOnMouseEnter: true,
						stopOnFocusIn: false,
						stopOnInteraction: false,
					}),
				]}
				className={cn(StyleCarousel.carouselShadow, 'w-full')}
			>
				<CarouselContent className="w-full items-center">
					{data.map((logo, index) => {
						return (
							<CarouselItem
								key={index}
								className="basis-1/2 sm:basis-1/3 lg:basis-1/5 xl:basis-1/6 w-full "
							>
								<Image
									src={logo.imageUrl}
									alt={logo.alt}
									className="object-cover will-change-transform w-[120px] select-none pointer-events-none"
								/>
							</CarouselItem>
						);
					})}
				</CarouselContent>
			</Carousel>
		</>
	);
};
