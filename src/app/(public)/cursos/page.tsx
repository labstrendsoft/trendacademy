import { CursosView } from '@root/src/modules/public/cursos/CursosView';

export default async function Cursos() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/course`, {
		next: { revalidate: 60 }, // Revalida cada 60s
	});
	const cursos = await res.json();
	return <CursosView cursos={cursos} />;
}
