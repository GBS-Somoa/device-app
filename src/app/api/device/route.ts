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
    const deviceInstances = await DeviceInstance.find().populate(
      "deviceModelId"
    );
    return NextResponse.json(deviceInstances, { status: 200 });
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
    return NextResponse.json(deviceInstance, { status: 201 });
  } catch (error) {
    console.error("Failed to create device instance", error);
    return NextResponse.json(
      { message: "Failed to create device instance" },
      { status: 500 }
    );
  }
}
