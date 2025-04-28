import { Nav } from '../types/nav';

export function getMenuList(pathname: string): Nav[] {
	return [
		{
			name: 'Nosotros',
			href: '/Nosotros',
			active: pathname === '/Nosotros',
		},
		{
			name: 'Cursos',
			href: '/cursos',
			active: pathname === '/cursos',
		},

		{
			name: 'Aliados',
			href: '/aliados',
			active: pathname === '/aliados',
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
