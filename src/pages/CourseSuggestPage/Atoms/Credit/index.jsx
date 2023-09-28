import React from "react";
import PlusBtn from "../../../../assets/svg/PlusBtn.svg";

function Credit() {
  return (
    <button className="w-[304px] h-[196px] mt-[101px] bg-skyblue rounded-2xl mx-auto flex flex-col justify-center items-center gap-3">
      <div className="text-lg text-primary">결제 수단 등록</div>
      <img src={PlusBtn} />
    </button>
  );
}

export default Credit;
