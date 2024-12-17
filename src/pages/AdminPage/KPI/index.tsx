import { memo, useCallback, useEffect, useState } from "react";
import { GET } from "@/utils/axios";
import Container from "./Container";

function KPI() {
  const [kpi, setKpi] = useState({
    kpiData: [
      {
        name: "회원",
        child: [
          ["일반 회원 수", 0],
          ["드라이버 회원 수 ", 0],
        ],
      },
      {
        name: "다운로드 수",
        child: [
          ["전체 앱 다운로드", 0],
          ["안드로이드 다운로드", 0],
          ["iOS 다운로드", 0],
        ],
      },
      {
        name: "성공률",
        child: [
          ["예약 성공률", 0],
          ["제안 성공률", 0],
          ["여행 성공률", 0],
          ["말랑특권 지속률", 0],
          ["30일 기준 재방문률", 0],
          ["회원 당 예약률", 0],
        ],
      },
      {
        name: "취소 및 이탈률",
        child: [
          ["고객 예약 취소율", 0],
          ["파티 예약 취소율", 0],
          ["이탈률", 0],
        ],
      },
    ],
  });

  const getUserNumber = useCallback(async () => {
    try {
      const result = await GET("/admin/user/count", true);
      const newKPI = { ...kpi };
      (newKPI.kpiData[0] = {
        name: "회원",
        child: [
          ["일반 회원 수", result.payload?.userCount || 0],
          ["드라이버 회원 수", result.payload?.driverCount || 0],
        ],
      }),
        setKpi(newKPI);
    } catch (e) {
      console.log(e);
    }
  }, [kpi]);

  useEffect(() => {
    getUserNumber();
  }, []);

  return (
    <div className="w-full">
      <div className="text-2xl font-bold mb-16 whitespace-nowrap">
        KPI(자체 분석 데이터)
      </div>
      <div>
        {kpi.kpiData.map((item, index) => (
          <Container key={index} {...item} />
        ))}
      </div>
    </div>
  );
}

export default memo(KPI);
