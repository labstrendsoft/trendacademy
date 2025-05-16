'use client';
import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import { DotButton, useDotButton } from './DotButton';
import { PrevButton, NextButton, usePrevNextButtons } from './Arrows';
import useEmblaCarousel from 'embla-carousel-react';
import './embla.css';
import HomePublicStyles from '../../styles/homePublic.module.css';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import Celular from '@public/home/celular.webp';
import Laptop from '@public/home/latop.webp';
import Tablet from '@public/home/tablet.webp';
import SombraRosado from '@public/home/sombraBannerRosado.webp';

type PropType = {
	options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
	const { options } = props;
	const [emblaRef, emblaApi] = useEmblaCarousel(options);

	const { selectedIndex, scrollSnaps, onDotButtonClick } =
		useDotButton(emblaApi);

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi);

	return (
		<section className="embla  h-full overflow-hidden">
			<div className="h-full relative w-full " ref={emblaRef}>
				<div className="flex gap-4 h-full w-full">
					<div className=" embla__slide w-full h-full flex items-center flex-[0_0_100%]  justify-center">
						<div className="relative z-20">
							<p className="text-lg lg:text-3xl text-white font-bold  leading-tight max-w-[300px] mb-4 w-full">
								La mejor escuela digital para salones de belleza
							</p>

							<p className="text-[#EFEFEF] mb-8 text-sm font-montserrat-fuente">
								Estás a un paso de llevar tu salón a otro nivel.{' '}
							</p>
							<Link
								href="/cursos/marketing-belleza"
								className="mb-4	 px-10 py-2 bg-[#E72480] text-white rounded-lg text-lg   hover:bg-[#E72480] "
							>
								Ver Cursos
							</Link>
						</div>
						<div className="flex items-end relative justify-center  flex-1 w-full h-[550px]">
							<Image
								src={Tablet}
								alt="tablet"
								className="object-cover w-[450px] relative z-20 float-medium select-none pointer-events-none"
							/>
							<Image
								src={Celular}
								alt="celular"
								className="object-cover w-[250px] relative z-20 float-small select-none pointer-events-none"
							/>

							<Image
								src={Laptop}
								alt="laptop"
								className="object-cover w-[450px] absolute top-0 left-[55%] -translate-x-1/2 z-10 float-large select-none pointer-events-none"
							/>
							<Image
								src={SombraRosado}
								alt="laptop"
								className="object-cover w-[470px] absolute top-0 left-[55%] -translate-x-1/2 select-none pointer-events-none"
							/>
						</div>
					</div>
					<div className=" embla__slide w-full h-full flex items-center  flex-[0_0_100%]">
						<div
							className={cn(
								HomePublicStyles.fondoTop,
								' absolute   top-0 max-w-[950px] right-0'
							)}
						/>
						<div className="relative z-20">
							<p className="text-lg lg:text-3xl text-white font-bold  leading-tight max-w-[300px] mb-4 ">
								La mejor escuela digital para salones de belleza
							</p>

							<p className="text-[#EFEFEF] mb-8 text-sm font-montserrat-fuente">
								Estás a un paso de llevar tu salón a otro nivel.{' '}
							</p>
							<Link
								href="/cursos/marketing-belleza"
								className="mb-4	 px-10 py-2 bg-[#E72480] text-white rounded-lg text-lg   hover:bg-[#E72480] "
							>
								Ver Cursos
							</Link>
						</div>
					</div>
				</div>
			</div>
			<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
			<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
			<div className="absolute bottom-6 left-1/2 -translate-x-1/2">
				<div className="flex items-center gap-4">
					{scrollSnaps.map((_, index) => (
						<DotButton
							key={index}
							onClick={() => onDotButtonClick(index)}
							className={'embla__dot'.concat(
								index === selectedIndex ? ' embla__dot--selected' : ''
							)}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default EmblaCarousel;
