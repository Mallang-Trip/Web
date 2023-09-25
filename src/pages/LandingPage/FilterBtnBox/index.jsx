import React from "react";
import FilterBtn from "../Atoms/FilterBtn";

function FilterBtnBox() {
  return (
    <div className="w-full flex gap-5 pl-5 pb-7 flex-wrap">
      <FilterBtn title={"추천 순"} />
      <FilterBtn title={"인원 순"} />
      <FilterBtn title={"가격 낮은 순"} />
      <FilterBtn title={"가격 높은 순"} />
      <FilterBtn title={"평점 순"} />
    </div>
  );
}

export default FilterBtnBox;
