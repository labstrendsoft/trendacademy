import ButtonAcademy from '@root/src/common/components/custom/ButtonAcademy';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

type CardEntrevistaProps = {
	imgSrc: StaticImageData;
	imgAlt?: string;
	title: string;
	description: string;
	url: string;
};

export const CardEntrevista: React.FC<CardEntrevistaProps> = ({
	imgSrc,
	imgAlt = 'Imagen de la entrevista',
	title,
	description,
	url,
}) => {
	return (
		<div className="max-w-sm  overflow-hidden shadow-md  text-center space-y-4">
			<Image
				src={imgSrc}
				alt={imgAlt}
				className="w-full  aspect-video object-cover rounded-lg"
			/>
			<div className="flex flex-col items-start">
				<h3 className="text-lg font-medium mb-2 text-start">{title}</h3>
				<p className="text-white/70 text-sm mb-4 text-start">{description}</p>
				<ButtonAcademy href={url} variant="filled">
					Ver entrevista
				</ButtonAcademy>
			</div>
		</div>
	);
};
