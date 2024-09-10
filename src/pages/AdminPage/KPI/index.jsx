import Container from "./Container";

import { useEffect, useState } from "react";
import { GET } from "../../../utils/axios.js";

function KPI() {
  const [state, setState] = useState({
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
          ["예약 성공률", 89],
          ["제안 성공률", 89],
          ["여행 성공률", 89],
          ["말랑특권 지속률", 89],
          ["30일 기준 재방문률", 89],
          ["회원 당 예약률", 89],
        ],
      },
      {
        name: "취소 및 이탈률",
        child: [
          ["고객 예약 취소율", 89],
          ["파티 예약 취소율", 89],
          ["이탈률", 89],
        ],
      },
    ],
  });

  const getUserNumber = async () => {
    try {
      const result = await GET("/admin/user/count", true);
      setState((prevState) => ({
        ...prevState,
        kpiData: prevState.kpiData.map((item) => {
          if (item.name === "회원") {
            return {
              ...item,
              child: [
                ["일반 회원 수", result.payload.userCount],
                ["드라이버 회원 수", result.payload.driverCount || 0],
              ],
            };
          }
          return item;
        }),
      }));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserNumber();
  }, []);

  return (
    <div>
      <div className="text-2xl font-bold mb-16 whitespace-nowrap">
        KPI(자체 분석 데이터)
      </div>
      <div>
        {state.kpiData.map((item, index) => (
          <Container key={index} {...item} />
        ))}
      </div>
    </div>
  );
}

export default KPI;
