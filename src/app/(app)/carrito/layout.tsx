import PasosLinks from '@root/src/modules/checkout/layout/PasosView';

export default function PedidosLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="mx-auto min-h-[calc(100vh-300px)] w-full px-4 pt-12 pb-12 lg:px-0">
			{/* <h3 className="text-marus-brown-300 mb-14 text-start text-lg font-bold">Sigue los pasos!</h3> */}
			<PasosLinks />
			{children}
		</div>
	);
}
