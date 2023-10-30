import React from "react";
import ConfirmModal from "../../../ConfirmModal";
import { useState } from "react";
import CheckModal from "../../../CheckModal";
function RoundBtn(props) {
  const [showModal, setShowModal] = useState(false);
  const suggestHandler = () => {
    if (!register) {
      setShakeCredit(true);
      setTimeout(() => setShakeCredit(false), 1000);
      return;
    }
    if (agreeChecked.filter((i) => i === false).length > 0) {
      setShakeAgree(true);
      setTimeout(() => setShakeAgree(false), 1000);
      return;
    }

    setShowModal(true);
  };

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
          {props.name}
        </div>
        <CheckModal
          showModal={showModal}
          setShowModal={setShowModal}
          message={"여행지의 이름을 입력해주세요"}
          noText="취소"
          yesText="확인"
          yesHandler={() => reservationHandler()}
        />
      </div>
    </div>
  );
}

export default RoundBtn;
