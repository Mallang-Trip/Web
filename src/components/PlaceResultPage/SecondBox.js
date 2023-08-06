import React from "react";
import DateSelector from "./Components/DateSelector";
function SecondBox() {
  function onClickHandler(e) {
    e.preventDefault();
    console.log("hi!");
    <DateSelector />;
  }
  return (
    <div className="flex flex-col gap-y-1vw justify-center">
      <div className="relative">
        <div className="w-[153px] h-[87px] bg-white">
          <p className="relative top-[13px] left-[10px] text-gray-500 text-xs">
            가능한 일정
          </p>
          <div onClick={onClickHandler}>
            <p className="absolute left-[51px] top-[41px] bottom-[31px] text-black">
              언제나
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondBox;
