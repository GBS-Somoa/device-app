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
  const origin = request.headers.get("origin");
  const serviceUrl: any = process.env.SERVICE_URL;

  if (origin !== serviceUrl) {
    if (!verifyAccessToken(request)) {
      return new Response(JSON.stringify({ error: "No Authorization" }), {
        status: 401,
      });
    }
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

      const result: any[] = [];

      for (const model of deviceModels) {
        const deviceIds = await DeviceInstance.find({
          deviceModelId: model._id,
        }).distinct("deviceId");

        result.push({
          deviceModel: model.deviceModel,
          deviceModelId: model._id,
          deviceIds,
        });
      }
      if (result.length === 0) {
        return NextResponse.json(
          { message: "해당하는 모델-기기 목록이 없습니다." },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { message: "기기 목록 조회에 성공했습니다.", data: result },
        { status: 200 }
      );
    } else if (deviceId) {
      const deviceInstance = await DeviceInstance.findOne({
        deviceId: deviceId,
      }).populate("deviceModelId", "-_id");
      if (!deviceInstance) {
        const response = NextResponse.json(
          { message: "해당하는 기기가 없습니다." },
          { status: 404 }
        );
        response.headers.set("Access-Control-Allow-Origin", serviceUrl);
        return response;
      }
      const response = NextResponse.json(
        {
          message: "기기 단일 조회에 성공했습니다.",
          data: deviceInstance.deviceModelId,
        },
        { status: 200 }
      );
      response.headers.set("Access-Control-Allow-Origin", serviceUrl);
      return response;
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
      {
        message: "기기가 생성되었습니다.",
        data: { deviceId: deviceInstance.deviceId },
      },
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

export async function DELETE(request: NextRequest) {
  if (!verifyAccessToken(request)) {
    return new Response(JSON.stringify({ error: "No Authorization" }), {
      status: 401,
    });
  }

  await dbConnect();

  try {
    const deviceId = request.nextUrl.searchParams.get("device_id");

    const deviceInstance = await DeviceInstance.findOneAndDelete({
      deviceId,
    });

    if (!deviceInstance) {
      return NextResponse.json(
        { message: "해당하는 기기가 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "기기가 삭제되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete device instance", error);
    return NextResponse.json(
      { message: "Failed to delete device instance" },
      { status: 500 }
    );
  }
}
