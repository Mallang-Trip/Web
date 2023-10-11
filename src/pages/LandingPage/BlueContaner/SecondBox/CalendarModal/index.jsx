import React, { useRef, useState } from "react";
import Calendar from "react-calendar";
import "./index.css";

function CalendarModal({ showModal, setShowModal, nowDate, setNowDate }) {
  const modalRef = useRef();
  const [date, setDate] = useState(nowDate);

  const modalOutSideClick = (e) => {
    if (modalRef.current !== e.target) return;
    setDate([]);
    setShowModal(false);
  };

  const confirmHandler = () => {
    setNowDate(date);
    setShowModal(false);
  };

  return (
    <div
      className={`modal-container fixed top-0 left-0 z-50 w-screen h-screen bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal ? "active" : ""
      }`}
      ref={modalRef}
      onClick={(e) => modalOutSideClick(e)}
    >
      <div className="mx-auto my-auto rounded-xl bg-white p-5">
        <Calendar
          onChange={setDate}
          value={date}
          formatDay={(locale, date) =>
            date.toLocaleString("en", { day: "numeric" })
          }
          selectRange={true}
          calendarType="gregory"
          className="border border-white"
        />
        <div className="flex justify-center mt-5">
          <button
            className="bg-primary rounded-full text-white w-20 h-9"
            onClick={confirmHandler}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default CalendarModal;
