import { create } from "zustand";

interface SupplyStoreState {
	supplyTypeList: any[];
}

const useSupplyStore = create<SupplyStoreState>(
	(set: (fn: (state: SupplyStoreState) => SupplyStoreState) => void) => ({
		supplyTypeList: [],
		setSupplyTypeList: (data: any[]) => {
			set((state: SupplyStoreState) => ({
				...state,
				supplyTypeList: data,
			}));
		},
	})
);

export default useSupplyStore;
