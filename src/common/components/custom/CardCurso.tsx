import Image, { StaticImageData } from 'next/image';
import ButtonAcademy from './ButtonAcademy';
import CartIcon from '@public/iconos/cartIcon.webp';

interface CourseCardProps {
	title: string;
	imageAlt: string;
	imageSrc: StaticImageData;
	trendDescription?: string;
	modules: string;
	originalPrice: string;
	discountedPrice: string;
}

export default function CourseCard({
	title,
	imageAlt,
	imageSrc,
	modules,
	originalPrice,
	discountedPrice,
}: CourseCardProps) {
	// Calcula el precio final aplicando el descuento
	const calculateDiscountedAmount = () => {
		const original = parseFloat(originalPrice);
		const discountPercent = parseFloat(discountedPrice);

		if (isNaN(original) || isNaN(discountPercent) || original <= 0) {
			return null;
		}

		const discountAmount = original * (discountPercent / 100);
		const finalPrice = original - discountAmount;

		return finalPrice.toFixed(2); // retorna "999.50"
	};

	const finalPrice = calculateDiscountedAmount();

	return (
		<div className="rounded-lg overflow-hidden font-montserrat-fuente">
			<div>
				<Image src={imageSrc} alt={imageAlt} className=" object-cover" />
			</div>
			<div className="bg-white p-4 text-black max-h-[200px]">
				<div className="mb-2">
					<h3 className=" font-bold text-[#0e0a1f] leading-tight max-w-[270px] mb-1">
						{title}
					</h3>
					{/* <p className="text-sm font-medium mt-1">{trendDescription}</p> */}
					<p className="text-sm text-gray-500">{modules}</p>
				</div>
				<div className="flex flex-col gap-2.5">
					<div className="flex items-center gap-2">
						<p className="text-sm line-through text-gray-500">
							S/ {originalPrice}
						</p>
						<p className="text-sm  text-trendacademy-rosado">
							{discountedPrice}% Dscto.
						</p>
					</div>
					<ButtonAcademy
						href="/"
						variant="icon"
						className="py-2"
						icon={
							<Image
								src={CartIcon}
								alt="icono de cart"
								className="object-cover w-[25px] h-auto will-change-transform"
							/>
						}
					>
						{finalPrice}
					</ButtonAcademy>
				</div>
			</div>
		</div>
	);
}
