import { Dispatch, SetStateAction, memo } from "react";
import clsx from "clsx";

interface Props {
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
}

const buttonBaseClasses =
  "h-12 border text-sm font-semibold transition-all duration-300";
const buttonActiveClasses = "text-white bg-primary";
const buttonInactiveClasses = "text-primary bg-white";
const borderClasses = "border border-primary";

function DriverTab({ tab, setTab }: Props) {
  return (
    <div className="w-full grid grid-cols-3 rounded-lg">
      <button
        className={clsx(
          buttonBaseClasses,
          borderClasses,
          "rounded-l-lg",
          tab === 0 ? buttonActiveClasses : buttonInactiveClasses
        )}
      >
        예약된 파티
      </button>
      <button
        className={clsx(
          buttonBaseClasses,
          "border-y border-primary",
          tab === 1 ? buttonActiveClasses : buttonInactiveClasses
        )}
        onClick={() => setTab(1)}
      >
        가입된 파티
      </button>
      <button
        className={clsx(
          buttonBaseClasses,
          borderClasses,
          "rounded-r-lg",
          tab === 2 ? buttonActiveClasses : buttonInactiveClasses
        )}
        onClick={() => setTab(2)}
      >
        새로운 파티 승인 대기
      </button>
    </div>
  );
}

export default memo(DriverTab);
