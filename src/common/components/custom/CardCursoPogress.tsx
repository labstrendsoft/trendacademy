import Image, { StaticImageData } from 'next/image';
import ButtonAcademy from './ButtonAcademy';
import { Progress } from '../shadcnui/progress';

interface CourseCardProps {
	title: string;
	imageAlt: string;
	imageSrc: StaticImageData | string;
	trendDescription?: string;
	modules: string;
	originalPrice: string;
	discountedPrice: string;
}

export default function CourseCardProgress({
	title,
	imageAlt,
	imageSrc,
}: CourseCardProps) {
	return (
		<div className="rounded-lg overflow-hidden font-montserrat-fuente">
			<div>
				<Image
					src={imageSrc}
					alt={imageAlt}
					className=" object-cover"
					width={400}
					height={400}
				/>
			</div>
			<div className="bg-white p-4 text-black max-h-[200px]">
				<h3 className=" font-bold text-[#0e0a1f] leading-tight max-w-[270px] mb-1.5">
					{title}
				</h3>
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-4">
						<Progress
							value={33}
							className="bg-gray-200 [&_[data-slot=progress-indicator]]:bg-green-500 h-1"
						/>
						<span className="text-[#939393] font-normal font-montserrat-fuente">
							33%
						</span>
					</div>

					<ButtonAcademy href="/" variant="filled" className="py-2 w-fit">
						Continuar Curso
					</ButtonAcademy>
				</div>
			</div>
		</div>
	);
}
