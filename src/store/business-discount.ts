import {create} from 'zustand';

type BusinessDiscountState = {
	opened: boolean;
	setOpenDialog: (open: boolean) => void;
	openDialog: () => void;
	closeDialog: () => void;
};

export const useBusinessDiscountStore = create<BusinessDiscountState>((set) => ({
	opened: false,
	setOpenDialog: (open) => set({opened: open}),
	openDialog: () => set({opened: true}),
	closeDialog: () => set({opened: false}),
}));
