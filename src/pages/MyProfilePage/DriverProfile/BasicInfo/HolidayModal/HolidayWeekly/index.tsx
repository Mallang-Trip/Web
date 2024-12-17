import { Dispatch, memo, SetStateAction } from "react";
import { days } from "@/utils/data";
import DayButton from "./DayButton";

interface Props {
  weekly: string[];
  setWeekly: Dispatch<SetStateAction<string[]>>;
}

function HolidayWeekly({ weekly, setWeekly }: Props) {
  return (
    <>
      <h3 className="mt-12 mb-4 text-xl font-bold text-gray-900">
        정기 휴일 설정하기
      </h3>
      <div className="flex justify-center gap-5">
        {days.map((item) => (
          <DayButton
            key={item.eng}
            weekly={weekly}
            setWeekly={setWeekly}
            {...item}
          />
        ))}
      </div>
    </>
  );
}

export default memo(HolidayWeekly);
