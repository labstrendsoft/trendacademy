'use client';
import React, { useState } from 'react';
import HomeStyles from './styles/home.module.css';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import CustomVideoPlayer from './components/videoCustomize';

const socialLinks = [
	{
		name: 'Facebook',
		url: 'https://www.facebook.com/agenciadepublicidadparabellezatrend',
		icon: '/redes/fb.webp',
	},
	{
		name: 'Whatsapp',
		url: 'https://instagram.com',
		icon: '/redes/wsp.webp',
	},
	{
		name: 'Instagram',
		url: 'https://www.instagram.com/trend_belleza',
		icon: '/redes/ig.webp',
	},
	{ name: 'Youtube', url: 'https://twitter.com', icon: '/redes/yt.webp' },
];

export const Homeview = () => {
	const [showButton, setShowButton] = useState(false);
	return (
		<div className="min-h-full bg-[#080B1A]">
			<div className={cn(HomeStyles.fondo, 'h-screen')}>
				<div className="flex items-center justify-center flex-col h-full max-w-[1000px] w-full mx-auto  max-lg:px-4">
					<h1 className="text-lg sm:text-xl text-[#EFEFEF] mb-4">
						En una clase te revelo...
					</h1>
					<p className=" text-xl sm:text-2xl text-[#EFEFEF] font-bold  leading-tight text-center space-x-2 max-w-[650px] mx-auto mb-8">
						El secreto que utilizan{' '}
						<span className="bg-gradient-to-b from-[#5C87FF] via-[#5C87FF] to-[#B33FE2] bg-clip-text text-transparent">
							los grandes salones de belleza
						</span>
						para poder{' '}
						<span className="bg-gradient-to-b from-[#5C87FF] via-[#5C87FF] to-[#B33FE2] bg-clip-text text-transparent">
							FACTURAR MÁS
						</span>{' '}
						a través de sus redes sociales.
					</p>

					<CustomVideoPlayer onShowButton={() => setShowButton(true)} />

					<p className="text-[#EFEFEF] mb-4 text-sm text-center">
						Descubre cómo los grandes salones atraen y fidelizan clientes sin
						depender del boca a boca.
					</p>
					{showButton && (
						<a
							href="/acceso-al-curso"
							className={cn(
								HomeStyles.fadeInUpMain,
								'mb-4	 px-10 py-3.5 bg-[#054C9B] text-white rounded-lg text-xl sm:text-2xl  hover:bg-[#054C9B] transition'
							)}
						>
							Acceder al curso
						</a>
					)}
					<div className=" flex flex-col justify-center items-center mt-8">
						<Image
							src="/logo.webp"
							alt="logo de trendacademy"
							className="object-cover w-auto h-auto mb-6 "
							width={120}
							height={100}
						/>

						<div className="flex items-center gap-4">
							{socialLinks.map((social, index) => (
								<Link
									key={index}
									href={social.url}
									className=" flex items-center  "
									target="_blank"
									rel="noopener noreferrer"
								>
									<Image
										src={social.icon}
										alt={social.name}
										width={25} // Tamaño base para desktop
										height={25}
										className="hover:opacity-80 object-contain transition-opacity w-[25px] h-[25px]
									"
									/>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-4 text-[#EFEFEF] w-full py-8  max-lg:px-4">
				<div className="flex md:flex-row flex-col items-center gap-1 md:gap-4 justify-center max-w-[1000px] mx-auto w-full border-b border-white text-sm pb-4">
					<span>Términos y condiciones</span>
					<span>Políticas de privacidad</span>
					<span>Políticas de Cookies</span>
				</div>
				<p className="text-center text-xs md:text-sm">
					© 2025 TRENDACADEMY. TODOS LOS DERECHOS RESERVADOS
				</p>
			</div>
		</div>
	);
};
