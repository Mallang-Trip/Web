import React from "react";

function FinalBox() {
  return (
    <div className="flex flex-col justify-center gap-y-1vw">
      <div className="relative w-full">
        <div className="w-64 h-32 bg-white rounded-r-lg">
          <p className="absolute top-[13px] left-[10px] text-gray-500 text-base text-gray">
            가격범위
          </p>
        </div>
        <p className="absolute text-2xl text-black -translate-x-1/2 -translate-y-1/3 left-1/2 top-1/2">
          상관없이
        </p>
      </div>
    </div>
  );
}

export default FinalBox;
