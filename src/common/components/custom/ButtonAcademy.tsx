import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ReactNode } from 'react';

type ButtonAcademyProps = {
	children: ReactNode;
	href: string;
	external?: boolean;
	className?: string;
	variant?: 'text' | 'filled' | 'icon'; // Variantes para el botón
	icon?: ReactNode; // Propiedad para íconos
};

export default function ButtonAcademy({
	children,
	href,
	external = false,
	className = '',
	variant = 'text',
	icon, // Recibimos el icono como prop
}: ButtonAcademyProps) {
	// Clases base
	const baseClasses =
		'inline-flex items-center justify-center font-montserrat-fuente gap-2 font-semibold text-sm transition-colors duration-300 ease-in-out';

	// Clases según el tipo de botón
	const variantClasses = {
		text: 'text-white hover:text-gray-50', // Solo texto, sin fondo
		filled:
			'bg-trendacademy-rosado text-white hover:bg-[#d11f73] rounded-[5px] px-4 py-1.5 ', // Fondo azul con texto blanco
		icon: 'text-blue-500 hover:text-blue-700 rounded-[5px] px-4 py-1.5', // Icono, texto azul
	};

	// Combinación final de clases usando cn de ShadCN
	const finalClassName = cn(baseClasses, variantClasses[variant], className);

	// Si `external` es true, usamos una etiqueta <a>
	if (external) {
		return (
			<a
				href={href}
				className={finalClassName}
				target="_blank"
				rel="noopener noreferrer"
			>
				{icon && <span className="mr-2">{icon}</span>}
				{children}
			</a>
		);
	}

	// Enlaces internos con <Link>
	return (
		<Link href={href} className={finalClassName}>
			{icon && <span className="mr-2 ">{icon}</span>}
			{children}
		</Link>
	);
}
