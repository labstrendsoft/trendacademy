import React from 'react';
import Adorno from '@public/home/adornoCaracteristicas.png';
import Image from 'next/image';
export const BannerContacto = () => {
	return (
		<div className="relative h-[200px] overflow-hidden">
			<Image
				src={Adorno}
				alt="adorno"
				className="object-cover absolute left-1/2 -translate-x-1/2 object-center max-w-[700px] -top-28 w-full select-none"
			/>
			<div className="flex flex-col items-center justify-center h-full relative z-10">
				<h2 className="text-xl font-semibold text-white mb-1">
					Contáctate con nosotros
				</h2>
				<p className="text-gray-200 text-sm">
					Si necesitas ayuda personalizada este es el lugar
				</p>
			</div>
		</div>
	);
};
