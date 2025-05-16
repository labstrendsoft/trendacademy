import { auth } from '@root/auth';
import { HomePublicView } from '@root/src/modules/public/home/HomePublicView';
import { redirect } from 'next/navigation';
export default async function Home() {
	const session = await auth();
	if (session?.user) {
		redirect('/inicio');
	}
	return <HomePublicView />;
}
