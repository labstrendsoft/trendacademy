'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { CreditCardIcon, CheckCircleIcon, ShoppingCart } from 'lucide-react';
import { Progress } from '@shadcnui/progress';
import { usePasosCheckoutStore } from '../store/pasos';
import { ActiveLinks } from './ActiveLinks';

const PASOS = [
	{
		name: 'Carrito',
		href: '/carrito',
		icon: <ShoppingCart className="size-4 md:size-5 " />,
	},

	{
		name: 'Pago',
		href: '/carrito/pago',
		icon: <CreditCardIcon className="size-4 md:size-5" />,
	},
	{
		name: 'Confirmado',
		href: '/pedidos/confirmacion',
		icon: <CheckCircleIcon className="size-4 md:size-5" />,
	},
];

export const PasosLinks = () => {
	const pathname = usePathname();
	const { currentStep, setStep } = usePasosCheckoutStore();

	useEffect(() => {
		// Si estamos en la ruta de éxito, marca todos los pasos como completados
		if (pathname === '/carrito/exito') {
			setStep(PASOS.length + 1); // El último paso
		} else {
			const step = PASOS.findIndex((step) => pathname === step.href) + 1;

			if (step !== currentStep) {
				setStep(step);
			}
		}
	}, [pathname, currentStep, setStep]);

	return (
		<div className="mt-4 mb-6 w-full">
			<div className="relative mx-auto w-full max-w-[180px]">
				{/* Pasos */}
				<div className="relative z-10 flex items-center justify-between">
					{PASOS.map((step, index) => {
						const isActive = currentStep === index + 1;
						const isCompleted = currentStep > index + 1;

						return (
							<ActiveLinks
								key={step.name}
								name={step.name}
								href={step.href}
								icon={step.icon}
								active={isActive}
								completed={isCompleted}
								index={index}
							/>
						);
					})}
				</div>

				{/* Barra de progreso en el medio */}
				<div className="absolute top-1/2 left-[6%] z-0 w-[88%] -translate-y-1/2">
					<Progress
						value={((currentStep - 1) / (PASOS.length - 1)) * 100} // Calcular el porcentaje de progreso
						className="h-0.5 rounded-md bg-gray-300 [&_[data-slot=progress-indicator]]:bg-green-500"
					/>
				</div>
			</div>
		</div>
	);
};

export default PasosLinks;
