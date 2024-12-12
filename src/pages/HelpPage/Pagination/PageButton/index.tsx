import { Dispatch, memo, SetStateAction } from "react";
import clsx from "clsx";

interface Props {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  pivot: number;
  index: number;
  length: number;
}

function PageButton({ page, setPage, pivot, index, length }: Props) {
  return (
    <button
      className={clsx(
        "w-10 h-10 text-sm font-bold rounded-full focus:outline-none",
        (5 * pivot + (index + 1)) * 10 > Math.ceil(length / 10) * 10
          ? "hidden"
          : "block",
        page === 5 * pivot + index
          ? "text-white bg-primary"
          : "text-primary bg-skyblue"
      )}
      onClick={() => setPage(5 * pivot + index)}
    >
      {5 * pivot + (index + 1)}
    </button>
  );
}

export default memo(PageButton);
