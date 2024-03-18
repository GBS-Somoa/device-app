//  이거 다 서버가 줌, 저장해놓을 필요 없음

export const deviceTypeList = [
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

export const supplyTypeList = [
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

export const supplyTypeDetailList = {
	washerDetergent: ["amount"],
	fabricSoftener: ["amount"],
	dishDetergent: ["amount"],
	dishRinse: ["amount"],
	cleanableFilter: ["status", "date"],
	replaceableFilter: ["status", "date"],
	supplyTank: ["level", "date"],
	drainTank: ["level", "date"],
	dustBin: ["level", "date"],
};
