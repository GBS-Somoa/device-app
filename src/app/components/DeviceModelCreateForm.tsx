"use client";

import { useRef, useState, ChangeEvent } from "react";
import SupplyAddForm from "./SupplyAddForm";
import useModalStore from "../store/modalState";

interface Supply {
	id: number;
	type: string;
	name: string;
}

const DeviceModelCreateForm: React.FC = () => {
	const setDeviceModelCreateModalClose = useModalStore(
		(state) => state.setDeviceModelCreateModalClose
	);
	const setConfirmModalOpen = useModalStore(
		(state) => state.setConfirmModalOpen
	);
	const manufacturer = useModalStore((state) => state.selectedManufacturer);
	const deviceType = useModalStore((state) => state.selectedDeviceType);
	const modelName = useRef<HTMLInputElement>(null);
	const [supplyList, setSupplyList] = useState<Supply[]>([
		{ id: 0, type: "", name: "" },
	]);

	const handleAddSupply = () => {
		setSupplyList((prev) => {
			const lastId: number = prev[prev.length - 1].id;
			console.log([...prev, { id: lastId + 1, type: "", name: "" }]);
			return [...prev, { id: lastId + 1, type: "", name: "" }];
		});
	};

	const deleteSupply = () => {
		setSupplyList((prev) => {
			console.log(prev.slice(0, -1));
			return prev.slice(0, -1);
		});
	};

	const changeType = (id: number, changedType: string) => {
		setSupplyList((prev) => {
			return prev.map((item) => {
				if (item.id === id) {
					return { ...item, type: changedType };
				}
				return item;
			});
		});
	};

	const changeName = (id: number, changedName: string) => {
		setSupplyList((prev) => {
			return prev.map((item) => {
				if (item.id === id) {
					return { ...item, name: changedName };
				}
				return item;
			});
		});
	};

	const createDeviceModel = () => {
		// TODO
		// 기기 모델명 있는지 확인, 소모품 1개 이상 필수
		// supplyList 중에서 type, name이 다 있는 배열만 추려서
		// 기기 모델 생성 api 요청 보내기

		const filteredSupplyList = supplyList.filter(
			(item) => item.type != "" && item.name != ""
		);
		if (modelName.current && filteredSupplyList.length > 0) {
			console.log({
				manufacturer: manufacturer,
				deviceType: deviceType,
				modelName: modelName.current.value,
				supplyList: supplyList,
			});

			setConfirmModalOpen(`${modelName.current.value} 모델이 생성되었습니다`);
		}
	};

	return (
		<div
			id="outer-layer"
			onClick={(e) => {
				console.log(e.target);
				if (e.target.id && e.target.id == "outer-layer") {
					setDeviceModelCreateModalClose();
				}
			}}
		>
			<div
				id="inner-layer"
				className="relative bg-primary max-w-[650px] w-1/2 min-h-[400px] mx-auto p-10 rounded-lg"
			>
				<div
					className="btn-primary absolute top-3 right-3 px-6 py-4"
					onClick={createDeviceModel}
				>
					생성
				</div>
				<div id="device-info" className="w-3/4 flex flex-col space-y-3">
					<div className="flex space-x-5 items-center">
						<p className="w-32">제조사</p>
						<p className="form-item px-2 py-1 w-full">{manufacturer}</p>
					</div>
					<div className="flex space-x-5 items-center">
						<p className="w-32">기기 종류</p>
						<p className="form-item px-2 py-1 w-full">{deviceType}</p>
					</div>
					<div className="flex space-x-5 items-center">
						<p className="w-32">기기 모델명</p>
						<input
							type="text"
							placeholder="모델명을 입력하세요"
							className="form-item px-2 py-1 w-full"
							ref={modelName}
						/>
					</div>
				</div>
				<div
					id="supply-list"
					className="flex flex-col space-y-2 my-7 text-center"
				>
					{/* 소모품 추가 폼 */}
					{supplyList.map((item, index) => (
						<SupplyAddForm
							key={index}
							supplyId={item.id}
							showDelete={
								item.id > 0 && item.id == supplyList.length - 1 ? true : false
							}
							changeType={changeType}
							changeName={changeName}
							deleteSupply={deleteSupply}
						/>
					))}
					{/* 소모품 추가 버튼 */}
					<button
						className="mx-auto btn-primary text-sm px-2 py-1 w-24"
						onClick={handleAddSupply}
					>
						소모품 추가
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeviceModelCreateForm;
