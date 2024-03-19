import ManufacturerCreateForm from "./components/ManufacturerCreateForm";
import DeviceList from "./components/DeviceList";
import Modal from "./components/Modal";

interface supplyType {
	type: string;
	dataProvided: string[];
}

const Home: React.FC = async () => {
	// 렌더링 시점에 제조사 목록 조회 요청 보내기 => 이때 제조사 목록, 소모품 목록, 기기 종류 모두 응답함
	// 소모품 목록 조회 요청 보내기
	// 기기 종류 조회 요청 보내기
	// -> props로 자식 컴포넌트에 넘겨줌

	// const response = await fetch("/api/manufacturer");

	// ---------예시 데이터-------
	const data = {
		manufacturers: [
			{
				name: "Samsung",
			},
			{
				name: "LG",
			},
			{
				name: "Apple",
			},
		],
		deviceTypes: [
			{
				type: "refrigerator",
			},
			{
				type: "washer",
			},
			{
				type: "humidifier",
			},
			{
				type: "dehumidifier",
			},
			{
				type: "airPurifier",
			},
			{
				type: "humidifier",
			},
			{
				type: "steamCloset",
			},
			{
				type: "dishwasher",
			},
		],
		supplyTypes: [
			{
				type: "washerDetergent",
				dataProvided: ["supplyAmount"],
			},
			{
				type: "fabricSoftener",
				dataProvided: ["supplyAmount"],
			},
			{
				type: "supplyTank",
				dataProvided: ["supplyLevel", "supplyChangedDate"],
			},
			{
				type: "cleanableFilter",
				dataProvided: ["supplyStatus", "supplyChangedDate"],
			},
		],
	};
	const manufacturerList: string[] = data.manufacturers.map(
		(item) => item.name
	);
	const deviceTypeList: string[] = data.deviceTypes.map((item) => item.type);
	const supplyTypeList: supplyType[] = data.supplyTypes;

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
