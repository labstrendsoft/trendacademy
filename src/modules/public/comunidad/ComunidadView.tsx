import React from 'react';
import ImagenEntrevista from '@public/fondoEntrevista.webp';

import CarouselEntrevista from './components/carouselEntrevistas/CarouselEntrevista';
import Image from 'next/image';
import ButtonAcademy from '@root/src/common/components/custom/ButtonAcademy';
export const ComunidadView = () => {
	return (
		<div className="min-h-screen max-w-[1100px] mx-auto text-white py-16">
			<div className="flex items-center gap-6 mb-10">
				<div className="w-full  max-w-[400px]">
					<h3 className="text-3xl font-bold mb-4">
						El poder de la marca con Gerson Livia
					</h3>
					<p className="mb-4 text-white/70 text-sm">
						Gerson nos cuenta los secretos detrás de su éxito en el mundo de la
						belleza.
					</p>
					<ButtonAcademy href="/" variant="filled">
						Ver Live
					</ButtonAcademy>
				</div>
				<Image
					src={ImagenEntrevista}
					alt="fondo en vivo"
					className="object-cover max-w-[600px] ml-auto"
				/>
			</div>
			<CarouselEntrevista />
		</div>
	);
};
