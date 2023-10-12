import React from "react";
import ConfirmModal from "../../../ConfirmModal";
import { useState } from "react";

function RoundBtn(props) {
  const [showValidationModal, setShowValidationModal] = useState(false);
  const onClickHandler = (e) => {
    setShowValidationModal(true);
  };
  return (
    <div
      className="relative text-white bg-primary w-36 h-8 text-sm md:w-48 md:text-lg md:h-10 rounded-3xl hover:bg-sky-700 hover:cursor-pointer"
      onClick={onClickHandler}
    >
      <div className="absolute inset-y-0 left-0 right-0 items-center px-3 md:px-8 pt-2">
        {props.name}
      </div>
      <ConfirmModal
        showModal={showValidationModal}
        setShowModal={setShowValidationModal}
      />
    </div>
  );
}

export default RoundBtn;
