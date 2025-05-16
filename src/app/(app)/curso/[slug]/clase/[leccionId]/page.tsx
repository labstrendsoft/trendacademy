import { auth } from '@root/auth';
import { DetailCourseView } from '@root/src/modules/aplication/detailCourse/DetailCourseView';

export default async function Page(props: Props) {
	const params = await props.params;

	const session = await auth();
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_BACKEND}/course/${params.slug}/lesson/${params.leccionId}/user/${session?.user.id}`,
		{
			next: { revalidate: 60 },
			headers: {
				Authorization: `Bearer ${session?.user.token}`, // asegúrate que el token esté ahí
			},
		}
	);

	const DetalleCurso = await res.json();
	console.log('holaaa:', DetalleCurso);
	return <DetailCourseView detalle={DetalleCurso} />;
}

type Props = {
	params: Promise<{
		slug: string; // Parámetro de courseId
		leccionId: string; // Parámetro de lessonId
	}>;
};
