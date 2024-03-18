import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Manufacturer from "@/models/Manufacturer";
import DeviceType from "@/models/DeviceType";
import SupplyType from "@/models/SupplyType";
import DeviceModel from "@/models/DeviceModel";
import DeviceInstance from "@/models/DeviceInstance";
import { verifyAccessToken } from "@/lib/verifyAccessToken";

interface ManufacturerApiRequest {
  name: string;
}

export async function GET(request: NextRequest) {
  if (!verifyAccessToken(request)) {
    return new Response(JSON.stringify({ error: "No Authorization" }), {
      status: 401,
    });
  }

  await dbConnect();

  try {
    const manufacturers = await Manufacturer.find();
    const deviceTypes = await DeviceType.find();
    const supplyTypes = await SupplyType.find();
    return NextResponse.json(
      {
        message: "제조사 목록, 기기 종류, 소모품 종류 조회",
        data: { manufacturers, deviceTypes, supplyTypes },
      },
      { status: 200 }
    );

    // 캐싱 적용 시
    // const response = NextResponse.json(manufacturers, { status: 200 });
    // response.headers.set('Cache-Control', 'public, max-age=600, must-revalidate');
    // return response;
  } catch (error) {
    console.error("Failed to fetch manufacturers", error);
    return NextResponse.json(
      { message: "Failed to fetch manufacturers" },
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
    const { name }: ManufacturerApiRequest = await request.json();

    const manufacturer = new Manufacturer({
      name,
    });

    await manufacturer.save();
    return NextResponse.json(
      { message: "제조사가 생성되었습니다.", data: manufacturer },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create manufacturer", error);
    return NextResponse.json(
      { message: "Failed to create manufacturer" },
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
    const name = request.nextUrl.searchParams.get("manufacturer");

    // DeviceModel 문서 삭제 전 해당 Manufacturer를 참조하는 DeviceModel 찾기
    const deviceModels = await DeviceModel.find({ deviceManufacturer: name });

    // 각 DeviceModel에 대해 해당 모델을 참조하는 DeviceInstance 삭제
    for (const model of deviceModels) {
      await DeviceInstance.deleteMany({ deviceModelId: model._id });
    }

    // DeviceModel 문서 삭제
    await DeviceModel.deleteMany({ deviceManufacturer: name });

    const deletionResult = await Manufacturer.deleteOne({ name: name });

    if (deletionResult.deletedCount > 0) {
      return NextResponse.json(
        { message: "제조사 삭제 완료" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Manufacturer not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Failed to delete manufacturer", error);
    return NextResponse.json(
      { message: "Failed to delete manufacturer" },
      { status: 500 }
    );
  }
}
