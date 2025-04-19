import { Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import AdornoPc from '../../../../public/adorno10.png';

export default function CourseAccessFeatures() {
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
		<div className="bg-[#0c0c1d] text-white py-16 px-4 md:px-8">
			<div className="max-w-[800px] mx-auto px-4 md:px-0">
				<h2 className="text-2xl md:text-3xl font-bold text-start sm:text-center mb-10 max-w-[400px] md:max-w-[500px] sm:mx-auto">
					Accede al curso en cualquier momento y lugar
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2  items-center">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-1">
						{features.map((feature) => (
							<div key={feature.id} className="flex items-start gap-3">
								<div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#054C9B] flex items-center justify-center mt-1">
									<Check className="w-3 h-3 text-white" />
								</div>
								<div>
									<h3 className="font-semibold">{feature.title}</h3>
									{feature.description && (
										<p className="text-sm text-gray-300">
											{feature.description}
										</p>
									)}
								</div>
							</div>
						))}
						<p className=" mb-6 text-gray-300 pt-6">
							¡Transforma tu salón sin salir de casa!
						</p>
					</div>

					<div className="max-w-[300px] mx-auto mt-6 md:mt-0">
						<Image
							src={AdornoPc}
							alt="Plataforma del curso"
							className="object-cover rounded-md select-none pointer-events-none"
						/>
					</div>
				</div>

				<div className="mt-10 text-center">
					<Link
						href="/cursos/marketing-belleza"
						className="mb-4	 px-10 py-3.5 bg-[#054C9B] text-white rounded-lg text-xl sm:text-2xl  hover:bg-[#054C9B] transition"
					>
						Acceder al curso
					</Link>
				</div>
			</div>
		</div>
	);
}
