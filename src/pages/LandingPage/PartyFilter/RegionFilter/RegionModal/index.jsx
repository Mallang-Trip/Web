import { useEffect, useRef } from "react";
import { regionData } from "../../../../../utils/data";
import RegionButton from "./RegionButton";

function RegionModal({ showModal, setShowModal, regionClickHandler }) {
  const modalRef = useRef();

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
      <div className="m-auto shadow w-full max-w-[700px] rounded-xl">
        <div className="h-full bg-white rounded-t-xl max-h-[600px] relative">
          <p className="text-xl font-bold text-black px-6 py-5">
            목적지를 선택해주세요.
          </p>
          <button
            type="button"
            className="absolute top-4 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-black rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={closeModal}
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
          <div className="grid grid-cols-2 gap-8 px-6 mx-auto pb-8 md:grid-cols-3 overflow-auto noScrollBar">
            {regionData.map((item) => (
              <RegionButton
                key={item.name}
                regionClickHandler={regionClickHandler}
                {...item}
              />
            ))}
          </div>
        </div>
        <button
          className="w-full h-16 text-lg text-center text-white rounded-b-xl bg-primary"
          onClick={() => regionClickHandler("모든 지역")}
        >
          모든 지역
        </button>
      </div>
    </div>
  );
}

export default RegionModal;
