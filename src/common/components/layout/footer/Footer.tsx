import Link from 'next/link';
import Image from 'next/image';
import logoTrend from '@public/logo.webp';
import { socialLinks } from '@/common/data/redes';

export default function Footer() {
	return (
		<footer className="bg-black text-[#FFFFFF] pt-14 pb-10 px-6 font-montserrat-fuente">
			<div className="max-w-[1100px] mx-auto">
				<div className="flex flex-col md:flex-row justify-between">
					<div className="flex flex-wrap gap-x-12 gap-y-2 text-sm mb-8 md:mb-0">
						<div className="flex flex-col gap-2.5">
							<Link href="/" className="hover:text-gray-300">
								Inicio
							</Link>
							<Link href="/nosotros" className="hover:text-gray-300">
								Nosotros
							</Link>
							<Link href="/contacto" className="hover:text-gray-300">
								Contacto
							</Link>
						</div>
						<div className="flex flex-col gap-2.5">
							<Link
								href="/terminos-y-condiciones"
								className="hover:text-gray-300"
							>
								Términos y condiciones
							</Link>

							<Link
								href="/politicas-de-privacidad"
								className="hover:text-gray-300"
							>
								Políticas de privacidad
							</Link>

							<Link
								href="/politicas-de-cookies"
								className="hover:text-gray-300"
							>
								Políticas de Cookies
							</Link>
						</div>
						<div className="flex flex-col gap-2.5">
							<Link href="/afiliarse" className="hover:text-gray-300">
								Alfaparf
							</Link>
							<Link href="/volver" className="hover:text-gray-300">
								Yellow{' '}
							</Link>
							<Link href="/italian-map" className="hover:text-gray-300">
								Italian Max
							</Link>
						</div>
					</div>

					<div className="flex flex-col items-center">
						<div className="mb-4">
							<Image
								src={logoTrend}
								alt="logo de trendacademy"
								className="object-contain w-[80px] h-auto will-change-transform"
							/>
						</div>
						<div className="flex items-center gap-4">
							{socialLinks.map((social, index) => (
								<Link
									key={index}
									href={social.url}
									className=" flex items-center  "
									target="_blank"
									rel="noopener noreferrer"
								>
									<Image
										src={social.icon}
										alt={social.name}
										className="hover:opacity-80 object-contain transition-opacity w-[25px] h-[25px]
									"
									/>
								</Link>
							))}
						</div>
					</div>
				</div>

				<div className="mt-8 pt-6 border-t border-white/30 text-center text-xs text-[#FFFFFF]">
					© 2025 TRENDACADEMY. TODOS LOS DERECHOS RESERVADOS
				</div>
			</div>
		</footer>
	);
}
