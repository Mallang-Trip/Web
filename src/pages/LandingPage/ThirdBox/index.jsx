import React, { useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

function ThirdBox() {
  const [num, setNum] = useState(1);

  const setIncrease = () => num < 10 && setNum(num + 1);
  const setDecrease = () => num > 1 && setNum(num - 1);

  return (
    <div className="w-full h-32 my-auto bg-white">
      <p className="mt-3 mb-5 ml-3 text-gray-500 text-sm md:text-base text-gray">
        참여 인원
      </p>
      <div className="w-full flex justify-center gap-1 md:gap-3 text-lg md:text-xl text-black">
        <RemoveIcon
          onClick={setDecrease}
          className="border-2 border-red-500 rounded-full text-red-500 cursor-pointer"
        />
        <div>{num}명</div>
        <AddIcon
          onClick={setIncrease}
          className="border-2 border-primary rounded-full text-primary cursor-pointer"
        />
      </div>
    </div>
  );
}

export default ThirdBox;
