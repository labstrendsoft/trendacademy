export default function BeautyCourseBenefits() {
	const benefits = [
		{
			id: 1,
			text: 'Aprenderás a vender más sin depender solo de redes.',
		},
		{
			id: 2,
			text: 'Aprenderás a posicionar tu salón como una marca premium.',
		},
		{
			id: 3,
			text: 'Descubrirás cómo hacer publicidad efectiva sin perder dinero.',
		},
		{
			id: 4,
			text: 'Sabrás cómo crear promociones sin afectar la rentabilidad.',
		},
		{
			id: 5,
			text: 'Te enseñaremos estrategias para fidelizar y hacer que tus clientes regresen.',
		},
		{
			id: 6,
			text: 'Dominarás Meta Ads, WhatsApp Marketing y más.',
		},
	];

	return (
		<div className="bg-gradient-to-r from-[#161A31] to-[#080B1A] text-white py-16 px-4 md:px-8">
			<div className="max-w-3xl mx-auto">
				<h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
					¿Por qué este curso es para ti?
				</h2>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
					{benefits.map((benefit) => (
						<div key={benefit.id} className="flex items-start gap-3">
							<div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#E62480] mt-1"></div>
							<p className="text-sm md:text-base">{benefit.text}</p>
						</div>
					))}
				</div>

				<p className="text-center mt-12 max-w-lg mx-auto text-sm md:text-base">
					Este curso está diseñado para dueños de salones de belleza que quieren
					escalar su negocio y aumentar sus ingresos.
				</p>
			</div>
		</div>
	);
}
