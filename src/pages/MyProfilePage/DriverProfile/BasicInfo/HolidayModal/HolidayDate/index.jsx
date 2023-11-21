import Calendar from "react-calendar";
import "../../../../../NewPartyPage/MemberAndDate/Date/index.css";

function HolidayDate({ date, setDate }) {
  return (
    <>
      <h3 className="mb-4 text-xl font-bold text-gray-900">휴일 설정하기</h3>
      <div className="flex justify-center">
        <Calendar
          onChange={(value) =>
            setDate(
              `${value.getFullYear()}-${("0" + (1 + value.getMonth())).slice(
                -2
              )}-${("0" + value.getDate()).slice(-2)}`
            )
          }
          value={date}
          formatDay={(locale, date) =>
            date.toLocaleString("en", { day: "numeric" })
          }
          selectRange={false}
          calendarType="gregory"
          minDate={new Date()}
          className="border border-white"
        />
      </div>
    </>
  );
}

export default HolidayDate;
