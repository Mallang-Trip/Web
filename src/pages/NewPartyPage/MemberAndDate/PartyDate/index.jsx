import Calendar from "react-calendar";
import "./index.css";

function PartyDate({ date, setDate }) {
  const today = new Date();
  const tomorrow = new Date(today);
  const after_4_month = new Date(today);
  after_4_month.setMonth(after_4_month.getMonth() + 4);
  tomorrow.setDate(today.getDate() + 1);

  return (
    <>
      <div className="pl-6 mt-16 mb-7 mx-auto text-2xl text-black font-bold">
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
          minDate={tomorrow}
          maxDate={after_4_month}
          selectRange={false}
          calendarType="gregory"
          className="border border-primary rounded-lg"
        />
      </div>
    </>
  );
}

export default PartyDate;
