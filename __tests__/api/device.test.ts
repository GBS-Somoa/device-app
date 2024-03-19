import * as DeviceInstanceAPI from "@/app/api/device/route";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";

describe("DeviceInstacne API 테스트", () => {
  beforeAll(async () => {
    await dbConnect();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("GET /api/device?manufacturer={manufacturer}&device_type={device_type}", () => {
    it("기기 목록 조회 테스트", async () => {
      const manufacturerName = "test2";
      const deviceType = "test2";
      const mockRequest = new NextRequest(
        `http://localhost:3000/api/device?manufacturer=${encodeURIComponent(
          manufacturerName
        )}&device_type=${encodeURIComponent(deviceType)}`
      );

      const response = await DeviceInstanceAPI.GET(mockRequest);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toHaveProperty("message");
      expect(data).toHaveProperty("data");
      expect(Array.isArray(data.data)).toBe(true);
      expect(data.data[0]).toHaveProperty("deviceModel");
      expect(data.data[0]).toHaveProperty("deviceModelId");
      expect(data.data[0]).toHaveProperty("deviceIds");
      expect(Array.isArray(data.data[0].deviceIds)).toBe(true);
    });
  });

  describe("GET /api/device?device_id={device_id}", () => {
    it("기기 단일 조회 테스트", async () => {
      const deviceId = "test2";
      const mockRequest = new NextRequest(
        `http://localhost:3000/api/device?device_id=${encodeURIComponent(
          deviceId
        )}`
      );

      const response = await DeviceInstanceAPI.GET(mockRequest);
      expect(response.status).toBe(200);

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
      expect(Array.isArray(data.data.supplies[0].dataProvided)).toBe(true);
    });
  });

  describe("POST /api/device", () => {
    it("기기 생성 테스트", async () => {
      const requestBody = {
        deviceModelId: "65f9b45d4b645ecf020dc75b",
      };
      const mockRequest = new NextRequest("http://localhost:3000/api/device", {
        method: "POST",
        body: JSON.stringify(requestBody),
      });

      const response = await DeviceInstanceAPI.POST(mockRequest);
      expect(response.status).toBe(201);

      const data = await response.json();
      expect(data).toHaveProperty("message");
      expect(data).toHaveProperty("data");
      expect(data.data).toHaveProperty("deviceId");
      expect(data.data.deviceId).toBe("test3");
    });
  });

  describe("DELETE /api/device?device_id={device_id}", () => {
    it("기기 삭제 테스트", async () => {
      const deviceId = "test3";
      const mockRequest = new NextRequest(
        `http://localhost:3000/api/device?device_id=${encodeURIComponent(
          deviceId
        )}`,
        {
          method: "DELETE",
        }
      );

      const response = await DeviceInstanceAPI.DELETE(mockRequest);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toHaveProperty("message");
    });
  });
});
