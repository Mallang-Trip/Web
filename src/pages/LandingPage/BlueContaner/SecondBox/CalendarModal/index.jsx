import { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "./index.css";

function CalendarModal({ showModal, setShowModal, nowDate, setNowDate }) {
  const modalRef = useRef();
  const confirmButtonRef = useRef();
  const [date, setDate] = useState(nowDate);

  const closeModal = () => setShowModal(false);

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };

  const allDateHandler = () => {
    setDate([]);
    setNowDate([]);
    setShowModal(false);
  };

  const confirmHandler = () => {
    setNowDate(date);
    setShowModal(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") closeModal();
    else if (event.key === "Enter") confirmButtonRef.current.click();
  };

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    setDate(nowDate);

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal]);

  return (
    <div
      className={`modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal ? "active" : ""
      }`}
      ref={modalRef}
      onClick={(e) => modalOutSideClick(e)}
    >
      <div className="mx-auto my-auto rounded-xl bg-white">
        <Calendar
          onChange={setDate}
          value={date}
          formatDay={(locale, date) =>
            date.toLocaleString("en", { day: "numeric" })
          }
          selectRange={true}
          calendarType="gregory"
          className="border border-white rounded-t-xl"
        />
        <div className="flex">
          <button
            className="w-full h-16 text-lg text-center text-darkgray rounded-bl-xl bg-lightgray"
            onClick={allDateHandler}
          >
            모든 일정
          </button>
          <button
            className="w-full h-16 text-lg text-center text-white rounded-br-xl bg-primary"
            onClick={confirmHandler}
            ref={confirmButtonRef}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default CalendarModal;
