import { memo, MouseEvent } from "react";
import { ArticleCategoryType } from "../../../../types";
import clsx from "clsx";

interface Props {
  item: ArticleCategoryType;
  category: ArticleCategoryType;
  categoryClickHandler: (event: MouseEvent<HTMLButtonElement>) => void;
}

function TabItem({ item, category, categoryClickHandler }: Props) {
  return (
    <button
      className={clsx(
        "text-sm py-3 px-1 focus:outline-none whitespace-nowrap",
        category === item ? "text-primary" : "text-black hover:text-primary"
      )}
      onClick={categoryClickHandler}
    >
      {item}
    </button>
  );
}

export default memo(TabItem);
