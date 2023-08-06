import React from "react";

function FinalBox() {
  return (
    <div className="flex flex-col gap-y-1vw justify-center">
      <div className="relative">
        <div className="w-[153px] h-[87px] bg-white rounded-r-lg">
          <p className="absolute top-[13px] left-[10px] text-gray-500 text-xs">
            가격범위
          </p>
          <p className="absolute left-[51px] top-[41px] bottom-[31px] text-black">
            상관없이
          </p>
        </div>
      </div>
    </div>
  );
}

export default FinalBox;
