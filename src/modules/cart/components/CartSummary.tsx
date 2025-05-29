'use client';
import { Separator } from '@shadcnui/separator';
import { ChevronRight } from 'lucide-react';

export const CartSummary = ({
	subtotal,
	onProceedToPay,
	loading,
	disabled,
}: {
	subtotal: number;
	onProceedToPay: () => void;
	loading: boolean;
	disabled: boolean;
}) => {
	return (
		<div className="p-6 border border-gray-500 rounded-lg bg-slate-800">
			<h3 className="text-lg font-semibold mb-4">Resumen de compra</h3>
			<div className="space-y-4">
				<div className="flex justify-between">
					<span className="text-gray-300">Subtotal</span>
					<span>S/{subtotal.toFixed(2)}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-gray-300">IVA (16%)</span>
					<span>S/0.00</span>
				</div>
				<Separator />
				<div className="flex justify-between font-semibold text-lg">
					<span className="text-gray-300">Total</span>
					<span>S/{subtotal.toFixed(2)}</span>
				</div>

				<div className="pt-4">
					<button
						onClick={onProceedToPay}
						disabled={disabled}
						className="w-full text-sm cursor-pointer bg-[#d11f73] hover:bg-[#d81b60] text-white h-10 shadow-lg shadow-[#e91e63]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#e91e63]/30 flex items-center gap-2 justify-center rounded-lg"
					>
						{loading ? 'Procesando...' : 'Proceder al pago'}
						<ChevronRight className="h-4 w-4 ml-1" />
					</button>
					<p className="text-xs text-gray-400 text-center mt-4">
						Al completar tu compra, aceptas nuestros términos y condiciones y
						política de privacidad.
					</p>
				</div>
			</div>
		</div>
	);
};
