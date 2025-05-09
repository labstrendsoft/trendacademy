import Image, { StaticImageData } from 'next/image';
import ButtonAcademy from './ButtonAcademy';
import CartIcon from '@public/iconos/cartIcon.webp';
import { formatModuleCount } from '../../helpers/formatModuleCount';
import { applyDiscount, formatPriceInSoles } from '../../helpers/formatPrice';

interface CourseCardProps {
	title: string;
	imageAlt: string;
	imageSrc: StaticImageData | string;
	trendDescription?: string;
	modules: number;
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
	return (
		<div className="rounded-lg overflow-hidden font-montserrat-fuente">
			<div>
				<Image
					src={imageSrc}
					alt={imageAlt}
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
					<p className="text-sm text-gray-500">{formatModuleCount(modules)}</p>
				</div>
				<div className="flex flex-col gap-2.5">
					<div className="flex items-center gap-2">
						<p className="text-sm line-through text-gray-500">
							{formatPriceInSoles(originalPrice)}
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
						{applyDiscount(originalPrice, discountedPrice)}
					</ButtonAcademy>
				</div>
			</div>
		</div>
	);
}
