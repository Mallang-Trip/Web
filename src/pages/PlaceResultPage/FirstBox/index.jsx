import React from "react";
import { useParams } from "react-router-dom";

function FirstBox() {
  const { place } = useParams();

  return (
    <div className="flex flex-col justify-center gap-y-1vw">
      <div className="relative w-full">
        <div className="w-64 h-32 bg-white rounded-l-lg">
          <p className="relative top-[13px] left-[10px] text-gray-500 text-base text-gray">
            목적지
          </p>
        </div>
        <p className="absolute text-2xl text-black -translate-x-1/2 -translate-y-1/3 left-1/2 top-1/2">
          {place}
        </p>
      </div>
    </div>
  );
}

export default FirstBox;
