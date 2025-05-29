'use client';
import { Separator } from '@shadcnui/separator';
import { DialogClose } from '@shadcnui/dialog';
import { useCartUIStore } from '../store/ui';
import { useRouter } from 'next/navigation';

export const CartSummaryModal = ({ subtotal }: { subtotal: number }) => {
	const { cerrarCarrito } = useCartUIStore();
	const router = useRouter();

	const handleBuyClick = () => {
		cerrarCarrito(); // si lo necesitas para cerrar el modal manualmente
		router.push('/carrito'); // redirige a la página de compra
	};
	return (
		<div className="py-4  max-w-[300px] w-full border-l border-gray-200 pl-4">
			<div className="space-y-4">
				<div className="flex justify-between">
					<span className="text-gray-500 text-sm">Subtotal</span>
					<span>S/ {subtotal.toFixed(2)}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-gray-500 text-sm">Descuentos Aplicados(%)</span>
					<span>S/ 0.00</span>
				</div>
				<Separator />
				<div className="flex justify-between font-semibold text-lg">
					<span className="text-gray-500 text-sm">Total</span>
					<span>S/ {subtotal.toFixed(2)}</span>
				</div>

				<div>
					<button
						onClick={handleBuyClick}
						className="whitespace-nowrap w-full mb-2 bg-trendacademy-rosado text-white py-2 rounded-md font-medium cursor-pointer text-sm hover:bg-trendacademy-rosado/90 hover:text-white"
					>
						Comprar
					</button>
					<DialogClose asChild>
						<button className="text-center text-sm w-full font-semibold text-trendacademy-rosado cursor-pointer hover:text-trendacademy-rosado/80">
							Seguir comprando
						</button>
					</DialogClose>
				</div>
			</div>
		</div>
	);
};
