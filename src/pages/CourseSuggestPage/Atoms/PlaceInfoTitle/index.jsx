import React from "react";
import star from "../../../../assets/svg/star.svg";

function PlaceInfoTitle() {
  return (
    <div className="mb-4">
      <div className="mb-1 pt-6 flex">
        <p className="text-2xl font-bold">오설록 티 뮤지엄</p>
        <div className="flex gap-1 m-2 mt-3 text-xs">
          <span>방문 100회</span>
          <span>|</span>
          <img className="mb-1" src={star} />
          <span>4.7</span>
        </div>
      </div>
      <div className="text-sm">제주 서귀포시 안덕면 신화여사로 15 오설록</div>
    </div>
  );
}

export default PlaceInfoTitle;
