import { create } from "zustand";

interface supplyType {
	type: string;
	dataProvided: string[];
}
interface SupplyStoreState {
	supplyTypeList: supplyType[];
	setSupplyTypeList: (data: supplyType[]) => void;
}

const useSupplyStore = create<SupplyStoreState>((set) => ({
	supplyTypeList: [],
	setSupplyTypeList: (data: supplyType[]) => {
		set((state) => ({
			...state,
			supplyTypeList: data,
		}));
	},
}));

export default useSupplyStore;
