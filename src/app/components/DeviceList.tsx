// 제조사 선택, 기기 종류 선택 -> 기기 목록 조회
// 기기 모델 | 기기 id로 목록 나열
// 제조사 - 기기 종류 옆에 기기 모델 추가/ 삭제 버튼
// 기기 모델 옆에 기기 추가/ 기기 모델 삭제 버튼
// 기기 id 선택 시, 단일 조회 모달 띄움

"use client";

import { useRef, useState, ChangeEvent } from "react";
import { deviceTypeList } from "../store/dataStore";

interface IDeviceListProps {
	manufacturerList: string[];
}

interface IDeviceListData {
	[deviceName: string]: string[];
}

export default function DeviceList({ manufacturerList }: IDeviceListProps) {
	const [selectedManufacturer, setSelectedManufacturer] = useState<string>("");
	const [selectedDeviceType, setSelectedDeviceType] = useState<string>("");
	const [deviceList, setDeviceList] = useState<IDeviceListData[]>([]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const data = {
			manufacturer: selectedManufacturer,
			deviceType: selectedDeviceType,
		};

		if (selectedManufacturer && selectedDeviceType) {
			console.log(data);
			// TODO:: 서버에 기기 목록 조회 요청 보내기
			setDeviceList([
				{
					"삼성 BESPOKE 스마트 세탁기": [
						"1234-5678-9012",
						"1234-5678-9012",
						"1234-5678-9012",
						"1234-5678-9012",
					],
				},
				{
					"삼성 완전 최신 세탁기": [
						"1234-5678-9012",
						"1234-5678-9012",
						"1234-5678-9012",
						"1234-5678-9012",
					],
				},
				{
					"삼성 새로 나온 세탁기": [
						"1234-5678-9012",
						"1234-5678-9012",
						"1234-5678-9012",
						"1234-5678-9012",
					],
				},
			]);
		} else {
			window.alert("제조사와 기기 종류를 선택하세요");
		}
	};
	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="w-2/3 px-10 py-5 rounded-lg flex justify-between"
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
				<div className="w-2/3">
					<div id="header" className="flex space-x-3 m-2">
						<p className="my-auto text-bold text-lg">
							{selectedManufacturer} - {selectedDeviceType}
						</p>
						<button className="btn-primary px-3 py-2">기기 모델 추가</button>
						<button className="btn-delete px-3 py-2">제조사 삭제</button>
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
						const [deviceModelName, IdList] = Object.entries(item)[0];
						return (
							<>
								<div key={index} className="flex px-10 justify-between text-lg">
									<div>
										<p>{deviceModelName}</p>
										<button className="btn-primary text-base px-2 py-1 mx-1">
											기기 추가
										</button>
										<button className="btn-delete text-base px-2 py-1 mx-1">
											모델 삭제
										</button>
									</div>
									<ul>
										{IdList.map((serial, idx) => (
											<li key={idx} className="flex my-1 justify-end">
												{serial}
												<button className="btn-delete text-base px-2 py-1 mx-1">
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
					{/* list */}
				</div>
			) : (
				<div></div>
			)}
		</>
	);
}
