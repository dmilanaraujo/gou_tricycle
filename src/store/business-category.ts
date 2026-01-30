import {create} from 'zustand';

type BusinessCategoryState = {
	opened: boolean;
	setOpenDialog: (open: boolean) => void;
	openDialog: () => void;
	closeDialog: () => void;
};

export const useBusinessCategoryStore = create<BusinessCategoryState>((set) => ({
	opened: false,
	setOpenDialog: (open) => set({opened: open}),
	openDialog: () => set({opened: true}),
	closeDialog: () => set({opened: false}),
}));
