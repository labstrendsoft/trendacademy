import { CoursesPublicView } from '@/modules/courses-public/CoursesPublicView';

type PageProps = {
	params: Promise<{ slug: string }>; // params ahora es una promesa
};

export default async function Page({ params }: PageProps) {
	const { slug } = await params;

	return (
		<div>
			<div className="hidden">Blog Post: {slug}</div>
			<CoursesPublicView />
		</div>
	);
}
