import React from "react";

function PlanBox({ item, index }) {
  return (
    <div className="relative w-full h-[83px] mb-6 rounded-full bg-[#EAF4FF]">
      <div className="w-14 h-14 absolute left-4 top-3 rounded-full bg-primary text-white text-lg flex justify-center items-center">
        {index}
      </div>
      <div className="h-full flex justify-between ml-24 mr-10 text-boldblue text-2xl items-center">
        <div>{item.name}</div>
        <div>{item.time}</div>
      </div>
    </div>
  );
}

export default PlanBox;
