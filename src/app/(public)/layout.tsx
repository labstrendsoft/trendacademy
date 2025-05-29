import Footer from '@/common/components/layout/footer/Footer';
import { Header } from '@/common/components/layout/header/Header';
import { auth } from '@root/auth';
import FooterApp from '@root/src/common/components/layout/footerApp/Footer';
import { HeaderApp } from '@root/src/common/components/layout/headerApp/Header';

export default async function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	const isAuthenticated = !!session?.user;

	return (
		<main className="min-h-screen bg-[#080B1A]">
			{isAuthenticated && <HeaderApp />}
			{!isAuthenticated && <Header />}

			{children}
			{isAuthenticated && <FooterApp />}
			{!isAuthenticated && <Footer />}
		</main>
	);
}
