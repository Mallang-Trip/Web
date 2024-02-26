import { useState } from "react";
import { useSelector } from "react-redux";
import CalendarModal from "./CalendarModal";

function DateFilter() {
  const nowDate = useSelector((state) => state.partyFilter.nowDate);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="w-full h-32 my-auto bg-white cursor-pointer">
        <p className="mt-3 mb-5 ml-2 text-gray-500 text-base text-gray">
          가능한 일정
        </p>
        <p
          className="text-xl text-black text-center"
          onClick={() => setShowModal(true)}
        >
          {nowDate.length
            ? `${nowDate[0].getMonth() + 1}/${nowDate[0].getDate()} ~ ${
                nowDate[1].getMonth() + 1
              }/${nowDate[1].getDate()}`
            : "모든 일정"}
        </p>
      </div>
      <CalendarModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}

export default DateFilter;
