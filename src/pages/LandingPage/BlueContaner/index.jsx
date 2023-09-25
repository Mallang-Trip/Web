import React from "react";
import FirstBox from "../FirstBox";
import SecondBox from "../SecondBox";
import ThirdBox from "../ThirdBox";
import FinalBox from "../FinalBox";

function BlueContaner() {
  return (
    <div className="flex justify-center gap-1 w-full px-5 lg:px-20 h-40 bg-primary rounded-tl-3xl rounded-br-3xl">
      <FirstBox />
      <SecondBox />
      <ThirdBox />
      <FinalBox />
    </div>
  );
}

export default BlueContaner;
