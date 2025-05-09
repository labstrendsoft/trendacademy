/* eslint-disable @typescript-eslint/no-explicit-any */

import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@shadcnui/dropdown-menu';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import UserIcon from '@public/iconos/iconUser.webp';
import Image from 'next/image';
export function UserDropdownMenu({ usuario }: any) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className=" focus-visible:ring-0 focus:outline-none cursor-pointer flex  w-full">
					<Image
						src={UserIcon}
						alt="icono de un usuario"
						className="object-cover w-[25px]  h-auto"
					/>
					<ChevronDown className="w-auto h-auto text-white" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-56  font-montserrat-fuente  p-0"
				align="end"
				forceMount
				sideOffset={20}
			>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-0.5">
						<p className="text-sm  font-medium">{usuario.email}</p>
						<p className="text-muted-foreground text-xs ">
							{usuario.role === 'STUDENT' ? 'Estudiante' : 'Administrador'}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator className="mb-0" />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link
							href="/account/dashboard/profile"
							className="flex items-center gap-2"
						>
							<User className="mr-2 h-4 w-4" />
							<span>Perfil</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link href="/account/dashboard" className="flex items-center gap-2">
							<Settings className="mr-2 h-4 w-4" />
							<span>Configuración</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator className="my-0" />
				<DropdownMenuItem asChild>
					<button
						onClick={() => signOut()}
						className="flex w-full items-center gap-2"
					>
						<LogOut className="mr-2 h-4 w-4" />
						<span>Cerrar sesión</span>
					</button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
