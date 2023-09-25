import React from "react";
import BlueContaner from "./BlueContaner";
import FilterBtnBox from "./FilterBtnBox";
import Pictures from "./Pictures";

function PlaceResultPage() {
  return (
    <div className="w-full mb-24">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl pb-3 pl-5 mx-auto overflow-hidden text-2xl font-bold">
        어디로 떠나고 싶으신가요?
      </div>
      <BlueContaner />
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl pt-10 pb-3 pl-5 mx-auto overflow-hidden text-2xl font-bold">
        추천 파티
      </div>
      <FilterBtnBox />
      <Pictures />
    </div>
  );
}

export default PlaceResultPage;
