import Link from 'next/link';
import { cn } from '@/lib/utils'; // o desde donde esté tu helper
import { Nav } from '@/common/types/nav';

export const ActiveLinks = ({ name, href, icon, active }: Nav) => {
	return (
		<Link
			key={name}
			href={href}
			className={cn(' text-sm  text-white w-full', active && 'font-bold ')}
		>
			{icon}
			<p className="hidden md:block">{name}</p>
		</Link>
	);
};
