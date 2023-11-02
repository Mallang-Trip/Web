import Calendar from "react-calendar";
import "./index.css";

function Date({ date, setDate }) {
  return (
    <>
      <div className="pb-3 pl-5 mt-16 mx-auto text-2xl text-black font-bold">
        날짜를 선택해주세요
      </div>
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
          className="border border-white"
        />
      </div>
    </>
  );
}

export default Date;
