"use client";

import { useRef } from "react";
import useModalStore from "../store/modalState";

interface supply {
	type: string;
	name: string;
	content: string[];
}

const DeviceDetailModal: React.FC = () => {
	const supplyData = useRef<HTMLInputElement>(null);
	// TODO: deviceId로 서버에 단일 조회 요청
	const deviceId = useModalStore((state) => state.deviceId);
	// ---------임시데이터---------
	const manufacturer: string = "Samsung";
	const modelName: string = "BESPOKE AI 콤보 세탁기";
	const supplyList: supply[] = [
		{
			type: "washerDetergent",
			name: "세탁세제",
			content: ["supplyAmount"],
		},
		{
			type: "fabricSoftener",
			name: "섬유유연제",
			content: ["supplyAmount", "supplyChangedDate", "supplyLevel"],
		},
		{
			type: "replaceableFilter",
			name: "교체용 필터",
			content: ["supplyStatus", "supplyChangedDate"],
		},
		{
			type: "supplyTank",
			name: "급수통",
			content: ["supplyLevel", "supplyChangedDate"],
		},
		{
			type: "dustBin",
			name: "먼지봉투",
			content: ["supplyStatus"],
		},
	];

	const supplyListWithValues = supplyList.map((item) => ({
		...item,
		values: new Array(item.content.length).fill(undefined),
	}));

	const setDeviceDetailModalClose = useModalStore(
		(state) => state.setDeviceDetailModalClose
	);

	const supplyValueInputField = (contentItem: string, supplyType: string) => {
		switch (contentItem) {
			case "supplyAmount":
				return (
					<>
						<input type="text" className="form-item px-2 py-1 w-1/2" />
						<p>ml</p>
					</>
				);
			case "supplyLevel":
				return (
					<>
						<input type="text" className="form-item px-2 py-1 w-1/2" /> %
					</>
				);
			case "supplyChangedDate":
				return (
					<>
						<input
							type="text"
							placeholder="YYYY.MM.DD"
							className="form-item px-2 py-1 w-32"
						/>
					</>
				);
			case "supplyStatus":
				return (
					<>
						{["replaceableFilter", "cleanableFilter"].includes(supplyType) && (
							<select id="status" className="form-item px-2 py-1 w-full">
								<option value="good">좋음</option>
								<option value="normal">보통</option>
								<option value="bad">나쁨</option>
								<option value="null">상태없음</option>
							</select>
						)}
						{supplyType === "dustBin" && (
							<select id="status" className="form-item px-2 py-1 w-full">
								{[...Array(10)].map((_, index) => (
									<option key={index} value={index + 1}>
										{index + 1}
									</option>
								))}
							</select>
						)}
					</>
				);
			default:
				return null;
		}
	};

	const handleClick = () => {
		// TODO: 소모품 데이터를 담고 구조화하여 서비스앱 서버로 보내줘야함
		const suppliesElement = supplyData.current;

		if (suppliesElement) {
			// supplies 요소의 자식 요소들을 순회
			const supplyItems = suppliesElement.querySelectorAll("#supply-name");
			console.log(supplyItems);
		}

		console.log("동작");
		// setDeviceDetailModalClose();
	};
	return (
		<div
			id="outer-layer"
			onClick={(e) => {
				if (e.target.id && e.target.id == "outer-layer") {
					setDeviceDetailModalClose();
				}
			}}
		>
			<div
				id="inner-layer"
				className="relative bg-primary max-w-[650px] w-1/2 min-h-[300px] mx-auto p-10 rounded-lg"
			>
				<div
					className="btn-primary absolute top-3 right-3 px-6 py-4"
					onClick={handleClick}
				>
					동작
				</div>
				<div id="device-info">
					<p>제조사 : {manufacturer}</p>
					<p>기기 모델명: {modelName}</p>
					<p>Device ID : {deviceId}</p>
				</div>
				<div
					id="supplies"
					className="my-5 min-h-[100px] bg-white rounded-lg p-3"
					ref={supplyData}
				>
					{supplyList.map((item, index) => (
						<>
							<div
								key={index}
								className="flex justify-between my-2"
								id="supply"
							>
								<p className="w-1/6" id="supply-name">
									{item.name}
								</p>
								{/* TODO:: 소모품 종류에 따라 데이터 입력칸 다르게 생성 => store/dataStore/supplyTypeDetailList 참고 */}
								<div className="w-2/3">
									{item.content.map((contentItem, contentIndex) => (
										<div
											className="flex space-x-3 my-2 items-center"
											key={contentIndex}
											id="supply-item"
										>
											<p>{contentItem}</p>
											{supplyValueInputField(contentItem, item.type)}
										</div>
									))}
								</div>
							</div>
							<hr />
						</>
					))}
				</div>
			</div>
		</div>
	);
};

export default DeviceDetailModal;
