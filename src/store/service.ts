import {create} from 'zustand';
import {Service} from '@/types';

type ServiceState = {
	
	openSheet: boolean;
	editingService?: Service | null;
	setOpenSheet: (open: boolean) => void;
	openForCreate: () => void;
	openForEdit: (person: Service) => void;
	closeSheet: () => void;
	isEditing: () => boolean;
};

export const useServiceStore = create<ServiceState>((set, get) => ({
	
	openSheet: false,
	editingService: null,
	setOpenSheet: (open) => set({openSheet: open}),
	openForCreate: () => set({openSheet: true, editingService: null}),
	openForEdit: (fleet) => set({openSheet: true, editingService: fleet}),
	closeSheet: () => set({openSheet: false, editingService: null}),
	isEditing: () => !!get().editingService,
}));
