"use client";

import { useRef } from "react";
import useModalStore from "../store/modalState";

interface supply {
	type: string;
	name: string;
	content: string[];
}

const DeviceDetailModal: React.FC = () => {
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

	const handleClick = () => {
		// TODO: 소모품 데이터를 담고 구조화하여 서비스앱 서버로 보내줘야함
		console.log("동작");
		setDeviceDetailModalClose();
	};
	return (
		<div
			id="outer-layer"
			onClick={(e) => {
				console.log(e.target);
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
				>
					{supplyList.map((item, index) => (
						<>
							<div key={index} className="flex justify-between my-2">
								<p className="w-1/6">{item.name}</p>
								{/* TODO:: 소모품 종류에 따라 데이터 입력칸 다르게 생성 => store/dataStore/supplyTypeDetailList 참고 */}
								<div className="w-2/3">
									{item.content.map((contentItem, contentIndex) => (
										<div
											className="flex space-x-3 my-2 items-center"
											key={contentIndex}
										>
											<p>{contentItem}</p>
											{contentItem === "supplyAmount" && (
												<>
													<input
														type="text"
														className="form-item px-2 py-1 w-1/2"
													/>
													<p>ml</p>
												</>
											)}
											{contentItem === "supplyLevel" && (
												<div>
													<input
														type="text"
														className="form-item px-2 py-1 w-1/2"
													/>{" "}
													%
												</div>
											)}
											{contentItem === "supplyChangedDate" && (
												<div>
													<input
														type="text"
														placeholder="YYYY.MM.DD"
														className="form-item px-2 py-1 w-32"
													/>{" "}
												</div>
											)}
											{contentItem === "supplyStatus" &&
												["replaceableFilter", "cleanableFilter"].includes(
													item.type
												) && (
													<div>
														<select
															id="status"
															className="form-item px-2 py-1 w-full"
														>
															<option value="good">좋음</option>
															<option value="normal">보통</option>
															<option value="bad">나쁨</option>
															<option value="null">상태없음</option>
														</select>
													</div>
												)}
											{contentItem === "supplyStatus" &&
												item.type === "dustBin" && (
													<div>
														<select
															id="status"
															className="form-item px-2 py-1 w-full"
														>
															<option value="1">1</option>
															<option value="2">2</option>
															<option value="3">3</option>
															<option value="4">4</option>
															<option value="5">5</option>
															<option value="6">6</option>
															<option value="7">7</option>
															<option value="8">8</option>
															<option value="9">9</option>
															<option value="10">10</option>
														</select>
													</div>
												)}
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
