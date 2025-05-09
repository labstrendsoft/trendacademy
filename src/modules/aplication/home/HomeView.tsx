import React from 'react';

import { EmblaOptionsType } from 'embla-carousel';
import EmblaCarousel from './components/carouselBanner/CarouselMain';
import CursosTop from './components/CursosTop/CursosTop';
import NuevosCursos from './components/NuevosCursos/NuevosCursos';

const OPTIONS: EmblaOptionsType = {};

export const HomeView = () => {
	return (
		<div className="h-full py-16">
			<div className=" max-w-[1100px] mx-auto h-full  flex items-center relative mb-10">
				<EmblaCarousel options={OPTIONS} />
			</div>
			<div className="bg-[#070A19] w-full overflow-hidden py-16">
				<div className="max-w-[1100px] mx-auto flex items-center h-full">
					<CursosTop />
				</div>
			</div>
			<div className="bg-[#070A19] w-full overflow-hidden py-16">
				<div className="max-w-[1100px] mx-auto flex items-center h-full">
					<NuevosCursos />
				</div>
			</div>
		</div>
	);
};
