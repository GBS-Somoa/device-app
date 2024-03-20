import * as DeviceModelAPI from "@/app/api/device-model/route";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";

describe("DeviceModel API 테스트", () => {
  beforeAll(async () => {
    await dbConnect();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("POST /api/device-model", () => {
    it("기기 모델 생성 테스트", async () => {
      const requestBody = {
        deviceModel: "test1",
        deviceManufacturer: "test1",
        deviceType: "test1",
        supplies: [
          {
            supplyType: "test1",
            supplyName: "test1",
            dataProvided: ["test1"],
          },
        ],
      };
      const mockRequest = new NextRequest(
        "http://localhost:3000/api/device-model",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
        }
      );

      const response = await DeviceModelAPI.POST(mockRequest);
      expect(response.status).toBe(201);

      const data = await response.json();
      expect(data).toHaveProperty("message");
      expect(data).toHaveProperty("data");
      expect(data.data).toHaveProperty("deviceModel");
      expect(data.data).toHaveProperty("deviceManufacturer");
      expect(data.data).toHaveProperty("deviceType");
      expect(data.data).toHaveProperty("supplies");
      expect(Array.isArray(data.data.supplies)).toBe(true);
      expect(data.data.supplies[0]).toHaveProperty("supplyType");
      expect(data.data.supplies[0]).toHaveProperty("supplyName");
      expect(data.data.supplies[0]).toHaveProperty("dataProvided");
      expect(data.data.deviceModel).toBe(requestBody.deviceModel);
      expect(data.data.deviceManufacturer).toBe(requestBody.deviceManufacturer);
      expect(data.data.deviceType).toBe(requestBody.deviceType);
      expect(data.data.supplies[0].supplyType).toBe(
        requestBody.supplies[0].supplyType
      );
      expect(data.data.supplies[0].supplyName).toBe(
        requestBody.supplies[0].supplyName
      );
      expect(Array.isArray(data.data.supplies[0].dataProvided)).toBe(true);
      expect(data.data.supplies[0].dataProvided[0]).toBe(
        requestBody.supplies[0].dataProvided[0]
      );
    });
  });

  describe("DELETE /api/device-model?model={model}", () => {
    it("기기 모델 삭제 테스트", async () => {
      const modelName = "test1";
      const mockRequest = new NextRequest(
        `http://localhost:3000/api/device-model?model=${encodeURIComponent(
          modelName
        )}`,
        {
          method: "DELETE",
        }
      );

      const response = await DeviceModelAPI.DELETE(mockRequest);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toHaveProperty("message");
    });
  });
});
