import { useState } from "react";
import { useSelector } from "react-redux";
import PriceModal from "./PriceModal";

function PriceFilter() {
  const price = useSelector((state) => state.partyFilter.price);
  const [showModal, setShowModal] = useState(false);
  const [modalPrice, setModalPrice] = useState(1010000);

  return (
    <>
      <div
        className="w-full h-32 my-auto bg-white rounded-r-lg cursor-pointer"
        onClick={() => {
          setModalPrice(price === "모든 가격" ? 1010000 : price);
          setShowModal(true);
        }}
      >
        <p className="mt-3 mb-5 ml-2 text-gray-500 text-base text-gray">
          가격범위
        </p>
        <p className="text-xl text-center text-black">
          {price > 1000000 ? "모든 가격" : `~${price / 10000}만원`}
        </p>
        {price <= 1000000 && (
          <p className="text-sm text-center text-darkgray">(1인당)</p>
        )}
      </div>
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
