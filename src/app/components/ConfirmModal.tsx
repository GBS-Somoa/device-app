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
				{name} {type} 가 생성되었습니다.
				{/* 확인 클릭 시, 모달창 꺼짐 */}
				<button className="btn-primary" onClick={handleClick}>
					확인
				</button>
			</div>
		</div>
	);
};

export default ConfirmModal;
