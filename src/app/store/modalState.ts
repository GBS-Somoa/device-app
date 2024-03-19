import { create } from "zustand";

interface ModalState {
	isConfirmModalOpened: boolean;
	isWarningModalOpened: boolean;
	isDeviceModelCreateModalOpened: boolean;
	isDeviceDetailModalOpened: boolean;
	confirmText: string;
	warningText: string;
	selectedManufacturer: string;
	selectedDeviceType: string;
	deviceId: string;
	deleteFunction: ((param: string) => void) | null;
	deleteTarget: string;
	setConfirmModalOpen: (confirmText: string) => void;
	setConfirmModalClose: () => void;
	setWarningModalOpen: (
		warningText: string,
		deleteFunction: (param: string) => void,
		deleteTarget: string
	) => void;
	setWarningModalClose: () => void;
	setDeviceModelCreateModalOpen: (
		selectedManufacturer: string,
		selectedDeviceType: string
	) => void;
	setDeviceModelCreateModalClose: () => void;
	setDeviceDetailModalOpen: (deviceId: string) => void;
	setDeviceDetailModalClose: () => void;
}

const useModalStore = create<ModalState>((set) => ({
	isConfirmModalOpened: false,
	isWarningModalOpened: false,
	isDeviceModelCreateModalOpened: false,
	isDeviceDetailModalOpened: false,
	confirmText: "",
	warningText: "",
	selectedManufacturer: "",
	selectedDeviceType: "",
	deviceId: "",
	deleteFunction: null,
	deleteTarget: "",

	// 확인창 열립니다 => 하나가 열리면, 다른 모달은 모두 닫힘으로 바뀜
	setConfirmModalOpen: (confirmText: string) =>
		set((state) => ({
			...state,
			isConfirmModalOpened: true,
			isWarningModalOpened: false,
			isDeviceModelCreateModalOpened: false,
			isDeviceDetailModalOpened: false,
			confirmText,
		})),

	// 확인창 닫힙니다
	setConfirmModalClose: () =>
		set((state) => ({
			...state,
			isConfirmModalOpened: false,
		})),

	// 경고창 열립니다
	setWarningModalOpen: (
		warningText: string,
		deleteFunction: ((param: string) => void) | null,
		deleteTarget: string
	) =>
		set((state) => ({
			...state,
			isConfirmModalOpened: false,
			isWarningModalOpened: true,
			isDeviceModelCreateModalOpened: false,
			isDeviceDetailModalOpened: false,
			warningText,
			deleteFunction,
			deleteTarget,
		})),

	// 경고창 닫힙니다
	setWarningModalClose: () =>
		set((state) => ({
			...state,
			isWarningModalOpened: false,
		})),

	// 기기모델생성 모달 열립니다
	setDeviceModelCreateModalOpen: (
		selectedManufacturer: string,
		selectedDeviceType: string
	) =>
		set((state) => ({
			...state,
			isConfirmModalOpened: false,
			isWarningModalOpened: false,
			isDeviceModelCreateModalOpened: true,
			isDeviceDetailModalOpened: false,
			selectedManufacturer,
			selectedDeviceType,
		})),

	// 기기모델생성 모달 닫힙니다
	setDeviceModelCreateModalClose: () =>
		set((state) => ({
			...state,
			isDeviceModelCreateModalOpened: false,
		})),

	// 기기단일조회 모달 열립니다
	setDeviceDetailModalOpen: (deviceId: string) =>
		set((state) => ({
			...state,
			isConfirmModalOpened: false,
			isWarningModalOpened: false,
			isDeviceModelCreateModalOpened: false,
			isDeviceDetailModalOpened: true,
			deviceId,
		})),

	// 기기단일조회 모달 닫힙니다
	setDeviceDetailModalClose: () =>
		set((state) => ({
			...state,
			isDeviceDetailModalOpened: false,
		})),
}));

export default useModalStore;
