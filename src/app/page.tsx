"use client";

import ManufacturerCreateForm from "./components/ManufacturerCreateForm";
import DeviceList from "./components/DeviceList";
import Modal from "./components/Modal";
import useSupplyStore from "./store/supplyState";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Home: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status: sessionStatus } = useSession();
  const [manufacturerList, setManufacturerList] = useState<string[]>([]);
  const [deviceTypeList, setDeviceTypeList] = useState<string[]>([]);

  const setSupplyTypeList = useSupplyStore((state) => state.setSupplyTypeList);

  useEffect(() => {
    // 렌더링 시점에 제조사 목록 조회 요청 보내기 => 이때 제조사 목록, 소모품 목록, 기기 종류 모두 응답함
    // console.log("sessionStatus:", sessionStatus);
    if (session?.user) {
      fetch("/api/manufacturer", {
        method: "GET",
        headers: {
          Authorization: session.user.accessToken,
        },
      })
        .then((res) => {
          if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error("Failed to fetch data");
          }
          return res.json();
        })
        .then((result) => {
          setManufacturerList(
            result.data.manufacturers.map((item: any) => item.name)
          );
          setDeviceTypeList(
            result.data.deviceTypes.map((item: any) => item.type)
          );
          setSupplyTypeList(result.data.supplyTypes);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [session]);

  // 로그인하지 않은 사용자는 로그인창으로 이동시킴
  useEffect(() => {
    if (sessionStatus === "unauthenticated" && pathname !== "/login") {
      router.replace("/login");
    }
  }, [sessionStatus, router, pathname]);

  return (
    sessionStatus === "authenticated" && (
      <>
        <main className="flex mx-auto max-w-[1290px] min-h-screen flex-col items-center p-24">
          <button
            className="absolute top-2 left-1/2 transform -translate-x-1/2 p-2 btn-delete"
            onClick={() => {
              signOut();
            }}
          >
            로그아웃
          </button>
          {/* 제조사 생성 폼 */}
          <ManufacturerCreateForm />
          {/* 기기 목록 */}
          <DeviceList
            manufacturerList={manufacturerList}
            deviceTypeList={deviceTypeList}
          />
        </main>
        <Modal />
      </>
    )
  );
};

export default Home;
