'use client';
import React, { useState } from 'react';
import { useCartStore } from './store/cart';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@root/src/common/components/shadcnui/button';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { CartSummary } from './components/CartSummary';
import { CartItem } from './components/CartItem';
import { calculateSubtotal } from './utils';

export const CartView = () => {
	const { cursos } = useCartStore();
	const [loading, setLoading] = useState(false);

	const { data: session } = useSession();

	const subtotal = calculateSubtotal(cursos);

	const handleProceedToPay = async () => {
		setLoading(true);

		try {
			// Aquí armamos el payload que espera tu backend
			const payload = {
				userId: session?.user?.id, // Asegúrate de obtener el ID real del usuario
				courseIds: cursos.map((curso) => curso.id),
			};

			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_BACKEND}/payment`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(payload),
				}
			);

			const data = await res.json();

			if (data.init_point) {
				// Redirigimos al link de MercadoPago
				window.location.href = data.init_point;
			} else {
				toast.error(data.message || 'No se pudo iniciar el proceso de pago.');
			}
		} catch (error: unknown) {
			const msg =
				error instanceof Error
					? error.message
					: 'Error inesperado al procesar el pago.';
			toast.error(msg);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container mx-auto px-4 py-8 max-w-6xl text-white font-montserrat-fuente">
			<div className="flex items-center mb-8">
				<h1 className="text-xl font-bold text-center flex-1">
					Tu Carrito de Compras
				</h1>
			</div>

			{cursos.length === 0 ? (
				<div className="text-center py-16 space-y-4">
					<div className="flex justify-center">
						<ShoppingCart className="h-16 w-16 text-muted-foreground" />
					</div>
					<h2 className="text-xl font-semibold">Tu carrito está vacío</h2>
					<p className="text-muted-foreground max-w-md mx-auto">
						Parece que aún no has añadido ningún curso a tu carrito. Explora
						nuestro catálogo para encontrar el curso perfecto para ti.
					</p>
					<Button asChild className="mt-4">
						<Link href="/cursos">Explorar cursos</Link>
					</Button>
				</div>
			) : (
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 space-y-6">
						{cursos.map((curso) => (
							<CartItem key={curso.id} curso={curso} />
						))}
					</div>

					<div className="lg:col-span-1">
						<CartSummary
							subtotal={subtotal}
							onProceedToPay={handleProceedToPay}
							loading={loading}
							disabled={loading || cursos.length === 0}
						/>
					</div>
				</div>
			)}
		</div>
	);
};
