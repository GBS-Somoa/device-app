"use client";

import { useRef } from "react";
import useModalStore from "../store/modalState";

export default function DeviceList() {
	const setConfirmModalOpen = useModalStore(
		(state) => state.setConfirmModalOpen
	);
	const manufacturerName = useRef<HTMLInputElement>(null);
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (manufacturerName.current) {
			// TODO :: 제조사 생성 api 호출 -> manufacturerList 업데이트
			console.log(manufacturerName.current.value);
			setConfirmModalOpen(
				`${manufacturerName.current.value} 제조사가 생성되었습니다`,
				() => window.location.reload()
			);
			// manufacturerName.current.value = "";
		}
	};
	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white w-2/3 h-20 px-10 py-5 rounded-lg flex justify-between"
		>
			<input
				type="text"
				placeholder="제조사 이름을 입력하세요"
				ref={manufacturerName}
				className="w-2/3 py-2 px-3 form-item"
			/>
			<button type="submit" className="btn-primary w-1/4 py-2">
				제조사 생성
			</button>
		</form>
	);
}
