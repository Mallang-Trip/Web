import { Dispatch, memo, SetStateAction, useCallback } from "react";
import clsx from "clsx";

interface Props {
  weekly: string[];
  setWeekly: Dispatch<SetStateAction<string[]>>;
  eng: string;
  kor: string;
}

function DayButton({ weekly, setWeekly, eng, kor }: Props) {
  const clickHandler = useCallback(() => {
    let newWeekly = [...weekly];

    if (weekly.includes(eng)) {
      newWeekly = newWeekly.filter((item) => item !== eng);
      setWeekly(newWeekly);
    } else {
      newWeekly.push(eng);
      setWeekly(newWeekly);
    }
  }, [weekly, eng]);

  return (
    <button
      className={clsx(
        "w-10 h-10 rounded-full focus:outline-none",
        weekly.includes(eng)
          ? "bg-skyblue text-primary"
          : "bg-lightgray text-darkgray"
      )}
      onClick={clickHandler}
    >
      {kor}
    </button>
  );
}

export default memo(DayButton);
