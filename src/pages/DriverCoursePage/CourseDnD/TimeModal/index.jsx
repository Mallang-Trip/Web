import { useEffect, useRef, useState } from "react";

function TimeModal({ showModal, setShowModal, startTime, setStartTime }) {
  const modalRef = useRef();
  const [hour, setHour] = useState("10");
  const [minute, setMinute] = useState("00");

  const hourHander = (e) => {
    if (e.target.value.length > 2) return;
    const newHour = e.target.value.replace(/\D/g, "");
    if (newHour < 0 || newHour > 24) return;
    setHour(newHour);
  };

  const minuteHander = (e) => {
    if (e.target.value.length > 2) return;
    const newMinute = e.target.value.replace(/\D/g, "");
    if (newMinute < 0 || newMinute >= 60) return;
    setMinute(newMinute);
  };

  const changeHandler = () => {
    setStartTime(
      String(hour).padStart(2, "0") + ":" + String(minute).padStart(2, "0")
    );
    closeModal();
  };

  const closeModal = () => setShowModal(false);

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") closeModal();
  };

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    setHour(startTime.slice(0, 2));
    setMinute(startTime.slice(3));

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
      <div className="m-auto shadow w-96 rounded-xl">
        <div className="flex flex-col justify-center gap-10 h-64 text-center text-black whitespace-pre bg-white rounded-t-xl">
          <p className="text-xl font-bold">출발 시간을 설정해주세요.</p>
          <div className="flex justify-center items-center gap-8">
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="startTime_hour"
                className="border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-14 p-2.5 text-center"
                placeholder="10"
                value={hour}
                onChange={hourHander}
              />
              <span>시</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="startTime_minute"
                className="border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-14 p-2.5 text-center"
                placeholder="00"
                value={minute}
                onChange={minuteHander}
              />
              <span>분</span>
            </div>
          </div>
        </div>
        <div className="flex">
          <button
            className="w-full h-16 text-lg text-center text-darkgray rounded-bl-xl bg-lightgray"
            onClick={closeModal}
          >
            취소
          </button>
          <button
            className="w-full h-16 text-lg text-center text-white rounded-br-xl bg-primary"
            onClick={changeHandler}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default TimeModal;
