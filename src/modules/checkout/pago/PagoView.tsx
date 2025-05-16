'use client';

import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';

import { useCartStore } from '../../cart/store/cart';
import { useSession } from 'next-auth/react';

export const PagoView = () => {
	const cursos = useCartStore((state) => state.cursos);
	const limpiarCarrito = useCartStore((state) => state.limpiarCarrito);
	const [loading, setLoading] = useState(false);
	const { data: session } = useSession();

	const handleInscribirse = async () => {
		if (cursos.length === 0) {
			alert('No hay cursos en el carrito');
			return;
		}

		const userId = session?.user.id; // Reemplaza por el ID real del usuario autenticado
		const token = session?.user.token; // Reemplaza con tu token real, o consíguelo desde auth

		const courseIds = cursos.map((curso) => curso.id);

		setLoading(true);
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_BACKEND}/course/enroll`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						userId,
						courseIds,
					}),
				}
			);

			if (res.ok || res.status === 201) {
				alert('Te has inscrito correctamente');
				limpiarCarrito();
			} else {
				const data = await res.json();
				alert(data?.message || 'Hubo un problema al inscribirte');
			}
		} catch (error) {
			console.error(error);
			alert('Error al procesar la inscripción');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container max-w-[1100px] mx-auto py-8">
			<button
				onClick={handleInscribirse}
				disabled={loading}
				className="w-full flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition disabled:opacity-50"
			>
				<UserPlus size={16} />
				{loading ? 'Inscribiendo...' : 'Inscribirse'}
			</button>
		</div>
	);
};
