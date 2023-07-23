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
    <div className="flex flex-col gap-y-1vw justify-center">
      <div className="relative">
        <div className="w-[153px] h-[87px] bg-white">
          <p className="relative top-[13px] left-[10px] text-gray-500 text-xs">
            참여 인원
          </p>
          <div className="absolute left-[40px] top-[41px] bottom-[31px] text-black">
            <div className="grid grid-cols-3 justify-items-center top-1/2">
              <button onClick={setDecrease}>
                <RemoveIcon />
              </button>
              <div className="text-xl"> {num}</div>
              <button className="text-xl" onClick={setIncrease}>
                <AddIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThirdBox;
