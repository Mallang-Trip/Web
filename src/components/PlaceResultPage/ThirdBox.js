import React from "react";
import { useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

function ThirdBox() {
  const [num, setNum] = useState(0);

  function setIncrease() {
    num < 10 && setNum(num + 1);
  }
  function setDecrease() {
    num > 0 && setNum(num - 1);
  }

  return (
    <div className="flex flex-col justify-center gap-y-1vw">
      <div className="relative w-full">
        <div className="w-64 h-32 bg-white">
          <p className="relative top-[13px] left-[10px] text-gray-500 text-base text-gray">
            참여 인원
          </p>
        </div>
        <div className="absolute text-2xl text-black -translate-x-1/2 -translate-y-1/3 left-1/2 top-1/2">
          <div className="grid grid-cols-3 justify-items-center top-1/2">
            <button onClick={setDecrease}>
              <RemoveIcon />
            </button>
            <div>{num}명</div>
            <button onClick={setIncrease}>
              <AddIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThirdBox;
