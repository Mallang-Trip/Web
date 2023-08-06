import React from "react";
import BlueContaner from "../components/PlaceResultPage/BlueContaner";
import FilterBtnBox from "../components/PlaceResultPage/Components/FilterBtnBox";
import Pictures from "../components/PlaceResultPage/Components/Pictures";

function PlaceResultPage() {
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between pl-5 pb-3 mx-auto overflow-hidden text-lg">
          어디로 떠나고 싶으신가요?
        </div>
        <BlueContaner />
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between pl-5 pt-10 pb-3 mx-auto overflow-hidden text-lg">
          추천 파티
        </div>
        <FilterBtnBox />
        <Pictures />
      </div>
    </React.Fragment>
  );
}

export default PlaceResultPage;
