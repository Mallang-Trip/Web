import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
function FirstBox() {
  const location = useLocation();
  console.log(location);
  return (
    <div className="flex flex-col gap-y-1vw justify-center">
      <div className="relative">
        <div className="w-[153px] h-[87px] bg-white rounded-l-lg">
          <p className="relative top-[13px] left-[10px] text-gray-500 text-xs">
            목적지
          </p>
          <p className="absolute left-[51px] top-[41px] bottom-[31px] text-black">
            {location.state.result}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FirstBox;
