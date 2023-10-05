import React, { useState } from "react";
import FilterBtn from "../Atoms/FilterBtn";

function FilterBtnBox() {
  const filterData = [
    "추천 순",
    "인원 순",
    "가격 낮은 순",
    "가격 높은 순",
    "평점 순",
  ];
  const [filterItem, setFilterItem] = useState("추천 순");

  return (
    <div className="w-full flex gap-5 pl-5 pb-7 flex-wrap">
      {filterData.map((item) => (
        <FilterBtn
          key={item}
          title={item}
          filterItem={filterItem}
          setFilterItem={setFilterItem}
        />
      ))}
    </div>
  );
}

export default FilterBtnBox;
