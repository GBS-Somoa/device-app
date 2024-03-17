"use client";

import { useRef } from "react";

interface OwnProps {
	manufacturer: string;
	modelName: string;
	deviceId: string;
	supplyList: string[];
}

const DeviceDetailModal: React.FC<OwnProps> = ({
	manufacturer,
	modelName,
	deviceId,
	supplyList,
}) => {
	return (
		<div id="outer-layer">
			<div
				id="inner-layer"
				className="w-[100px] h-[50px] bg-primary rounded-lg"
			>
        <button>동작</button>
				<div id="device-info">
          <p>제조사 : {manufacturer}</p>
          <p>기기 모델명: {modelName}</p>
          <p>Device ID : {deviceId}</p>
        </div>
        <div id="supplies">
            {supplyList.map((item, index) => (
              <div className="flex">
                <p>{item}</p>
                {/* TODO:: 소모품 종류에 따라 데이터 입력칸 다르게 생성 => store/dataStore/supplyTypeDetailList 참고 */}
                <input type="text" />
                </div>
            ))}
          </div>
        </div>

			</div>
		</div>
	);
};

export default DeviceDetailModal;
