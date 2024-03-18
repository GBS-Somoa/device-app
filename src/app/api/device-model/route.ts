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
    const deviceModel = request.nextUrl.searchParams.get("model");

    const deviceModelId = await DeviceModel.findOne({
      deviceModel: deviceModel,
    });

    // DeviceModel을 참조하는 DeviceInstance 삭제
    await DeviceInstance.deleteMany({ deviceModelId: deviceModelId._id });

    // DeviceModel 삭제
    const deletionResult = await DeviceModel.deleteOne({
      deviceModel: deviceModel,
    });

    if (deletionResult.deletedCount > 0) {
      return NextResponse.json(
        { message: "기기 모델이 삭제되었습니다." },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Device model not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete device model" },
      { status: 500 }
    );
  }
}
