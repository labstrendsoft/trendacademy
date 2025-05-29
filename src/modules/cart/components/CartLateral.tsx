'use client';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@shadcnui/sheet';
import { useCartStore } from '../store/cart';
import { useCartUIStore } from '../store/ui';
import Link from 'next/link';

export const CartSheet = () => {
	const { cursos, eliminarCurso, limpiarCarrito } = useCartStore();
	const { isCartOpen, cerrarCarrito } = useCartUIStore();
	return (
		<Sheet open={isCartOpen} onOpenChange={cerrarCarrito}>
			<SheetContent
				side="right"
				className="w-[320px] sm:w-[400px] font-montserrat-fuente lg:hidden"
			>
				<SheetHeader>
					<SheetTitle>Tu carrito</SheetTitle>
					<SheetDescription className="max-w-[300px]">
						Aquí puedes revisar y modificar los artículos en tu carrito.
					</SheetDescription>
				</SheetHeader>

				<div className="p-4 space-y-3">
					{cursos.length === 0 ? (
						<p className="text-sm text-gray-500">
							No hay cursos en el carrito.
						</p>
					) : (
						<>
							{cursos.map((curso) => (
								<div
									key={curso.id}
									className="flex justify-between items-center"
								>
									<span>{curso.title}</span>
									<button
										onClick={() => eliminarCurso(curso.id)}
										className="text-red-500 hover:underline"
									>
										Quitar
									</button>
								</div>
							))}
							<button
								onClick={limpiarCarrito}
								className="mt-4 w-full bg-red-600 text-white py-2 rounded"
							>
								Vaciar carrito
							</button>
						</>
					)}
					<Link
						href="/carrito"
						className="mt-4 w-full bg-red-600 text-white py-2 rounded"
					>
						Ir al carrito
					</Link>
				</div>
			</SheetContent>
		</Sheet>
	);
};
