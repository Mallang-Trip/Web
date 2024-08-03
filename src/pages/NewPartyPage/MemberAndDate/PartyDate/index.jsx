import { useEffect } from "react";
import Calendar from "react-calendar";
import "./index.css";

function PartyDate({ date, setDate }) {
  const today = new Date();
  const after_2_day = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);
  const after_4_month = new Date(today);
  after_4_month.setMonth(today.getMonth() + 4);

  return (
    <>
      <div className="pl-6 mt-16 mb-7 mx-auto text-2xl text-black font-bold">
        날짜를 선택해주세요
      </div>
      <div className="grid gap-1 justify-center">
        <Calendar
          onChange={(value) => {
            setDate(
              `${value.getFullYear()}-${("0" + (1 + value.getMonth())).slice(
                -2
              )}-${("0" + value.getDate()).slice(-2)}`
            );
          }}
          value={date}
          formatDay={(locale, date) =>
            date.toLocaleString("en", { day: "numeric" })
          }
          minDate={after_2_day}
          maxDate={after_4_month}
          selectRange={false}
          calendarType="gregory"
          className="border border-primary rounded-lg"
        />
        <p className="text-xs">
          * 당일 또는 하루 전의 파티 일정은 선택할 수 없습니다.
        </p>
      </div>
    </>
  );
}

export default PartyDate;
