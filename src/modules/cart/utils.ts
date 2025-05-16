export const calcularTotal = (cursos: { precio: number }[]) =>
	cursos.reduce((total, curso) => total + curso.precio, 0);
