import { Check } from 'lucide-react';
import Image from 'next/image';
import ImagenCaracteristicas from '@public/home/imagenCaracteristicas.png';
import AdornoCaracteristicas from '@public/home/adornoCaracteristicas.png';

export default function CaracteristicasMain() {
	const features = [
		{
			id: 1,
			title: 'Clases 100% Grabadas',
			description: 'Accede a las clases cuando lo necesites',
		},
		{
			id: 2,
			title: 'Acceso de por vida',
			description: 'Podrás ver el curso siempre que necesites',
		},
		{
			id: 3,
			title: 'Actualizaciones de contenido',
			description: 'Tendrás las mejores novedades de la plataforma.',
		},
		{
			id: 4,
			title: 'Certificación digital',
			description: 'Al finalizar con éxito certificado',
		},
		{
			id: 5,
			title: 'Comunidad privada',
			description: 'Donde compartir dudas con otros alumnos',
		},
	];

	return (
		<div className="w-full font-montserrat-fuente">
			<div className="grid grid-cols-1 md:grid-cols-2  items-center w-full relative">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-1 relative z-10">
					{features.map((feature) => (
						<div key={feature.id} className="flex items-start gap-3">
							<div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#054C9B] flex items-center justify-center mt-1">
								<Check className="w-5 h-5 text-white" />
							</div>
							<div>
								<h3 className="font-semibold text-white">{feature.title}</h3>
								{feature.description && (
									<p className="text-sm text-gray-300">{feature.description}</p>
								)}
							</div>
						</div>
					))}
				</div>
				<Image
					src={AdornoCaracteristicas}
					alt="Plataforma del curso"
					className="object-cover rounded-md w-[600px] select-none pointer-events-none absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
				/>
				<div className="mt-6 md:mt-0 relative z-10">
					<Image
						src={ImagenCaracteristicas}
						alt="Plataforma del curso"
						className="object-cover rounded-md select-none pointer-events-none w-full"
					/>
				</div>
			</div>
		</div>
	);
}
