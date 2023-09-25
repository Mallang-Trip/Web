import React from "react";
import PlusBtn from "./PlusBtn.svg";
function Credit() {
  return (
    <div className="left-1/3 pt-[101px]">
      <div className="px-[400px]">
        <div className="w-full h-48 p-20 bg-skyblue rounded-[20px] ">
          <div className="absolute">
            <div>
              <div className="text-lg text-primary">결제 수단 등록</div>
            </div>

            <div className="text-center ">
              <img
                src={PlusBtn}
                className="m-auto bg-auto hover:cursor-pointer "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Credit;
