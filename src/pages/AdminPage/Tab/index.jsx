import React from "react";
import TabItem from "./TabItem";
const tabList = [
  "어드민 홈",
  "모집중인 파티 관리",
  "예약된 파티 관리",
  "완료된 파티 관리",
  "취소된 파티 관리",
];

function Tab({ category, setCategory }) {
  const onClickCategoryHandler = (e) => {
    setCategory(e.currentTarget.innerText);
    console.log(e.target.innerText);
  };
  return (
    <div>
      {tabList.map((items) => (
        <TabItem
          items={items}
          category={category}
          onClickCategoryHandler={onClickCategoryHandler}
          key={items}
        />
      ))}
    </div>
  );
}

export default Tab;