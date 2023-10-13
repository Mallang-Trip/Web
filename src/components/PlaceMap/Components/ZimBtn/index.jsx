import React from "react";
import ZimHeart from "../../../../assets/svg/zzimHeart.svg";
function ZimBtn() {
  return (
    <div className="h-8 flex gap-2 place-items-center pl-2 bg-skyblue w-24 md:h-10 border rounded-lg border-primary hover:cursor-pointer  hover:bg-sky-700">
      <img className="h-6" src={ZimHeart} />
      <div className="text-primary text-sm font-bold">찜하기</div>
    </div>
  );
}

export default ZimBtn;
