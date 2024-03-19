"use client";

import DeviceModelCreateForm from "../components/DeviceModelCreateForm";
import DeviceDetailModal from "../components/DeviceDetailModal";
import ConfirmModal from "../components/ConfirmModal";
import WarningModal from "../components/WarningModal";

import useModalStore from "../store/modalState";

const Modal: React.FC = () => {
	const isDeviceModelCreateModalOpened = useModalStore(
		(state) => state.isDeviceModelCreateModalOpened
	);
	const isDeviceDetailModalOpened = useModalStore(
		(state) => state.isDeviceDetailModalOpened
	);
	const isConfirmModalOpened = useModalStore(
		(state) => state.isConfirmModalOpened
	);
	const isWarningModalOpened = useModalStore(
		(state) => state.isWarningModalOpened
	);

	return (
		<>
			{isDeviceDetailModalOpened && <DeviceDetailModal />}
			{isDeviceModelCreateModalOpened && <DeviceModelCreateForm />}
			{isConfirmModalOpened && <ConfirmModal />}
			{isWarningModalOpened && <WarningModal />}
		</>
	);
};

export default Modal;
