// type Submenu = {
// 	href: string;
// 	label: string;
// 	active: boolean;
// };

import { ReactElement } from 'react';

export type Nav = {
	name: string;
	href: string;
	icon?: ReactElement;
	active: boolean;
};
