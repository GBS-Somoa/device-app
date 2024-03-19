"use client";

import { useRef, useState, ChangeEvent } from "react";
import useSupplyStore from "../store/supplyState";

interface OwnProps {
	supplyId: number;
	showDelete: boolean;
	changeType(id: number, changedType: string): void;
	changeName(id: number, changedName: string): void;
	deleteSupply(): void;
}

const SupplyAddForm: React.FC<OwnProps> = ({
	supplyId,
	showDelete,
	changeType,
	changeName,
	deleteSupply,
}) => {
	const supplyTypeList = useSupplyStore((state) => state.supplyTypeList);
	const [selectedSupplyType, setSelectedSupplyType] = useState<string>("");
	const supplyName = useRef<HTMLInputElement>(null);
	const handleNameChange = (id: number, value: string) => {
		changeName(id, value);
	};

	return (
		<div className="flex space-x-3 items-center">
			<p>소모품 종류</p>
			<select
				name="supplyType"
				id=""
				className="form-item w-1/3 px-2 h-[30px]"
				value={selectedSupplyType}
				onChange={(event: ChangeEvent<HTMLSelectElement>) => {
					setSelectedSupplyType(event.target.value);
					// supplyList의 type 변경
					changeType(supplyId, event.target.value);
				}}
			>
				<option disabled value="">
					소모품 선택
				</option>
				{supplyTypeList.map((item, index) => (
					<option key={index} value={item.type}>
						{item.type}
					</option>
				))}
			</select>
			<p>이름</p>
			<input
				type="text"
				className="form-item w-1/3 px-2 py-1"
				ref={supplyName}
				onChange={
					// supplyList의 name 변경
					(event) => handleNameChange(supplyId, event.target.value)
				}
			/>
			{/* 버튼은 supplyList의 길이가 2개 이상일 때 + 마지막 supplyAddForm에만 활성화 => showDelete */}
			{showDelete && (
				<button
					className="btn-delete rounded-full w-6 h-6 text-center"
					onClick={deleteSupply}
				>
					-
				</button>
			)}
		</div>
	);
};

export default SupplyAddForm;
