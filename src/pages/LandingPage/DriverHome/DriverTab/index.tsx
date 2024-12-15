import { Dispatch, memo, SetStateAction } from "react";
import clsx from "clsx";

interface Props {
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
}

function DriverTab({ tab, setTab }: Props) {
  return (
    <div className="w-full grid grid-cols-3 rounded-lg">
      <button
        className={clsx(
          "h-12 rounded-l-lg border border-primary text-sm font-semibold transition-all duration-300",
          tab === 0 ? "text-white bg-primary" : "text-primary bg-white"
        )}
        onClick={() => setTab(0)}
      >
        예약된 파티
      </button>
      <button
        className={clsx(
          "h-12 border-y border-primary text-sm font-semibold transition-all duration-300",
          tab === 1 ? "text-white bg-primary" : "text-primary bg-white"
        )}
        onClick={() => setTab(1)}
      >
        가입된 파티
      </button>
      <button
        className={clsx(
          "h-12 rounded-r-lg border border-primary text-sm font-semibold transition-all duration-300",
          tab === 2 ? "text-white bg-primary" : "text-primary bg-white"
        )}
        onClick={() => setTab(2)}
      >
        새로운 파티 승인 대기
      </button>
    </div>
  );
}

export default memo(DriverTab);
