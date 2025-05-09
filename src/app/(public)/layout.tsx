import Footer from '@/common/components/layout/footer/Footer';
import { Header } from '@/common/components/layout/header/Header';
// import { auth } from '@root/auth';
// import { redirect } from 'next/navigation';

export default async function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// const session = await auth();
	// if (session?.user) {
	// 	redirect('/inicio');
	// }
	return (
		<main className="min-h-screen bg-[#080B1A]">
			<Header />
			{children}
			<Footer />
		</main>
	);
}
