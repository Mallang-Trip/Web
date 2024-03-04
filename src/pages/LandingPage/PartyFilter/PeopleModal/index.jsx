import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNum } from "../../../../redux/modules/partyFilterSlice";
import minusGray from "../../../../assets/svg/people_minus_gray.svg";
import minusPrimary from "../../../../assets/svg/people_minus_primary.svg";
import plusgray from "../../../../assets/svg/people_plus_gray.svg";
import plusPrimary from "../../../../assets/svg/people_plus_primary.svg";

function PeopleModal({ showModal, setShowModal }) {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const num = useSelector((state) => state.partyFilter.num);
  const [modalNum, setModalNum] = useState(1);

  const setIncrease = () => setModalNum(modalNum + 1);
  const setDecrease = () => setModalNum(modalNum - 1);

  const closeModal = () => {
    dispatch(setNum(modalNum));
    setShowModal(false);
  };

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) setShowModal(false);
  };

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    setModalNum(num);
  }, [showModal]);

  return createPortal(
    <div
      className={`modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal ? "active" : ""
      }`}
      ref={modalRef}
      onClick={(e) => modalOutSideClick(e)}
    >
      <div
        className={`mx-auto mt-auto shadow w-full rounded-xl duration-700 ${
          showModal ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="w-full h-80 text-center bg-white rounded-t-xl relative">
          <div className="absolute top-0 left-0 text-left px-6 pt-5">
            <p className="text-lg font-bold text-black mb-1">참여 인원</p>
            <p className="text-sm font-medium text-boldgray">
              최대 인원은 10명으로 제한됩니다.
            </p>
          </div>
          <button
            type="button"
            className="absolute top-4 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-black rounded-lg text-sm p-1.5 ml-auto inline-flex items-center z-10"
            onClick={() => setShowModal(false)}
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
          <div className="w-full h-full pt-20 flex flex-col justify-end">
            <div className="w-full flex justify-center items-center">
              <button
                className={`w-7 h-7 rounded-full ring-1 flex justify-center items-center ${
                  modalNum === 1
                    ? "bg-lightgray ring-[#BABABA]"
                    : "bg-skyblue ring-primary"
                }`}
                onClick={setDecrease}
                disabled={modalNum === 1}
              >
                <img src={modalNum === 1 ? minusGray : minusPrimary} />
              </button>
              <div
                className={`w-16 h-7 text-center text-2xl leading-7 font-bold ${
                  modalNum === 1 ? "text-gray400" : "text-gray800"
                }`}
              >
                {modalNum}
              </div>
              <button
                className={`w-7 h-7 rounded-full ring-1 flex justify-center items-center ${
                  modalNum === 10
                    ? "bg-lightgray ring-[#BABABA]"
                    : "bg-skyblue ring-primary"
                }`}
                onClick={setIncrease}
                disabled={modalNum === 10}
              >
                <img src={modalNum === 10 ? plusgray : plusPrimary} />
              </button>
            </div>
            <div className="w-full p-5 mt-16">
              <button
                className="w-full h-12 bg-primary text-white text-sm text-bold rounded-lg"
                onClick={closeModal}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default PeopleModal;
