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
        <div className="grid grid-cols-2 gap-10 px-6 mx-auto py-8 md:grid-cols-3 h-full bg-white rounded-t-xl max-h-[600px] overflow-auto noScrollBar">
          {regionData.map((item) => (
            <RegionButton
              key={item.name}
              regionClickHandler={regionClickHandler}
              {...item}
            />
          ))}
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
