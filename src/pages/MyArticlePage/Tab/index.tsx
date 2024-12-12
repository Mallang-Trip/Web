import { Dispatch, memo, SetStateAction } from "react";
import clsx from "clsx";

interface Props {
  tabCategory: "article" | "comment";
  setTabCategory: Dispatch<SetStateAction<"article" | "comment">>;
}

function Tab({ tabCategory, setTabCategory }: Props) {
  return (
    <div className="flex gap-2 my-9">
      <button
        className={clsx(
          "border text-sm px-5 py-1.5 rounded-full",
          tabCategory === "article"
            ? "bg-primary text-white border-primary"
            : "bg-white text-darkgray border-darkgray"
        )}
        onClick={() => setTabCategory("article")}
      >
        게시글 목록
      </button>
      <button
        className={clsx(
          "border text-sm px-5 py-1.5 rounded-full",
          tabCategory === "comment"
            ? "bg-primary text-white border-primary"
            : "bg-white text-darkgray border-darkgray"
        )}
        onClick={() => setTabCategory("comment")}
      >
        댓글 목록
      </button>
    </div>
  );
}

export default memo(Tab);
