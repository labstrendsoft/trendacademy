import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { CourseCart } from '../../../common/types/course';

type CartState = {
	cursos: CourseCart[];
	agregarCurso: (curso: CourseCart) => void;
	eliminarCurso: (id: string) => void;
	limpiarCarrito: () => void;
};

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			cursos: [],

			agregarCurso: (curso) => {
				const yaExiste = get().cursos.some((c) => c.id === curso.id);
				if (!yaExiste) {
					set((state) => ({
						cursos: [...state.cursos, curso],
					}));
				}
			},

			eliminarCurso: (id) => {
				set((state) => ({
					cursos: state.cursos.filter((curso) => curso.id !== id),
				}));
			},

			limpiarCarrito: () => {
				set({ cursos: [] });
			},
		}),
		{
			name: 'cart-cursos', // clave en localStorage
			storage: createJSONStorage(() => localStorage),
		}
	)
);
