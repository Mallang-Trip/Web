import { Dispatch, memo, SetStateAction, useCallback } from "react";
import Calendar from "react-calendar";
import "@/pages/NewPartyPage/MemberAndDate/PartyDate/index.css";

interface Props {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
}

function HolidayDate({ date, setDate }: Props) {
  const changeHandler = useCallback((value: any) => {
    setDate(
      `${value.getFullYear()}-${("0" + (1 + value.getMonth())).slice(
        -2
      )}-${("0" + value.getDate()).slice(-2)}`
    );
  }, []);

  return (
    <>
      <h3 className="mb-4 text-xl font-bold text-gray-900">휴일 설정하기</h3>
      <div className="flex justify-center">
        <Calendar
          onChange={changeHandler}
          value={date}
          formatDay={(_, date) => date.toLocaleString("en", { day: "numeric" })}
          selectRange={false}
          calendarType="gregory"
          minDate={new Date()}
          className="border border-primary rounded-lg"
        />
      </div>
    </>
  );
}

export default memo(HolidayDate);
