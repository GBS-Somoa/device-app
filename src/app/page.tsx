import ManufacturerCreateForm from "./components/ManufacturerCreateForm";
import DeviceList from "./components/DeviceList";

export default function Home() {
	// 렌더링 시점에 제조사 목록 조회 요청 보내기
	const deviceType = [""];
	const manufacturerList = ["Samsung", "LG", "Apple"]; // 예시 데이터

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			{/* 제조사 생성 폼 */}
			<ManufacturerCreateForm />
			{/* 기기 목록 */}
			<DeviceList manufacturerList={manufacturerList} />
		</main>
	);
}
