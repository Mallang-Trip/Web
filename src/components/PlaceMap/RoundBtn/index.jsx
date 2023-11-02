import React from "react";
import ConfirmModal from "../../../components/ConfirmModal";
import { useState } from "react";

function RoundBtn({ name }) {
  const [showModal, setShowModal] = useState(false);

  const onClickHandler = (e) => {
    setShowModal(true);
  };

  return (
    <div className="absolute top-0 left-0 pr-18 flex justify-center ">
      <div
        className="relative text-white bg-primary w-36 h-8 text-sm md:w-48 md:text-lg md:h-10 rounded-3xl hover:cursor-pointer hover:bg-sky-700"
        onClick={onClickHandler}
      >
        <div className="absolute inset-y-0 left-0 right-0 items-center pl-5 md:px-8 pt-2">
          {name}
        </div>
      </div>
      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={"no"}
      />
    </div>
  );
}

export default RoundBtn;
