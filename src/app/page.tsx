import ManufacturerCreateForm from "./components/ManufacturerCreateForm";
import DeviceList from "./components/DeviceList";
import DeviceModelCreateForm from "./components/DeviceModelCreateForm";

const Home: React.FC = () => {
	// 렌더링 시점에 제조사 목록 조회 요청 보내기
	// 소모품 목록 조회 요청 보내기
	// 기기 종류 조회 요청 보내기
	const deviceType: string[] = [""];
	const manufacturerList: string[] = ["Samsung", "LG", "Apple"]; // 예시 데이터
  const 

	return (
		<>
			<main className="flex mx-auto max-w-[1290px] min-h-screen flex-col items-center p-24">
				{/* 제조사 생성 폼 */}
				<ManufacturerCreateForm />
				{/* 기기 목록 */}
				<DeviceList manufacturerList={manufacturerList} />
			</main>
			{/* <DeviceModelCreateForm manufacturer="Samsung" deviceType="washer" /> */}
		</>
	);
};

export default Home;
