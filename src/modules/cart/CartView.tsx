'use client';
import React from 'react';
import { useCartStore } from './store/cart';
import Link from 'next/link';
import { ChevronRight, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@root/src/common/components/shadcnui/button';
import Image from 'next/image';
import { Separator } from '@root/src/common/components/shadcnui/separator';
import ImagenNoDisponible from '@public/imagenNoDisponible.webp';
import { formatPriceInSoles } from '@root/src/common/helpers/formatPrice';

export const CartView = () => {
	const { cursos, eliminarCurso } = useCartStore();
	const subtotal = cursos.reduce(
		(total, curso) => total + parseFloat(curso.price),
		0
	);

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
							<div
								key={curso.id}
								className="overflow-hidden border border-gray-500 rounded-lg bg-slate-800"
							>
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
												<h3 className="text-lg font-semibold mb-2">
													{curso.title}
												</h3>
												<p className="text-gray-300 mb-1">
													Instructor: {curso.title}
												</p>
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
						))}
					</div>

					<div className="lg:col-span-1">
						<div className="p-6 border border-gray-500 rounded-lg bg-slate-800">
							<h3 className="text-lg font-semibold mb-4">Resumen de compra</h3>
							<div className="space-y-4">
								<div className="flex justify-between">
									<span className="text-gray-300">Subtotal</span>
									<span>{formatPriceInSoles(subtotal)}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-300">IVA (16%)</span>
									<span>S/0.00</span>
								</div>
								<Separator />
								<div className="flex justify-between font-semibold text-lg ">
									<span className="text-gray-300">Total</span>
									<span>$21321</span>
								</div>

								<div className="pt-4">
									<Link
										href="/carrito/pago"
										className="w-full  text-sm cursor-pointer bg-[#d11f73] hover:bg-[#d81b60] text-white h-10 shadow-lg shadow-[#e91e63]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#e91e63]/30 flex items-center gap-2 justify-center rounded-lg"
									>
										Proceder al pago
										<ChevronRight className="h-4 w-4 ml-1" />
									</Link>
									<p className="text-xs text-gray-400 text-center mt-4">
										Al completar tu compra, aceptas nuestros términos y
										condiciones y política de privacidad.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
