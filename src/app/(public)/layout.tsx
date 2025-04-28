import Footer from '@/common/components/layout/footer/Footer';
import { Header } from '@/common/components/layout/header/Header';

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="min-h-screen bg-[#080B1A]">
			<Header />
			{children}
			<Footer />
		</main>
	);
}
