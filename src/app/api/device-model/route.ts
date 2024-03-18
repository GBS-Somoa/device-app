import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import DeviceModel from "@/models/DeviceModel";
import DeviceInstance from "@/models/DeviceInstance";
import { verifyAccessToken } from "@/lib/verifyAccessToken";

interface DeviceModelApiRequest {
  deviceModel: string;
  deviceManufacturer: string;
  deviceType: string;
  supplies: {
    supplyType: string;
    supplyName: string;
    dataProvided: string[];
  }[];
}

export async function POST(request: NextRequest) {
  if (!verifyAccessToken(request)) {
    return new Response(JSON.stringify({ error: "No Authorization" }), {
      status: 401,
    });
  }

  await dbConnect();

  try {
    const {
      deviceModel,
      deviceManufacturer,
      deviceType,
      supplies,
    }: DeviceModelApiRequest = await request.json();

    const newDeviceModel = new DeviceModel({
      deviceModel,
      deviceManufacturer,
      deviceType,
      supplies,
    });

    await newDeviceModel.save();
    return NextResponse.json(
      { message: "기기 모델이 생성되었습니다.", data: newDeviceModel },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create device model", error);
    return NextResponse.json(
      { message: "Failed to create device model" },
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
    const deviceModel = request.nextUrl.searchParams.get("deviceModel");

    const deviceModelId = await DeviceModel.findOne({
      deviceModel: deviceModel,
    });

    console.log(deviceModelId);

    // 해당 DeviceModel을 참조하는 DeviceInstance 삭제
    await DeviceInstance.deleteMany({ deviceModelId: deviceModelId._id });

    // DeviceModel 문서 삭제
    await DeviceModel.deleteOne({ deviceModel: deviceModel });

    return NextResponse.json(
      { message: "Device model deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete device model" },
      { status: 500 }
    );
  }
}
