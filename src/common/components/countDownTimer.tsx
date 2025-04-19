'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import useCountdown, { TimeLeft } from '../hooks/useCountdown';
import { Button } from './shadcnui/button';
import Image from 'next/image';

interface BannerBlackFridayProps {
	saleEndDate: Date; // Recibe la fecha como prop
}

const BannerBlackFriday = ({ saleEndDate }: BannerBlackFridayProps) => {
	const [isVisible, setIsVisible] = useState(true);
	const timeLeft: TimeLeft = useCountdown(saleEndDate);

	if (!isVisible || timeLeft.isExpired) return null;

	return (
		<div className=" relative bg-[#054C9B] py-1 px-6">
			<div className="flex w-full  gap-4 items-center justify-center">
				<Image
					src="/reloj.png"
					alt="icono de tiempo"
					className="object-cover w-[28px] h-auto"
					width={18}
					height={18}
				/>
				<div className="flex gap-3 justify-center items-center">
					<p className=" text-white text-xs sm:text-base font-semibold flex flex-col items-center">
						<span className="mr-1 leading-none sm:hidden">Termina</span>
						En
					</p>
					<div className="flex items-center gap-3 max-md:flex-wrap">
						<div className="flex items-center  rounded-lg  ">
							{timeLeft.days > 0 && (
								<span className="flex  gap-0.5 leading-none items-center justify-center p-2  text-white text-lg sm:text-xl font-bold flex-col">
									{timeLeft.days}
									<span className="text-xs leading-none font-normal">Días</span>
								</span>
							)}
							<span className="flex gap-0.5 leading-none  items-center justify-center p-2 text-white text-lg sm:text-xl font-bold flex-col">
								{timeLeft.hours.toString().padStart(2, '0')}
								<span className="text-xs leading-none font-normal">Horas</span>
							</span>
							<span className="flex  gap-0.5 leading-none  items-center justify-center p-2 text-white text-lg sm:text-xl font-bold flex-col">
								{timeLeft.minutes.toString().padStart(2, '0')}
								<span className="text-xs leading-none font-normal">
									Minutos
								</span>
							</span>
							<span className="flex  gap-0.5 leading-none  items-center justify-center p-2 text-white text-lg sm:text-xl font-bold flex-col">
								{timeLeft.seconds.toString().padStart(2, '0')}
								<span className="text-xs leading-none font-normal">
									Segundos
								</span>
							</span>
						</div>
						<p className=" text-white hidden sm:block text-xs sm:text-base font-semibold">
							Termina la Oferta !
						</p>

						{/* <Button size="sm" className="text-sm">
							Buy now
						</Button> */}
					</div>
				</div>
			</div>
			<Button
				variant="ghost"
				className="group  size-8 shrink-0 p-0 hover:bg-transparent cursor-pointer absolute right-4 top-1/2  -translate-y-1/2"
				onClick={() => setIsVisible(false)}
				aria-label="Close banner"
			>
				<X
					size={16}
					strokeWidth={2}
					className="opacity-60 transition-opacity group-hover:opacity-100 text-white "
					aria-hidden="true"
				/>
			</Button>
		</div>
	);
};

export default BannerBlackFriday;
