interface OwnProps {
	name: string;
	type: string;
}

const ConfirmModal: React.FC<OwnProps> = ({ name, type }) => {
	return (
		<div id="outer-layer">
			<div
				id="inner-layer"
				className="w-[100px] h-[50px] bg-primary rounded-lg"
			>
				{/* 어떤 상황에서 눌렀느냐에 따라 메세지가 달라져야함  */}
				{/* 확인 클릭 시, 삭제 완료되고 모달창 꺼짐 */}
				<button className="btn-primary" onClick={handleClick}>
					확인
				</button>
			</div>
		</div>
	);
};

export default ConfirmModal;
