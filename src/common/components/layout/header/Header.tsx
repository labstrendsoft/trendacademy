'use client';
import Image from 'next/image';
import Link from 'next/link';

import { NavLinks } from './NavLinks';
import logoTrend from '@public/logo.webp';
// import { Search } from 'lucide-react';
import CartIcon from '@public/iconos/cartIcon.webp';
import ButtonAcademy from '../../custom/ButtonAcademy';
export const Header = () => {
	return (
		<header className="sticky top-0 w-full z-40 bg-trendacademy-morado drop-shadow-md ">
			<div className=" flex h-16  items-center justify-between w-full max-w-[2000px] mx-auto px-16">
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
					{/* <div className=" relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-4 h-4" />
						<input
							type="search"
							placeholder="Buscar cursos..."
							className="bg-[#0460c0]/40 text-white w-48 placeholder-blue-300 text-sm rounded-lg py-1.5 pl-10 pr-4  focus:outline-none focus:ring-2 focus:ring-white/30"
						/>
					</div> */}
					<div className="hidden md:flex items-center space-x-4">
						<Link href="/cart">
							<Image
								src={CartIcon}
								alt="icono de cart"
								className="object-cover w-[25px] h-auto will-change-transform"
							/>
						</Link>
						<ButtonAcademy href="/" variant="text">
							Entrar
						</ButtonAcademy>
						<ButtonAcademy href="/" variant="filled">
							Crear Cuenta
						</ButtonAcademy>
					</div>
				</div>
			</div>
		</header>
	);
};
