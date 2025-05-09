import { auth } from '@root/auth';

import { redirect } from 'next/navigation';

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	if (session?.user) {
		redirect('/inicio');
	}
	return <>{children}</>;
}
