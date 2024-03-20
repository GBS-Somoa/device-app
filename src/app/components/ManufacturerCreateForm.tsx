"use client";

import { useRef } from "react";
import { useSession } from "next-auth/react";
import useModalStore from "../store/modalState";

export default function DeviceList() {
	const { data: session } = useSession();
	const setConfirmModalOpen = useModalStore(
		(state) => state.setConfirmModalOpen
	);
	const manufacturerName = useRef<HTMLInputElement>(null);
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (manufacturerName.current) {
			// 제조사 생성 api 호출 -> manufacturerList 업데이트
			try {
				const response = await fetch("/api/manufacturer", {
					method: "POST",
					headers: {
						Authorization: session ? session.user.accessToken : "",
					},
					body: JSON.stringify({ name: manufacturerName.current.value }),
				});

				if (!response.ok) {
					const responseData = await response.json();
					throw new Error(responseData.message);
				}
			} catch (error) {
				console.error(error);
			}
			setConfirmModalOpen(
				`${manufacturerName.current.value} 제조사가 생성되었습니다`,
				() => window.location.reload()
			);
			// manufacturerName.current.value = "";
		}
	};
	return (
		<>
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
		</>
	);
}
