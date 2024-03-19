"use client";

import { useRef, useState, ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import SupplyAddForm from "./SupplyAddForm";
import useModalStore from "../store/modalState";
import useSupplyStore from "../store/supplyState";

interface Supply {
	id: number;
	supplyType: string;
	supplyName: string;
}

const DeviceModelCreateForm: React.FC = () => {
	const { data: session } = useSession();
	const setDeviceModelCreateModalClose = useModalStore(
		(state) => state.setDeviceModelCreateModalClose
	);
	const setConfirmModalOpen = useModalStore(
		(state) => state.setConfirmModalOpen
	);
	const manufacturer = useModalStore((state) => state.selectedManufacturer);
	const deviceType = useModalStore((state) => state.selectedDeviceType);
	const modelName = useRef<HTMLInputElement>(null);
	const supplyTypeList = useSupplyStore((state) => state.supplyTypeList);
	const [supplyList, setSupplyList] = useState<Supply[]>([
		{ id: 0, supplyType: "", supplyName: "" },
	]);

	// 소모품 추가
	const handleAddSupply = () => {
		setSupplyList((prev) => {
			const lastId: number = prev[prev.length - 1].id;
			console.log([
				...prev,
				{ id: lastId + 1, supplyType: "", supplyName: "" },
			]);
			return [...prev, { id: lastId + 1, supplyType: "", supplyName: "" }];
		});
	};

	// 소모품 삭제
	const deleteSupply = () => {
		setSupplyList((prev) => {
			console.log(prev.slice(0, -1));
			return prev.slice(0, -1);
		});
	};

	// 소모품 종류가 변경되면, supplyList 값 변경
	const changeType = (id: number, changedType: string) => {
		setSupplyList((prev) => {
			return prev.map((item) => {
				if (item.id === id) {
					return { ...item, supplyType: changedType };
				}
				return item;
			});
		});
	};

	// 소모품 이름이 변경되면, supplyList 값 변경
	const changeName = (id: number, changedName: string) => {
		setSupplyList((prev) => {
			return prev.map((item) => {
				if (item.id === id) {
					return { ...item, supplyName: changedName };
				}
				return item;
			});
		});
	};

	// 기기 모델 생성 요청
	const createDeviceModel = async () => {
		// TODO
		// 기기 모델명 있는지 확인, 소모품 1개 이상 필수
		// supplyList 중에서 type, name이 다 있는 배열만 추려서
		// 기기 모델 생성 api 요청 보내기

		const filteredSupplyList = supplyList.filter(
			(item) => item.supplyType != "" && item.supplyName != ""
		);
		if (modelName.current?.value != "" && filteredSupplyList.length > 0) {
			const bodyData = {
				deviceModel: modelName.current?.value,
				deviceManufacturer: manufacturer,
				deviceType,
				supplies: [],
			};
			bodyData.supplies = filteredSupplyList.map((item) => {
				return {
					supplyType: item.supplyType,
					supplyName: item.supplyName,
					dataProvided: supplyTypeList.find(
						(supply) => supply.type === item.supplyType
					)?.dataProvided,
				};
			});
			// TODO: 서버에 모델 생성 요청
			console.log(bodyData);
			try {
				const response = await fetch("/api/device-model", {
					method: "POST",
					headers: {
						Authorization: session?.user.accessToken,
					},
					body: JSON.stringify({ bodyData }),
				});

				if (!response.ok) {
					const responseData = await response.json();
					throw new Error(responseData.message);
				}
			} catch (error) {
				console.error(error);
			}

			setConfirmModalOpen(
				`${modelName.current?.value} 모델이 생성되었습니다`
				// () => window.location.reload()
			);
		} else {
			window.alert("비어있는 값이 있어 모델을 생성할 수 없습니다.");
		}
	};

	return (
		<div
			id="outer-layer"
			onClick={(e) => {
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
