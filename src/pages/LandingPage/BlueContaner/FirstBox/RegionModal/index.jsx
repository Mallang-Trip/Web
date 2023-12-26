import { useEffect, useRef } from "react";
import Anywhere from "./Anywhere";
import RegionButton from "./RegionButton";
import jeju from "../../../../../assets/images/제주도 이미지.jpg";
import gangwon from "../../../../../assets/images/강원도 이미지.jpg";
import uleng from "../../../../../assets/images/울릉도 이미지.jpg";

const regionData = [
  {
    image: jeju,
    name: "제주도",
    price: "9시간 18만원",
  },
  {
    image: gangwon,
    name: "강원도",
    price: "10시간 20만원",
  },
  {
    image: uleng,
    name: "울릉도",
    price: "가격 변동제",
  },
];

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
      className={`modal-container fixed top-0 left-0 z-50 w-screen h-screen bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal ? "active" : ""
      }`}
      ref={modalRef}
      onClick={(e) => modalOutSideClick(e)}
    >
      <div className="m-auto shadow w-4/5 lg:w-full max-h-4/5 max-w-screen-xl rounded-xl">
        <div className="grid grid-cols-2 gap-10 px-6 mx-auto py-8 md:grid-cols-3 lg:grid-cols-4 h-full bg-white rounded-xl overflow-auto noScrollBar">
          <Anywhere regionClickHandler={regionClickHandler} />
          {regionData.map((item) => (
            <RegionButton
              key={item.image}
              {...item}
              regionClickHandler={regionClickHandler}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RegionModal;
