'use client';
import Image from 'next/image';
import { Button } from '@/common/components/shadcnui/button';
import { Trash2 } from 'lucide-react';
import { formatPriceInSoles } from '@/common/helpers/formatPrice';
import ImagenNoDisponible from '@public/imagenNoDisponible.webp';
import { useCartStore } from '../store/cart';
import { CourseCart } from '@root/src/common/types/course';

export const CartItem = ({ curso }: { curso: CourseCart }) => {
	const { eliminarCurso } = useCartStore();

	return (
		<div className="overflow-hidden border border-gray-500 rounded-lg bg-slate-800">
			<div className="flex flex-col sm:flex-row">
				<div className="relative h-48 sm:h-auto sm:w-48 flex-shrink-0">
					<Image
						src={curso.imageUrl || ImagenNoDisponible}
						alt={curso.title}
						fill
						className="object-cover"
					/>
				</div>
				<div className="p-6 flex-1">
					<div className="flex flex-col sm:flex-row justify-between">
						<div>
							<h3 className="text-lg font-semibold mb-2">{curso.title}</h3>
							<p className="text-gray-300 mb-1">Instructor: {curso.title}</p>
						</div>
						<div className="mt-4 sm:mt-0 flex flex-col items-end">
							<span className="text-base font-semibold">
								{formatPriceInSoles(curso.price)}
							</span>
							<Button
								variant="ghost"
								size="sm"
								className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-2"
								onClick={() => eliminarCurso(curso.id)}
							>
								<Trash2 className="h-4 w-4 mr-1" />
								Eliminar
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
