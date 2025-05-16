'use client';
import Image from 'next/image';
import CartIcon from '@public/iconos/cartIcon.webp';
import { formatModuleCount } from '../../helpers/formatModuleCount';
import { applyDiscount, formatPriceInSoles } from '../../helpers/formatPrice';
import { useCartStore } from '@root/src/modules/cart/store/cart';
import { Course } from '../../types/course';
import ImagenNoDisponible from '@public/imagenNoDisponible.webp';

interface CourseCardProps {
	curso: Course;
}

export default function CourseCard({ curso }: CourseCardProps) {
	const { id, title, imageUrl, price, moduleCount } = curso;

	const addToCart = useCartStore((state) => state.agregarCurso);
	const handleAddToCart = () => {
		addToCart({
			id,
			title,
			imageUrl,
			price,
		});
	};
	return (
		<div className="rounded-lg overflow-hidden font-montserrat-fuente">
			<div>
				<Image
					src={imageUrl || ImagenNoDisponible}
					alt={title}
					className=" object-cover"
					width={350}
					height={350}
				/>
			</div>
			<div className="bg-white p-4 text-black max-h-[200px]">
				<div className="mb-2">
					<h3 className=" font-bold text-[#0e0a1f] leading-tight max-w-[270px] mb-1">
						{title}
					</h3>
					{/* <p className="text-sm font-medium mt-1">{trendDescription}</p> */}
					<p className="text-sm text-gray-500">
						{formatModuleCount(moduleCount)}
					</p>
				</div>
				<div className="flex flex-col gap-2.5">
					<div className="flex items-center gap-2">
						<p className="text-sm line-through text-gray-500">
							{formatPriceInSoles(price)}
						</p>
						<p className="text-sm  text-trendacademy-rosado">{50}% Dscto.</p>
					</div>
					<button
						onClick={handleAddToCart}
						className="py-2 inline-flex items-center justify-center font-montserrat-fuente gap-2 font-semibold text-sm transition-colors duration-300 ease-in-out bg-trendacademy-rosado text-white hover:bg-[#d11f73] rounded-[5px] px-4 cursor-pointer"
					>
						<Image
							src={CartIcon}
							alt="icono de cart"
							className="object-cover w-[25px] h-auto will-change-transform"
						/>
						{applyDiscount(price, '50')}
					</button>
				</div>
			</div>
		</div>
	);
}
