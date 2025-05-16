'use client';

import { useCartStore } from '../store/cart';
import CartIcon from '@public/iconos/cartIcon.webp';
import Image from 'next/image';
import { useCartUIStore } from '../store/ui';

export const CartButton = () => {
	const cursos = useCartStore((state) => state.cursos);
	const { toggleCarrito } = useCartUIStore();

	return (
		<button onClick={toggleCarrito} className="relative cursor-pointer">
			<Image
				src={CartIcon}
				alt="icono de cart"
				className="object-cover mx-auto max-w-[28px]"
			/>
			{cursos.length > 0 && (
				<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
					{cursos.length}
				</span>
			)}
		</button>
	);
};
