import { useState } from "react";
import TabBar from "./TabBar";
import TabItem from "./TabItem";

const TabList = [
  "전체",
  "동행구해요",
  "인기글",
  "관광지",
  "제주도",
  "춘천",
  "질문",
  "이벤트",
];

function Tab({ category, setCategory }) {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetWidth, setOffsetWidth] = useState(34);

  const categoryClickHandler = (e) => {
    setOffsetX(e.currentTarget.offsetLeft);
    setOffsetWidth(e.currentTarget.offsetWidth);
    setCategory(e.currentTarget.innerText);
  };

  return (
    <div className="flex flex-wrap mt-2 mb-9 gap-5 text-center relative">
      <TabBar offsetX={offsetX} offsetWidth={offsetWidth} />
      {TabList.map((item) => (
        <TabItem
          category={category}
          categoryClickHandler={categoryClickHandler}
          item={item}
          key={item}
        />
      ))}
    </div>
  );
}

export default Tab;