import * as ManufacturerAPI from "@/app/api/manufacturer/route";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";

describe("Manufacturer API 테스트", () => {
  beforeAll(async () => {
    await dbConnect();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("GET /api/manufacturer", () => {
    it("제조사 조회 테스트", async () => {
      const mockRequest = new NextRequest(
        "http://localhost:3000/api/manufacturer"
      );

      const response = await ManufacturerAPI.GET(mockRequest);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toHaveProperty("message");
      expect(data).toHaveProperty("data");
      expect(data.data).toHaveProperty("manufacturers");
      expect(data.data).toHaveProperty("deviceTypes");
      expect(data.data).toHaveProperty("supplyTypes");
      expect(Array.isArray(data.data.manufacturers)).toBe(true);
      expect(Array.isArray(data.data.deviceTypes)).toBe(true);
      expect(Array.isArray(data.data.supplyTypes)).toBe(true);
    });
  });

  describe("POST /api/manufacturer", () => {
    it("제조사 생성 테스트", async () => {
      const requestBody = {
        name: "test1",
      };
      const mockRequest = new NextRequest(
        "http://localhost:3000/api/manufacturer",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
        }
      );

      const response = await ManufacturerAPI.POST(mockRequest);
      expect(response.status).toBe(201);

      const data = await response.json();
      expect(data).toHaveProperty("message");
      expect(data).toHaveProperty("data");
      expect(data.data).toHaveProperty("name");
      expect(data.data.name).toBe(requestBody.name);
    });
  });

  describe("DELETE /api/manufacturer?manufacturer={manufacturer}", () => {
    it("제조사 삭제 테스트", async () => {
      const manufacturerName = "test1";
      const mockRequest = new NextRequest(
        `http://localhost:3000/api/manufacturer?manufacturer=${encodeURIComponent(
          manufacturerName
        )}`,
        {
          method: "DELETE",
        }
      );

      const response = await ManufacturerAPI.DELETE(mockRequest);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toHaveProperty("message");
    });
  });
});
