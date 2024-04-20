import Container from "./Container";

import { useState } from "react";

function KPI(){
    const [state, setState] = useState({
        userNum: 0,
        download: ["다운로드", [["전체 앱 다운로드", 0],["안드로이드 다운로드", 0],["iOS 다운로드", 0]]],
        rateSuccess: ["성공률", [["예약 성공률", 89], ["제안 성공률", 89], ["여행 성공률", 89], ["말랑특권 지속률", 89], ["30일 기준 재방문률", 89], ["회원 당 예약률", 89]]],
        rateCancel: ["취소 및 이탈률", [["고객 예약 취소율", 89], ["파티 예약 취소율", 89], ["이탈률", 89]]],
    })

    const array = [
        {name: "다운로드", child:[["전체 앱 다운로드", 0],["안드로이드 다운로드", 0],["iOS 다운로드", 0]]}, 
        {name: "성공률", child:[["예약 성공률", 89], ["제안 성공률", 89], ["여행 성공률", 89], ["말랑특권 지속률", 89], ["30일 기준 재방문률", 89], ["회원 당 예약률", 89]]},
        {name: "취소 및 이탈률", child:[["고객 예약 취소율", 89], ["파티 예약 취소율", 89], ["이탈률", 89]]}
    ];

    return(
        <div>
            <div className="text-2xl font-bold mb-16 whitespace-nowrap">
                KPI(자체 분석 데이터)
            </div>
            <div className="mb-16">
                <div className="text-[#3E3E3E] text-lg font-semibold">
                    회원 수
                </div>
                <div className="text-[#1C1B1F] text-3xl">{state.userNum} 명</div>
            </div>
            <div>
                {array.map((item, index)=>
                    <Container
                        key={index}
                        {...item}
                    />
                )}
            </div>
        </div>
    )
}

export default KPI;