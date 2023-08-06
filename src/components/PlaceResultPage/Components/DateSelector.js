import React from "react";
import ReactCalendar from "../Atoms/ReactCalendar";
import { useEffect, useState } from "react";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
function DateSelector(props) {
  const { first, last } = props;

  const [open, setOpen] = useState(0);
  const [print, setPrint] = useState("");

  const toggleHandler = () => {
    setOpen((open) => !open);
  };

  const dateFormatter = (date) => {
    let format =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      (date.getDate() + 1);
    return format;
  };

  first(dateFormatter(new Date(print[0])));
  last(dateFormatter(new Date(print[1])));

  return (
    <div>
      <div className="w-full h-12 bg-gray-light border border-solid border-gray-main flex items-center justify-between px-0.8vw">
        <div className="flex gap-x-5 items-center">
          <CalendarMonthIcon className="scale-125" />
          {print.length > 0 ? (
            <p>
              <span>{print[0].toDateString()}</span>
              &nbsp;~&nbsp;
              <span>{print[1].toDateString()}</span>
            </p>
          ) : (
            ""
          )}
        </div>
        {open ? (
          <ExpandLessIcon className="scale-125" onClick={toggleHandler} />
        ) : (
          <ExpandMoreIcon className="scale-125" onClick={toggleHandler} />
        )}
      </div>
      {open ? (
        <div className="flex">
          <ReactCalendar props={setPrint} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default DateSelector;
