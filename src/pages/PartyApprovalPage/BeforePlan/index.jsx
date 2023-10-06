import React, { useState } from "react";
import info from "../../../assets/svg/Polygon 3.svg";
import PartyPlan from "../../../components/PartyPlan";

function BeforePlan() {
  const [showBeforePlan, setShowBeforePlan] = useState(false);

  return (
    <div className="mt-14">
      <div
        className="w-3/4 mx-auto flex gap-2 items-center cursor-pointer"
        onClick={() => setShowBeforePlan(!showBeforePlan)}
      >
        <div className="text-lg font-bold">이전 파티 일정</div>
        <img
          src={info}
          className={`transition-transform duration-500 ${
            showBeforePlan ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <div
        className={`text-sm text-darkgray overflow-hidden transition-all duration-500 ${
          showBeforePlan ? "max-h-[10000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <PartyPlan edit={false} />
      </div>
    </div>
  );
}

export default BeforePlan;
