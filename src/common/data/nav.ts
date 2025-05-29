import { Nav } from '../types/nav';

export function getMenuList(pathname: string): Nav[] {
	return [
		{
			name: 'Cursos',
			href: '/cursos',
			active: pathname === '/cursos',
		},
		{
			name: 'Comunidad',
			href: '/comunidad',
			active: pathname === '/comunidad',
		},

		{
			name: 'Contacto',
			href: '/contacto',
			active: pathname === '/contacto',
		},
		// {
		// 	name: 'Catálogo',
		// 	href: '/categoria/brasa-familiar',
		// 	active: pathname.includes('/categoria'),
		// icon: <AiFillProduct className="size-4" />
		// },
	];
}

export function getMenuListApp(pathname: string): Nav[] {
	return [
		{
			name: 'Cursos',
			href: '/cursos-disponibles',
			active: pathname === '/cursos-disponibles',
		},
		{
			name: 'Comunidad',
			href: '/comunidad',
			active: pathname === '/comunidad',
		},

		{
			name: 'Contacto',
			href: '/contacto',
			active: pathname === '/contacto',
		},
		// {
		// 	name: 'Catálogo',
		// 	href: '/categoria/brasa-familiar',
		// 	active: pathname.includes('/categoria'),
		// icon: <AiFillProduct className="size-4" />
		// },
	];
}
