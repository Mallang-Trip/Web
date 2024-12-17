import {
  Dispatch,
  memo,
  MouseEvent,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { ArticleCategoryType } from "@/types";
import TabBar from "./TabBar";
import TabItem from "./TabItem";

interface Props {
  category: ArticleCategoryType;
  setCategory: Dispatch<SetStateAction<ArticleCategoryType>>;
}

function Tab({ category, setCategory }: Props) {
  const { articleId } = useParams();
  const [offsetX, setOffsetX] = useState(0);
  const [offsetWidth, setOffsetWidth] = useState(34);

  const TabList: ArticleCategoryType[] = useMemo(
    () => ["전체", "자유게시판", "동행구해요", "피드백"],
    []
  );

  const categoryClickHandler = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (
        event.currentTarget.innerText === "전체" ||
        event.currentTarget.innerText === "자유게시판" ||
        event.currentTarget.innerText === "동행구해요" ||
        event.currentTarget.innerText === "피드백"
      ) {
        setOffsetX(event.currentTarget.offsetLeft);
        setOffsetWidth(event.currentTarget.offsetWidth);
        setCategory(event.currentTarget.innerText);
      }
    },
    []
  );

  if (articleId !== "main") return null;
  return (
    <div className="flex flex-nowrap mt-2 mb-2 gap-5 text-center relative custom-scrollbar">
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

export default memo(Tab);
