import { auth } from '@root/auth';
import FooterApp from '@root/src/common/components/layout/footerApp/Footer';
import { HeaderApp } from '@root/src/common/components/layout/headerApp/Header';
import { redirect } from 'next/navigation';

export default async function AppLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	if (!session?.user) {
		redirect('/'); // O la ruta pública que uses
	}
	return (
		<main className="min-h-screen bg-[#080B1A]">
			<HeaderApp />
			{children}
			<FooterApp />
		</main>
	);
}
