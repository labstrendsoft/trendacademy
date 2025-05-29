'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Exitoview() {
	const router = useRouter(); // ✅

	const searchParams = useSearchParams();

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		async function confirmarPago() {
			const paymentId = searchParams.get('external_reference');
			const externalChargeId = searchParams.get('collection_id');
			console.log(paymentId, externalChargeId);
			if (!paymentId || !externalChargeId) {
				setError(
					'No se encontraron los datos necesarios para confirmar el pago.'
				);
				setLoading(false);
				return;
			}

			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_BACKEND}/payment/confirm`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							paymentId,
							externalChargeId,
						}),
					}
				);

				if (!res.ok) {
					const data = await res.json();
					throw new Error(data.message || 'Error confirmando pago');
				}

				setSuccess(true);
				// 🔽 Limpia el storage aquí
				localStorage.removeItem('cart-cursos');
				// ✅ Forzar refresh del router para que se actualice el estado de la app
				router.refresh();

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (e: any) {
				setError(e.message);
			} finally {
				setLoading(false);
			}
		}

		confirmarPago();
	}, [searchParams, router]);

	if (loading) return <p className="text-white">Confirmando pago...</p>;
	if (error) return <p className="text-red-500">Error: {error}</p>;
	if (success)
		return <p className="text-green-500">Pago confirmado exitosamente 🎉</p>;

	return null;
}
