import React from 'react';
import { BannerContacto } from './components/Banner';
import { Button } from '@shadcnui/button';
import { Input } from '@shadcnui/input';
import { Textarea } from '@shadcnui/textarea';
import mail from '@public/iconos/mail.webp';
import phone from '@public/iconos/call.webp';
import time from '@public/iconos/time.webp';
import ubicacion from '@public/iconos/ubicación.webp';
import Image from 'next/image';
import Link from 'next/link';
import { socialLinks } from '@root/src/common/data/redes';

export const ContactoView = () => {
	return (
		<div>
			<BannerContacto />
			<div className="bg-[#05060A] w-full">
				<div className=" max-w-[1100px] mx-auto text-white py-16 w-full grid grid-cols-2 gap-16">
					<div>
						<div className="border-b border-white/30 pb-6 flex flex-col gap-2">
							<span className=" text-gray-300 mb-1 text-sm">
								Estamos aquí para ayudarte.
							</span>
							<h3 className="text-xl font-semibold text-white mb-3">
								¿Tienes dudas sobre nuestros cursos o quieres saber cuál es el
								ideal para ti?
							</h3>
							<p className=" text-gray-300 mb-1 text-sm">
								Puedes escribirnos o llamarnos y te responderemos lo antes
								posible.
							</p>
						</div>
						<div className="py-8 grid grid-cols-2 gap-6 border-b border-white/30">
							<div className="flex items-center gap-4">
								<Image src={phone} alt="celular" className="object-cover w-8" />
								<span className="text-sm">+51 972 161 054</span>
							</div>
							<div className="flex items-center gap-4">
								<Image src={mail} alt="celular" className="object-cover w-8" />
								<span className="text-sm">contacto@trendacademy.com</span>
							</div>
							<div className="flex items-center gap-4">
								<Image src={time} alt="celular" className="object-cover w-8" />
								<span className="text-sm">
									Lunes a Sábado 9:00 am. - 7:00 pm.
								</span>
							</div>
							<div className="flex items-center gap-4">
								<Image
									src={ubicacion}
									alt="celular"
									className="object-cover w-8"
								/>
								<span className="text-sm">Lima, Perú</span>
							</div>
						</div>

						<div className="flex flex-col gap-4 py-6">
							<h4 className=" text-white text-sm">
								Síguenos en nuestras Redes Sociales:{' '}
							</h4>
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
					<div className="bg-gradient-to-r from-[#161A31] to-[#080B1A]  border border-[#161A31] rounded-lg px-10 py-12  ">
						<div className="mb-6">
							<h3 className="text-xl font-semibold text-white mb-2">
								Envíanos un mensaje
							</h3>
							<p className="text-gray-300 text-sm">
								Llena el formulario con tus datos y envíanos tu consulta,
								nosotros nos pondremos en contacto a la brevedad posible.
							</p>
						</div>

						<form className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<label htmlFor="nombre" className="text-white text-sm">
										Nombre
									</label>
									<Input
										id="nombre"
										placeholder="Nombre"
										className="text-white bg-[#070A19] border-[#161A31] focus-visible:ring-0 focus-visible:border-gray-600 placeholder:text-gray-100/40"
									/>
								</div>
								<div className="space-y-2">
									<label htmlFor="empresa" className="text-white text-sm">
										Empresa
									</label>
									<Input
										id="empresa"
										placeholder="Empresa"
										className="text-white bg-[#070A19] border-[#161A31] focus-visible:ring-0 focus-visible:border-gray-600 placeholder:text-gray-100/40"
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<label htmlFor="celular" className="text-white text-sm">
										Celular
									</label>
									<Input
										id="celular"
										placeholder="Celular"
										className="text-white bg-[#070A19] border-[#161A31] focus-visible:ring-0 focus-visible:border-gray-600 placeholder:text-gray-100/40"
									/>
								</div>
								<div className="space-y-2">
									<label htmlFor="correo" className="text-white text-sm">
										Correo
									</label>
									<Input
										id="correo"
										placeholder="Correo"
										className="text-white bg-[#070A19] border-[#161A31] focus-visible:ring-0 focus-visible:border-gray-600 placeholder:text-gray-100/40"
									/>
								</div>
							</div>

							<div className="space-y-2">
								<label htmlFor="titulo" className="text-white text-sm">
									Título
								</label>
								<Input
									id="titulo"
									placeholder="Título"
									className="text-white bg-[#070A19] border-[#161A31] focus-visible:ring-0 focus-visible:border-gray-600 placeholder:text-gray-100/40"
								/>
							</div>

							<div className="space-y-2">
								<label htmlFor="mensaje" className="text-white text-sm">
									Mensaje
								</label>
								<Textarea
									id="mensaje"
									placeholder="Mensaje"
									className="text-white bg-[#070A19] border-[#161A31] focus-visible:ring-0 focus-visible:border-gray-600 placeholder:text-gray-100/40 min-h-[120px]"
								/>
							</div>

							<Button className="w-full bg-[#e91e63] hover:bg-[#d81b60] text-white">
								Enviar
							</Button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
