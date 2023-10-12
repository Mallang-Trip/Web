import React from "react";
import ConfirmModal from "../../../ConfirmModal";
import { useState } from "react";

function RoundBtn(props) {
  const [showValidationModal, setShowValidationModal] = useState(false);
  const onClickHandler = (e) => {
    setShowValidationModal(true);
  };
  return (
    <div className="absolute top-0 left-0 pr-18 flex justify-center ">
      <div
        className="relative text-white bg-primary w-36 h-8 text-sm md:w-48 md:text-lg md:h-10 rounded-3xl hover:cursor-pointer hover:bg-sky-700"
        onClick={onClickHandler}
      >
        <div className="absolute inset-y-0 left-0 right-0 items-center pl-5 md:px-8 pt-2">
          {props.name}
        </div>
        <ConfirmModal
          showModal={showValidationModal}
          setShowModal={setShowValidationModal}
          Message={""}
        />
      </div>
    </div>
  );
}

export default RoundBtn;
