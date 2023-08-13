import React from "react";
import star from "../../../../src/assets/svg/star.svg";
function PlaceInfoTitle() {
  return (
    <div>
      <div className="mb-1 pt-6 flex">
        <p className="text-[23px] font-bold ">오설록 티 뮤지엄</p>
        <div className="flex m-2 mt-3 text-sm">
          <p className="ml-">방문 100회</p>
          <p className="ml-1">|</p>
          <div className="grid grid-cols-2">
            <img className="m-1" src={star} />
            <p className="">4.7</p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm pb-4">
          제주 서귀포시 안덕면 신화여사로 15 오설록
        </p>
      </div>
    </div>
  );
}

export default PlaceInfoTitle;
