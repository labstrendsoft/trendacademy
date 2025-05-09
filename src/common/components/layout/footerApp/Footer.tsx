import Link from 'next/link';
import Image from 'next/image';
import logoTrend from '@public/logo.webp';
import { socialLinks } from '@/common/data/redes';

export default function FooterApp() {
	return (
		<footer className="bg-black text-[#FFFFFF] pt-14 pb-10 px-6 font-montserrat-fuente">
			<div className="max-w-[1100px] mx-auto">
				<div className="flex flex-col md:flex-row justify-between">
					<div>
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

				<div className="mt-6 pt-6 border-t border-white text-center text-xs text-[#FFFFFF]">
					© 2025 TRENDACADEMY. TODOS LOS DERECHOS RESERVADOS
				</div>
			</div>
		</footer>
	);
}
