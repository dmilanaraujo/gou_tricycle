import {create} from 'zustand';
import {Product} from '@/types';

type ProductState = {
	
	openSheet: boolean;
	editingProduct?: Product | null;
	setOpenSheet: (open: boolean) => void;
	openForCreate: () => void;
	openForEdit: (person: Product) => void;
	closeSheet: () => void;
	isEditing: () => boolean;
};

export const useProductStore = create<ProductState>((set, get) => ({
	
	openSheet: false,
	editingProduct: null,
	setOpenSheet: (open) => set({openSheet: open}),
	openForCreate: () => set({openSheet: true, editingProduct: null}),
	openForEdit: (fleet) => set({openSheet: true, editingProduct: fleet}),
	closeSheet: () => set({openSheet: false, editingProduct: null}),
	isEditing: () => !!get().editingProduct,
}));
