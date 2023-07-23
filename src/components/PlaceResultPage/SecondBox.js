import React from "react";

function SecondBox(props) {
  return (
    <div className="flex flex-col gap-y-1vw justify-center">
      <div className="relative">
        <div className="w-[153px] h-[87px] bg-white">
          <p className="relative top-[13px] left-[10px] text-gray-500 text-xs">
            가능한 일정
          </p>
          <p className="absolute left-[51px] top-[41px] bottom-[31px] text-black">
            날짜
          </p>
        </div>
      </div>
    </div>
  );
}

export default SecondBox;
