// store/pedidoStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Store = {
	currentStep: number;
	setStep: (step: number) => void;
};

export const usePasosCheckoutStore = create(
	persist<Store>(
		(set) => ({
			currentStep: 1,
			setStep: (step) => set({ currentStep: step }),
		}),
		{
			name: 'pasos', // nombre en localStorage
			// skipHydration: true,
			storage: createJSONStorage(() => localStorage),
		}
	)
);
