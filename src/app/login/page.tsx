"use client";

import { useRef } from "react";

export default function LoginForm() {
	type LoginFormType = {
		id: string;
		pw: string;
	};

	const id = useRef<HTMLInputElement>(null);
	const pw = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (id.current && pw.current) {
			const formData: LoginFormType = {
				id: id.current.value,
				pw: pw.current.value,
			};
			// 여기에 폼 데이터 처리 로직을 추가하세요.
			console.log(formData);
		}
	};

	return (
		<>
			<h1 className="text-center font-bold text-3xl m-10">
				소모아 테스트앱 - 기기
			</h1>
			<p className="text-center font-bold text-red-500 m-1">
				관리자용 서비스입니다.
				<br />
				관리자 계정으로 로그인하세요.
			</p>

			<div className="mx-auto p-10 w-[500px] h-[230px] bg-blue-100 rounded-lg text-center">
				<form onSubmit={handleSubmit}>
					<div className="flex justify-between my-2">
						<label htmlFor="id" className="text-xl">
							ID
						</label>
						<input
							type="text"
							name="id"
							ref={id}
							className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<div className="flex justify-between my-2">
						<label htmlFor="pw" className="text-xl">
							PASSWORD
						</label>
						<input
							type="password"
							name="pw"
							ref={pw}
							className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<button
						type="submit"
						className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-3 px-5 rounded my-3"
					>
						로그인
					</button>
				</form>
			</div>
		</>
	);
}
