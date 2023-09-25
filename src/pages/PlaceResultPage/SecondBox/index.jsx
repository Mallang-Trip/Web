import React from "react";
import DateSelector from "../DateSelector";

function SecondBox() {
  const onClickHandler = (e) => {
    e.preventDefault();
    console.log("hi!");
    <DateSelector />;
  };

  return (
    <div className="w-full h-32 my-auto bg-white">
      <p className="mt-3 mb-5 ml-3 text-gray-500 text-sm md:text-base text-gray">
        가능한 일정
      </p>
      <p
        className="text-lg md:text-xl text-black text-center"
        onClick={onClickHandler}
      >
        언제나
      </p>
    </div>
  );
}

export default SecondBox;
