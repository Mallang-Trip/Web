import React from "react";
import FirstBox from "./FirstBox";
import SecondBox from "./SecondBox";
import FinalBox from "./FinalBox";
import ThirdBox from "./ThirdBox";
function BoxContainer() {
  return (
    <div
      className=" flex justify-center gap-0.5
    "
    >
      <FirstBox />
      <SecondBox />
      <ThirdBox />
      <FinalBox />
    </div>
  );
}

export default BoxContainer;
