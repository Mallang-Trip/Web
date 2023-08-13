import React from "react";
import { useState } from "react";
import Calendar from "react-calendar";
function ReactCalendar({ props }) {
  const [date, setDate] = useState(new Date());

  return (
    <div className="w-full bg-gray-light border border-solid border-gray-main mt-0.5vw p-2.5">
      <div>
        <Calendar
          onChange={setDate}
          value={date}
          formatDay={(locale, date) =>
            date.toLocaleString("en", { day: "numeric" })
          }
          showDoubleView
          selectRange={true}
        />
      </div>
    </div>
  );
}

export default ReactCalendar;
