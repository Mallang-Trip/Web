import { Dispatch, memo, SetStateAction, useMemo } from "react";
import PageButton from "./PageButton";
import paginationNext from "../../../assets/svg/pagination.svg";
import clsx from "clsx";

interface Props {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  length: number;
}

function Pagination({ page, setPage, length }: Props) {
  const pivot = useMemo(() => Math.floor(page / 5), [page]);

  return (
    <div className="w-full flex justify-center items-center gap-2.5 mt-12 mb-16">
      <button
        className={clsx("mr-2.5", pivot === 0 ? "hidden" : "block")}
        onClick={() => setPage(pivot * 5 - 1)}
      >
        <img src={paginationNext} alt="다음" className="w-10 h-10 rotate-180" />
      </button>
      {Array.from({ length: 5 }, (_, index) => index).map((item) => (
        <PageButton
          key={item}
          page={page}
          setPage={setPage}
          pivot={pivot}
          index={item}
          length={length}
        />
      ))}
      <button
        className={clsx(
          "ml-2.5",
          (pivot + 1) * 50 > length ? "hidden" : "block"
        )}
        onClick={() => setPage((pivot + 1) * 5)}
      >
        <img src={paginationNext} alt="다음" className="w-10 h-10" />
      </button>
    </div>
  );
}

export default memo(Pagination);
