import Alfaparf from '@public/home/logos/alfaparf.png';
import Bemvoleo from '@public/home/logos/BENVOLEO.png';
import Italian from '@public/home/logos/ITALIAN-MAX.png';
import Wella from '@public/home/logos/WELLA.png';
import Yellow from '@public/home/logos/YELLOW.png';
import Trend from '@public/home/logos/trend.png';

import { StaticImageData } from 'next/image';

export interface LogosClientes {
	imageUrl: StaticImageData;
	alt: string;
}

export function LogosClientesData(): LogosClientes[] {
	return [
		{
			imageUrl: Alfaparf,
			alt: 'Logo de Alfaparf, marca internacional de productos para el cuidado capilar',
		},
		{
			imageUrl: Bemvoleo,
			alt: 'Logo de Bemvoleo, empresa de soluciones tecnológicas',
		},
		{
			imageUrl: Italian,
			alt: 'Logo de Italian Max, marca de productos de belleza y cuidado personal',
		},
		{
			imageUrl: Wella,
			alt: 'Logo de Wella, marca reconocida en el cuidado del cabello y productos cosméticos',
		},
		{
			imageUrl: Yellow,
			alt: 'Logo de Yellow, empresa dedicada a la innovación en productos de belleza',
		},
		{
			imageUrl: Trend,
			alt: 'Logo de Trend, marca de tendencias en productos de moda y belleza',
		},
		{
			imageUrl: Trend,
			alt: 'Logo de Trend, marca de tendencias en productos de moda y belleza',
		},
		{
			imageUrl: Italian,
			alt: 'Logo de Italian Max, marca de productos de belleza y cuidado personal',
		},
		{
			imageUrl: Wella,
			alt: 'Logo de Wella, marca reconocida en el cuidado del cabello y productos cosméticos',
		},
		{
			imageUrl: Yellow,
			alt: 'Logo de Yellow, empresa dedicada a la innovación en productos de belleza',
		},
	];
}
