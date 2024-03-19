// 제조사 선택, 기기 종류 선택 -> 기기 목록 조회
// 기기 모델 | 기기 id로 목록 나열
// 제조사 - 기기 종류 옆에 기기 모델 추가/ 삭제 버튼
// 기기 모델 옆에 기기 추가/ 기기 모델 삭제 버튼
// 기기 id 선택 시, 단일 조회 모달 띄움

"use client";

import { useRef, useState, ChangeEvent } from "react";
import useModalStore from "../store/modalState";

interface OwnProps {
	manufacturerList: string[];
	deviceTypeList: string[];
}
interface DeviceListData {
	deviceModel: string;
	deviceModelId: string;
	deviceId: string[];
}

const DeviceList: React.FC<OwnProps> = ({
	manufacturerList,
	deviceTypeList,
}) => {
	const [selectedManufacturer, setSelectedManufacturer] = useState<string>("");
	const [selectedDeviceType, setSelectedDeviceType] = useState<string>("");
	const [deviceList, setDeviceList] = useState<DeviceListData[]>([]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const data = {
			manufacturer: selectedManufacturer,
			deviceType: selectedDeviceType,
		};

		if (selectedManufacturer && selectedDeviceType) {
			console.log(data);
			// TODO:: 서버에 기기 목록 조회 요청 보내기

			// Send a fetch request to your server
			// try {
			// 	const response = await fetch(
			// 		`/api/device?manufacturer=${selectedManufacturer}&device_type=${selectedDeviceType}`
			// 	);

			// 	if (!response.ok) {
			// 		throw new Error("Network response was not ok");
			// 	}
			// 	const responseData = await response.json();
			// 	setDeviceList(responseData.data);
			// } catch (error) {
			// 	console.error("Error fetching data:", error);
			// }

			setDeviceList([
				{
					deviceModel: "삼성 BESPOKE 스마트 세탁기",
					deviceModelId: "asdf1",
					deviceId: [
						"1234-5678-9012",
						"1234-5678-9013",
						"1234-5678-9014",
						"1234-5678-9015",
					],
				},
				{
					deviceModel: "삼성 완전 최신 세탁기",
					deviceModelId: "asdf2",
					deviceId: [
						"1234-5678-9017",
						"1234-5678-9018",
						"1234-5678-9019",
						"1234-5678-9021",
					],
				},
				{
					deviceModel: "삼성 새로 나온 세탁기",
					deviceModelId: "asdf3",
					deviceId: [
						"1234-5678-9022",
						"1234-5678-9023",
						"1234-5678-9024",
						"1234-5678-9025",
					],
				},
			]);
		} else {
			window.alert("제조사와 기기 종류를 선택하세요");
		}
	};

	// ------------- 모달 여는 함수 ----------------
	const setDeviceModelCreateModalOpen = useModalStore(
		(state) => state.setDeviceModelCreateModalOpen
	);
	const setDeviceDetailModalOpen = useModalStore(
		(state) => state.setDeviceDetailModalOpen
	);
	const setWarningModalOpen = useModalStore(
		(state) => state.setWarningModalOpen
	);

	// 기기 모델 생성 모달 띄움
	const createDeviceModel = () => {
		// selectedManufacture, selectedDeviceType 담아서 기기생성모달 open
		setDeviceModelCreateModalOpen(selectedManufacturer, selectedDeviceType);
	};

	// 기기 생성
	const createDeviceInstance = async (selectedDeviceModelId: string) => {
		// TODO: deviceId 새로 만들어서 서버에 생성 요청, deviceList에 추가해서 화면에 렌더링

		// Send a fetch request to your server
		await fetch("/api/device", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ deviceModelId: selectedDeviceModelId }),
		})
			.then((response) => {
				const newDeviceId = response.data.deviceId;
				setDeviceList((prev) =>
					prev.map((device) => {
						if (device.deviceModelId === selectedDeviceModelId) {
							return {
								...device,
								deviceId: [...device.deviceId, newDeviceId],
							};
						} else {
							return { ...device };
						}
					})
				);
				// Handle the response
			})
			.catch((error) => {
				// Handle errors
				console.log(error);
			});
	};

	// 기기 상세 조회 모달 띄움
	const handleClickDeviceId = (serial: string) => {
		setDeviceDetailModalOpen(serial);
	};

	// ------------- 삭제 요청 함수 ----------------
	const deleteManufacturerRequest = (param: string) => {
		// TODO: 서버에 삭제요청
		console.log("제조사", param, "삭제 요청");
		window.location.reload();
	};

	const deleteDeviceModelRequest = (param: string) => {
		// TODO: 서버에 삭제요청
		console.log("기기 모델", param, "삭제 요청");
		setDeviceList((prev) =>
			prev.filter((item, index) => item.deviceModel !== param)
		);
	};

	const deleteDeviceRequest = (param: string) => {
		// TODO: 서버에 삭제요청
		console.log("기기", param, "삭제 요청");
		setDeviceList((prev) =>
			prev.map((device) => ({
				...device,
				deviceId: device.deviceId.filter((id) => id !== param),
			}))
		);
	};

	// ------------- 삭제 버튼 클릭시 경고창 띄우는 함수 -----------
	const deleteManufacturer = (selectedManufacturer: string) => {
		setWarningModalOpen(
			`"${selectedManufacturer}"에 생성된 모든 기기와 모델이 함께 삭제됩니다`,
			deleteManufacturerRequest,
			selectedManufacturer
		);
	};

	const deleteDeviceModel = (deviceModelName: string) => {
		setWarningModalOpen(
			`"${deviceModelName}"의 모든 기기가 함께 삭제됩니다`,
			deleteDeviceModelRequest,
			deviceModelName
		);
	};

	const deleteDeviceInstance = (deviceId: string) => {
		setWarningModalOpen(
			`${deviceId} 기기가 삭제됩니다`,
			deleteDeviceRequest,
			deviceId
		);
	};

	return (
		<div id="device-list" className="w-full">
			<form
				onSubmit={handleSubmit}
				className="w-2/3 mx-auto px-10 py-5 rounded-lg flex justify-between"
			>
				{/* 제조사 선택하는 드롭다운 */}
				<select
					name="manufacturerName"
					id="manufacturerName"
					className="form-item w-1/4 px-2"
					value={selectedManufacturer}
					onChange={(event: ChangeEvent<HTMLSelectElement>) => {
						setSelectedManufacturer(event.target.value);
					}}
				>
					<option disabled value="">
						제조사 선택
					</option>
					{manufacturerList.map((item, index) => (
						<option key={index} value={item}>
							{item}
						</option>
					))}
				</select>
				{/* 기기 종류 선택하는 드롭다운 */}
				<select
					name="deviceType"
					id="deviceType"
					className="form-item w-1/4 px-2"
					value={selectedDeviceType}
					onChange={(event: ChangeEvent<HTMLSelectElement>) => {
						setSelectedDeviceType(event.target.value);
					}}
				>
					<option disabled value="">
						기기 종류 선택
					</option>
					{deviceTypeList &&
						deviceTypeList.map((item: string, index: number) => (
							<option key={index} value={item}>
								{item}
							</option>
						))}
				</select>
				<button type="submit" className="btn-primary w-1/4 py-2">
					검색
				</button>
			</form>

			{/* 조회된 기기 목록 */}
			{deviceList.length > 0 ? (
				<div className="w-2/3 mx-auto">
					<div id="header" className="flex space-x-3 m-2">
						<p className="my-auto text-bold text-lg">
							{selectedManufacturer} - {selectedDeviceType}
						</p>
						<button
							className="btn-primary px-3 py-2"
							onClick={createDeviceModel}
						>
							기기 모델 추가
						</button>
						<button
							className="btn-delete px-3 py-2"
							onClick={() => deleteManufacturer(selectedManufacturer)}
						>
							제조사 삭제
						</button>
					</div>
					<div
						id="device-list-header"
						className="flex justify-between text-lg font-bold px-10"
					>
						<p className="w-48">기기 모델명</p>
						<p className="w-48">Device Id</p>
					</div>
					<hr />
					{deviceList.map((item, index) => {
						return (
							<>
								<div key={index} className="flex px-10 justify-between text-lg">
									<div>
										<p>{item.deviceModel}</p>
										<button
											className="btn-primary text-base px-2 py-1 mx-1"
											onClick={() => createDeviceInstance(item.deviceModelId)}
										>
											기기 추가
										</button>
										<button
											className="btn-delete text-base px-2 py-1 mx-1"
											onClick={() => deleteDeviceModel(item.deviceModel)}
										>
											모델 삭제
										</button>
									</div>
									<ul>
										{item.deviceId.map((serial, idx) => (
											<li key={idx} className="flex my-1 justify-end">
												<p
													className="hover:font-bold cursor-pointer"
													onClick={() => handleClickDeviceId(serial)}
												>
													{serial}
												</p>
												<button
													className="btn-delete text-base px-2 py-1 mx-1"
													onClick={() => deleteDeviceInstance(serial)}
												>
													삭제
												</button>
											</li>
										))}
									</ul>
								</div>
								<hr />
							</>
						);
					})}
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
};

export default DeviceList;
