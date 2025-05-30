'use client';
import Image from 'next/image';
import Link from 'next/link';

import { NavLinks } from './NavLinks';
import logoTrend from '@public/logo.webp';
import { Search } from 'lucide-react';
import ButtonAcademy from '../../custom/ButtonAcademy';
export const Header = () => {
	return (
		<header className="sticky top-0 w-full z-40 bg-trendacademy-morado drop-shadow-md ">
			<div className=" flex h-16  items-center justify-between w-full max-w-[1100px] mx-auto ">
				<Link href="/">
					<Image
						src={logoTrend}
						alt="logo de trendacademy"
						className="object-contain w-[80px] h-auto will-change-transform"
						priority
					/>
				</Link>
				<NavLinks />
				<div className="flex items-center gap-4">
					<div className=" relative font-montserrat-fuente">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#BEBEBE] w-4 h-4" />
						<input
							type="search"
							placeholder="Buscar cursos..."
							className="bg-transparent border border-[#BEBEBE] text-white w-48 placeholder-[#BEBEBE] text-xs rounded-lg py-1.5 pl-10 pr-4  focus:outline-none focus:ring-2 focus:ring-[white/20]"
						/>
					</div>
					<div className="hidden md:flex items-center gap-4 w-full">
						<ButtonAcademy href="/auth/login" variant="text">
							Entrar
						</ButtonAcademy>
						<ButtonAcademy
							href="/auth/register"
							variant="filled"
							className="whitespace-nowrap"
						>
							Crear Cuenta
						</ButtonAcademy>
					</div>
				</div>
			</div>
		</header>
	);
};
