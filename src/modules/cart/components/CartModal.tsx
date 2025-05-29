import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@shadcnui/dialog';

import { useCartStore } from '../store/cart';
import Image from 'next/image';
import CartIcon from '@public/iconos/cartIcon.webp';
import ImagenNoDisponible from '@public/imagenNoDisponible.webp';
import { Trash } from 'lucide-react';
import { calculateSubtotal } from '../utils';
import { CartSummaryModal } from './CartSummaryModal';
import {
	applyDiscount,
	formatPriceInSoles,
} from '@root/src/common/helpers/formatPrice';
import { useCartUIStore } from '../store/ui';

export function CartModal() {
	const { cursos, eliminarCurso } = useCartStore();
	const subtotal = calculateSubtotal(cursos);
	const { isCartOpen, toggleCarrito } = useCartUIStore();

	return (
		<Dialog open={isCartOpen} onOpenChange={toggleCarrito}>
			<DialogTrigger asChild>
				<button className="relative cursor-pointer">
					{' '}
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
			</DialogTrigger>
			<DialogContent className="sm:max-w-4xl">
				<DialogHeader>
					<DialogTitle>Tu carrito de compras</DialogTitle>
					<DialogDescription>
						Tienes {cursos.length} Items en tu carrito
					</DialogDescription>
				</DialogHeader>
				<div className="p-4 space-y-3">
					{cursos.length === 0 ? (
						<p className="text-sm text-gray-500">
							No hay cursos en el carrito.
						</p>
					) : (
						<div className="flex gap-4 justify-between">
							<div className="w-full max-h-[222px] overflow-y-auto flex flex-col gap-2.5  divide-y divide-gray-200 pr-8">
								{cursos.map((curso) => (
									<div
										key={curso.id}
										className="flex justify-start items-center gap-2 pb-2.5 relative"
									>
										<Image
											src={curso.imageUrl || ImagenNoDisponible}
											alt={curso.title}
											className="object-cover rounded-xs"
											width={100}
											height={100}
										/>
										<div className="flex flex-col gap-2">
											<span className="text-sm font-semibold">
												{curso.title}
											</span>
											<div className="flex items-center gap-2">
												<p className="text-sm line-through text-gray-500">
													{formatPriceInSoles(curso.price)}
												</p>
												<p className="text-sm  text-trendacademy-rosado">
													{50}% Dscto.
												</p>
											</div>
											<span className="text-trendacademy-rosado font-semibold">
												{applyDiscount(curso.price, '50')}
											</span>
										</div>
										<button
											onClick={() => eliminarCurso(curso.id)}
											className="text-gray-500 hover:underline cursor-pointer absolute top-2 right-2"
										>
											<Trash className="size-6" />
										</button>
									</div>
								))}
							</div>

							<CartSummaryModal subtotal={subtotal} />
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
