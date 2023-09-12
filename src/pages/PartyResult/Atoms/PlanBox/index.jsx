import React from "react";

function PlanBox() {
  return (
    <div className="w-full mx-auto">
      <div className=" relative w-full pt-5 h-[83px] rounded-full bg-[#EAF4FF]">
        <div className="w-[58px] h-[58px] absolute left-4 top-3 rounded-full bg-primary">
          <div className="absolute left-6 top-4 text-white text-lg">1</div>
        </div>
        <div className="absolute left-24 top-6 text-boldblue text-2xl">
          집합:제주공항 1게이트
        </div>
        <div className="absolute end-10 top-6 text-boldblue text-2xl">
          10:00
        </div>
      </div>
    </div>
  );
}

export default PlanBox;
