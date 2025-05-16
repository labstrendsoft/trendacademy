// /modules/carrito/store/ui.ts
import { create } from 'zustand';

type UIState = {
	isCartOpen: boolean;
	abrirCarrito: () => void;
	cerrarCarrito: () => void;
	toggleCarrito: () => void;
};

export const useCartUIStore = create<UIState>((set) => ({
	isCartOpen: false,
	abrirCarrito: () => set({ isCartOpen: true }),
	cerrarCarrito: () => set({ isCartOpen: false }),
	toggleCarrito: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
}));
