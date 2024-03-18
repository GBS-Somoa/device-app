import useModalStore from "../store/modalState";

const WarningModal: React.FC = () => {
	const warningText = useModalStore((state) => state.warningText);
	const deleteFunction = useModalStore((state) => state.deleteFunction);
	const deleteTarget = useModalStore((state) => state.deleteTarget);
	const setWarningModalClose = useModalStore(
		(state) => state.setWarningModalClose
	);

	const handleDelete = () => {
		//하려던 함수 이어서 하도록 작성(삭제 행위)
		deleteFunction && deleteFunction(deleteTarget);
	};
	return (
		<div
			id="outer-layer"
			onClick={() => {
				setWarningModalClose();
			}}
		>
			<div
				id="inner-layer"
				className="relative w-[350px] h-[170px] bg-primary rounded-lg text-center py-5 px-10"
			>
				{/* 어떤 상황에서 눌렀느냐에 따라 메세지가 달라져야함  */}
				<p className="text-lg text-red-500 font-bold break-keep">
					{warningText}
				</p>
				{/* 확인 클릭 시, 삭제 완료되고 모달창 꺼짐 */}
				<div className="absolute flex space-x-3 inset-x-28 bottom-2">
					<button
						className="btn-primary px-3 py-2"
						onClick={setWarningModalClose}
					>
						취소
					</button>
					<button className="btn-delete px-3 py-2" onClick={handleDelete}>
						삭제
					</button>
				</div>
			</div>
		</div>
	);
};

export default WarningModal;
