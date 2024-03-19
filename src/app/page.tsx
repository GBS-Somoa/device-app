import ManufacturerCreateForm from "./components/ManufacturerCreateForm";
import DeviceList from "./components/DeviceList";
import Modal from "./components/Modal";

const Home: React.FC = () => {
	// 렌더링 시점에 제조사 목록 조회 요청 보내기 => 이때 제조사 목록, 소모품 목록, 기기 종류 모두 응답함
	// 소모품 목록 조회 요청 보내기
	// 기기 종류 조회 요청 보내기
	// -> props로 자식 컴포넌트에 넘겨줌

	// ---------예시 데이터-------
	const manufacturerList: string[] = ["Samsung", "LG", "Apple"];
	const deviceTypeList: string[] = [
		"refrigerator",
		"washer",
		"humidifier",
		"dehumidifier",
		"airPurifier",
		"steamCloset",
		"dishwasher",
		"vacuumCleaner",
		"waterPurifier",
		"airConditioner",
	];
	const supplyTypeList: string[] = [
		"washerDetergent",
		"fabricSoftener",
		"dishDetergent",
		"dishRinse",
		"cleanableFilter",
		"replaceableFilter",
		"supplyTank",
		"drainTank",
		"dustBin",
	];

	return (
		<>
			<main className="flex mx-auto max-w-[1290px] min-h-screen flex-col items-center p-24">
				{/* 제조사 생성 폼 */}
				<ManufacturerCreateForm />
				{/* 기기 목록 */}
				<DeviceList
					manufacturerList={manufacturerList}
					deviceTypeList={deviceTypeList}
				/>
			</main>
			<Modal supplyTypeList={supplyTypeList} />
		</>
	);
};

export default Home;
