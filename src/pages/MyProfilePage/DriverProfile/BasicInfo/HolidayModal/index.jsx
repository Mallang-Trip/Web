import { useEffect, useRef, useState } from "react";
import HolidayDate from "./HolidayDate";
import HolidayWeekly from "./HolidayWeekly";

function HolidayModal({ showModal, setShowModal, driverInfo, setDriverInfo }) {
  const modalRef = useRef();
  const confirmButtonRef = useRef();
  const [date, setDate] = useState();
  const [weekly, setWeekly] = useState([]);

  const cancelHandler = () => setShowModal(false);

  const confirmHandler = () => {
    const newHolidays = date
      ? [...driverInfo.holidays, date]
      : driverInfo.holidays;
    setDriverInfo({
      ...driverInfo,
      holidays: newHolidays,
      weeklyHoliday: weekly,
    });
    setShowModal(false);
  };

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) cancelHandler();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") cancelHandler();
    else if (event.key === "Enter") confirmButtonRef.current.click();
  };

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    setWeekly([...driverInfo.weeklyHoliday]);

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal]);

  return (
    <div
      className={`modal-container fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal && "active"
      }`}
      ref={modalRef}
      onClick={(e) => modalOutSideClick(e)}
    >
      <div className="relative w-full max-w-4xl max-h-full m-auto">
        <div className="relative bg-white rounded-t-lg">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={() => {
              setShowModal(false);
            }}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <HolidayDate date={date} setDate={setDate} />
            <HolidayWeekly weekly={weekly} setWeekly={setWeekly} />
          </div>
        </div>
        <div className="flex">
          <button
            className="w-full h-16 text-lg text-center text-darkgray rounded-bl-lg bg-lightgray"
            onClick={cancelHandler}
          >
            취소
          </button>
          <button
            className="w-full h-16 text-lg text-center text-white rounded-br-lg bg-primary"
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

export default HolidayModal;
