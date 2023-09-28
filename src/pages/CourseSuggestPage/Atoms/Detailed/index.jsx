import React from "react";

function Detailed() {
  return (
    <div className="pb-8">
      <p className="text-lg font-bold mb-1">상세설명</p>
      <p className="text-lg whitespace-pre">
        {
          "기업 오설록에서 운영하는 제주도의 녹차 박물관입니다.\n찻잎 따기, 다과 즐기기, 녹차 디저트 판매 등이 있습니다.\n박물관 입장료는 1만원이며, 다양한 체험 등은 미리 예약을 하시고 가셔야 합니다.\n약 1시간 정도 머무는 편입니다."
        }
      </p>
    </div>
  );
}

export default Detailed;
