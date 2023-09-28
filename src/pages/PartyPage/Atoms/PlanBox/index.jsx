import React from "react";

function PlanBox({ item, index }) {
  return (
    <div className="relative w-full h-16 md:h-[83px] mb-6 rounded-full bg-[#EAF4FF]">
      <div className="w-10 h-10 md:w-14 md:h-14 absolute left-4 top-3 rounded-full bg-primary text-white text-lg flex justify-center items-center">
        {index}
      </div>
      <div className="h-full flex justify-between ml-16 md:ml-24 mr-4 md:mr-10 text-boldblue text-md md:text-2xl items-center">
        <div>{item.name}</div>
        <div>{item.time}</div>
      </div>
    </div>
  );
}

export default PlanBox;
