import { usePathname } from 'next/navigation';
import { getMenuListApp } from '@/common/data/nav';
import { ActiveLinks } from './ActiveLinks';

export const NavLinks = () => {
	const pathname = usePathname();
	const menuList = getMenuListApp(pathname);
	return (
		<div className="flex gap-8 font-montserrat-fuente">
			{menuList.map((link) => {
				return <ActiveLinks key={link.name} {...link} />;
			})}
		</div>
	);
};
