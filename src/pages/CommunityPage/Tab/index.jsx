import { useState } from "react";
import { useParams } from "react-router-dom";
import TabBar from "./TabBar";
import TabItem from "./TabItem";

const TabList = ["전체", "자유게시판", "동행구해요", "피드백"];

function Tab({ category, setCategory }) {
  const { articleId } = useParams();
  const [offsetX, setOffsetX] = useState(0);
  const [offsetWidth, setOffsetWidth] = useState(34);

  const categoryClickHandler = (e) => {
    setOffsetX(e.currentTarget.offsetLeft);
    setOffsetWidth(e.currentTarget.offsetWidth);
    setCategory(e.currentTarget.innerText);
  };

  if (articleId !== "main") return null;
  return (
    <div className="flex flex-nowrap overflow-x-auto mt-2 mb-2 gap-5 text-center relative noScrollBar">
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
