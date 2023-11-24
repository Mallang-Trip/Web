import DayButton from "./DayButton";
import { days } from "../../../../../../utils/data";

function HolidayWeekly({ weekly, setWeekly }) {
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

export default HolidayWeekly;
