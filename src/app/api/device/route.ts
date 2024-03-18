import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import DeviceInstance from "@/models/DeviceInstance";
import DeviceModel from "@/models/DeviceModel";
import mongoose from "mongoose";
import { verifyAccessToken } from "@/lib/verifyAccessToken";

interface DeviceInstanceApiRequest {
  deviceModelId: string;
}

export async function GET(request: NextRequest) {
  if (!verifyAccessToken(request)) {
    return new Response(JSON.stringify({ error: "No Authorization" }), {
      status: 401,
    });
  }

  await dbConnect();

  mongoose.model("DeviceModel", DeviceModel.schema);

  try {
    const manufacturer = request.nextUrl.searchParams.get("manufacturer");
    const deviceType = request.nextUrl.searchParams.get("device_type");
    const deviceId = request.nextUrl.searchParams.get("device_id");

    if (manufacturer && deviceType) {
      const deviceModels = await DeviceModel.find({
        deviceManufacturer: manufacturer,
        deviceType: deviceType,
      });

      const result: any = {};

      for (const model of deviceModels) {
        const deviceInstances = await DeviceInstance.find({
          deviceModelId: model._id,
        });

        const deviceIds = deviceInstances.map((instance) => instance.deviceId);

        result[model.deviceModel] = { deviceIds };
      }
      return NextResponse.json(
        { message: "기기 목록 조회에 성공했습니다.", data: result },
        { status: 200 }
      );
    } else if (deviceId) {
      const deviceInstance = await DeviceInstance.findOne({
        deviceId: deviceId,
      }).populate("deviceModelId");
      return NextResponse.json(
        { message: "기기 단일 조회에 성공했습니다.", data: deviceInstance },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Invalid query parameters" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Failed to fetch device instances", error);
    return NextResponse.json(
      { message: "Failed to fetch device instances" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAccessToken(request)) {
    return new Response(JSON.stringify({ error: "No Authorization" }), {
      status: 401,
    });
  }

  await dbConnect();

  try {
    const { deviceModelId }: DeviceInstanceApiRequest = await request.json();

    const deviceInstance = new DeviceInstance({
      deviceModelId,
    });

    await deviceInstance.save();
    return NextResponse.json(
      { message: "기기가 생성되었습니다.", data: deviceInstance },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create device instance", error);
    return NextResponse.json(
      { message: "Failed to create device instance" },
      { status: 500 }
    );
  }
}
