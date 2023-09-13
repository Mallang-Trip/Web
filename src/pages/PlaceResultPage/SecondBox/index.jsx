import React from "react";
import DateSelector from "../DateSelector";

function SecondBox() {
  const onClickHandler = (e) => {
    e.preventDefault();
    console.log("hi!");
    <DateSelector />;
  };

  return (
    <div className="flex flex-col justify-center gap-y-1vw">
      <div className="relative w-full">
        <div className="w-64 h-32 bg-white">
          <p className="relative top-[13px] left-[10px] text-gray-500 text-base text-gray">
            가능한 일정
          </p>
        </div>
        <p
          className="absolute text-2xl text-black -translate-x-1/2 -translate-y-1/3 left-1/2 top-1/2"
          onClick={onClickHandler}
        >
          언제나
        </p>
      </div>
    </div>
  );
}

export default SecondBox;
