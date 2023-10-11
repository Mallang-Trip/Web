import { useRef } from "react";
import { priceToString } from "../../../../../utils";

function PriceModal({
  showModal,
  setShowModal,
  price,
  setPrice,
  setFilterPrice,
}) {
  const modalRef = useRef();

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) setShowModal(false);
  };

  const closeModal = () => {
    setFilterPrice(price);
    document.body.classList.remove("overflow-hidden");
    setShowModal(false);
  };

  return (
    <div
      className={`modal-container fixed top-0 left-0 z-50 w-screen h-screen bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal ? "active" : ""
      }`}
      ref={modalRef}
      onClick={(e) => modalOutSideClick(e)}
    >
      <div className="m-auto shadow w-96 rounded-xl">
        <div className="flex flex-col gap-10 justify-center h-64 text-center bg-white rounded-t-xl">
          <div className="text-xl text-black">1인당 가격범위 설정</div>
          <div className="px-12">
            <div className="w-full h-6 relative flex items-center mb-1.5">
              <div className="w-full h-2 rounded-full bg-[#d9d9d9] relative">
                <div
                  className="h-2 rounded-full bg-primary absolute top-0 left-0"
                  style={{ width: `${price / 10100}%` }}
                />
              </div>
              <input
                className="absolute w-full h-6 bg-transparent slider z-20 top-0 left-0"
                type="range"
                min={0}
                max={1010000}
                step={10000}
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="text-xl text-primary">{`최고 금액: ${
            price > 1000000 ? "상관없이" : priceToString(price) + "원"
          }`}</div>
        </div>
        <button
          className="w-full h-16 text-lg text-center text-white rounded-b-xl bg-primary"
          onClick={closeModal}
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default PriceModal;
