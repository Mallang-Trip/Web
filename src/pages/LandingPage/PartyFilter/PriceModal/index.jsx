import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { setPrice } from "../../../../redux/modules/partyFilterSlice";
import { priceToString } from "../../../../utils";

function PriceModal({ showModal, setShowModal, modalPrice, setModalPrice }) {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const buttonRef = useRef();

  const closeModal = () => {
    dispatch(setPrice(modalPrice));
    setShowModal(false);
  };

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) setShowModal(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") setShowModal(false);
    else if (event.key === "Enter") buttonRef.current.click();
  };

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal]);

  return createPortal(
    <div
      className={`modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal ? "active" : ""
      }`}
      ref={modalRef}
      onClick={(e) => modalOutSideClick(e)}
    >
      <div className="m-auto shadow w-96 rounded-xl">
        <div className="flex flex-col gap-10 justify-center h-64 text-center bg-white rounded-t-xl relative">
          <div className="text-xl font-bold text-black">1인당 가격 범위</div>
          <button
            type="button"
            className="absolute top-4 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-black rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
          <div className="px-12">
            <div className="w-full h-6 relative flex items-center mb-1.5">
              <div className="w-full h-2 rounded-full bg-mediumgray relative">
                <div
                  className="h-2 rounded-full bg-primary absolute top-0 left-0"
                  style={{ width: `${modalPrice / 10100}%` }}
                />
              </div>
              <input
                className="absolute w-full h-6 bg-transparent slider z-20 top-0 left-0 focus:outline-none"
                type="range"
                min={0}
                max={1010000}
                step={10000}
                name="modalPrice"
                value={modalPrice}
                onChange={(e) => setModalPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="text-xl text-primary">
            {modalPrice > 1000000
              ? "모든 가격"
              : `최대 ${modalPrice / 10000}만원`}
          </div>
        </div>
        <button
          className="w-full h-16 text-lg text-center text-white rounded-b-xl bg-primary"
          onClick={closeModal}
          ref={buttonRef}
        >
          확인
        </button>
      </div>
    </div>,
    document.body
  );
}

export default PriceModal;
