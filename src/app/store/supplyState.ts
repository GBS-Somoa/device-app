import { create } from "zustand";

interface SupplyStoreState {
	supplyTypeList: any[];
	setSupplyTypeList: (data: any[]) => void;
}

const useSupplyStore = create<SupplyStoreState>((set) => ({
	supplyTypeList: [],
	setSupplyTypeList: (data: any[]) => {
		set((state) => ({
			...state,
			supplyTypeList: data,
		}));
	},
}));

export default useSupplyStore;
