import React, { useEffect, useState } from "react";
import CalendarModal from "./CalendarModal";

function SecondBox() {
  const [showModal, setShowModal] = useState(false);
  const [nowDate, setNowDate] = useState([]);

  return (
    <>
      <div className="w-full h-32 my-auto bg-white cursor-pointer">
        <p className="mt-3 mb-5 ml-3 text-gray-500 text-sm md:text-base text-gray">
          가능한 일정
        </p>
        <p
          className="text-lg md:text-xl text-black text-center"
          onClick={() => setShowModal(true)}
        >
          {nowDate.length
            ? `${nowDate[0].getMonth() + 1}/${nowDate[0].getDate()} ~ ${
                nowDate[1].getMonth() + 1
              }/${nowDate[1].getDate()}`
            : "언제나"}
        </p>
      </div>
      <CalendarModal
        showModal={showModal}
        setShowModal={setShowModal}
        nowDate={nowDate}
        setNowDate={setNowDate}
      />
    </>
  );
}

export default SecondBox;
