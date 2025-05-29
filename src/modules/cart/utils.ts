import { CourseCart } from '@root/src/common/types/course';

export const calcularTotal = (cursos: { precio: number }[]) =>
	cursos.reduce((total, curso) => total + curso.precio, 0);

export function calculateSubtotal(cursos: CourseCart[]): number {
	return cursos.reduce((total, curso) => total + parseFloat(curso.price), 0);
}
