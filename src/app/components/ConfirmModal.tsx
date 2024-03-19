import useModalStore from "../store/modalState";

const ConfirmModal: React.FC = () => {
	const confirmText = useModalStore((state) => state.confirmText);
	const confirmFunction = useModalStore((state) => state.confirmFunction);
	const setConfirmModalClose = useModalStore(
		(state) => state.setConfirmModalClose
	);

	return (
		<div
			id="outer-layer"
			onClick={() => {
				setConfirmModalClose();
				confirmFunction && confirmFunction();
			}}
		>
			<div
				id="inner-layer"
				className="relative w-[350px] h-[170px] bg-primary rounded-lg text-center py-5 px-10"
			>
				<p className="text-lg break-keep">{confirmText}</p>
				{/* 확인 클릭 시, 모달창 꺼짐 */}
				<button
					className="absolute btn-primary px-3 py-2 inset-x-36 bottom-2"
					onClick={() => {
						setConfirmModalClose();
						confirmFunction && confirmFunction();
					}}
				>
					확인
				</button>
			</div>
		</div>
	);
};

export default ConfirmModal;
