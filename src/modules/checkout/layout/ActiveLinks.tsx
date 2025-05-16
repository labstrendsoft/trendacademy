import { cn } from '@/lib/utils';

interface Props {
	name: string;
	href?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	icon?: any;
	active: boolean;
	completed: boolean;
	index?: number;
}

export const ActiveLinks = ({
	name,
	icon,
	active,
	completed,
	index = 0,
}: Props) => {
	return (
		<div className="group relative flex flex-col items-center gap-1 font-montserrat-fuente">
			{/* Número de paso */}
			<div
				className={cn(
					'absolute -top-7 flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-semibold',
					{
						'bg-trendacademy-rosado border-trendacademy-rosado text-white':
							active,
						'border-green-500 bg-green-500 text-white': completed,
						'border-gray-300 bg-gray-200 text-gray-500': !active && !completed,
					}
				)}
			>
				{index + 1}
			</div>

			{/* Ícono */}
			<div
				className={cn(
					'flex size-10 items-center justify-center rounded-full border-2 transition-colors duration-200',
					{
						'bg-trendacademy-rosado text-white border-trendacademy-rosado':
							active,
						'border-green-500 bg-green-100 text-green-600': completed,
						'border-gray-300 bg-trendacademy-morado text-gray-300':
							!active && !completed,
					}
				)}
			>
				{icon}
			</div>

			{/* Nombre del paso (solo en desktop) */}
			<p className="absolute -bottom-5.5 mt-1 hidden text-center text-xs text-white group-hover:text-white md:block">
				{name}
			</p>
		</div>
	);
};
