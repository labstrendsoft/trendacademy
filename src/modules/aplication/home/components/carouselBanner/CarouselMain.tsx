'use client';
import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import { DotButton, useDotButton } from './DotButton';
import { PrevButton, NextButton, usePrevNextButtons } from './Arrows';
import useEmblaCarousel from 'embla-carousel-react';
import './embla.css';

import Image from 'next/image';

import Banner1 from '@public/app/home/bannerHome.webp';

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
						<Image src={Banner1} alt="banner 1 de la app." />
					</div>
					<div className=" embla__slide w-full h-full flex items-center  flex-[0_0_100%]">
						<Image src={Banner1} alt="banner 1 de la app." />
					</div>
				</div>
			</div>
			<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
			<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
			<div className="absolute -bottom-9 left-1/2 -translate-x-1/2">
				<div className="flex items-center gap-2.5">
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
