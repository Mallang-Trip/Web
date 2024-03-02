import { useState } from "react";
import { useSelector } from "react-redux";
import PriceModal from "./PriceModal";

function PriceFilter() {
  const price = useSelector((state) => state.partyFilter.price);
  const [showModal, setShowModal] = useState(false);
  const [modalPrice, setModalPrice] = useState(1010000);

  return (
    <>
      <button
        className="w-full h-full px-8 py-6 flex flex-col justify-between rounded-l-3xl"
        onClick={() => {
          setModalPrice(price === "모든 가격" ? 1010000 : price);
          setShowModal(true);
        }}
      >
        <p className="text-base leading-5 text-gray700 font-medium">
          1인당 가격 범위
        </p>
        <p
          className={`text-2xl leading-7 font-bold ${
            price > 1000000 ? "text-gray400" : "text-gray800"
          }`}
        >
          {price > 1000000 ? "모든 가격" : `~${price / 10000}만원`}
        </p>
      </button>
      <PriceModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalPrice={modalPrice}
        setModalPrice={setModalPrice}
      />
    </>
  );
}

export default PriceFilter;
