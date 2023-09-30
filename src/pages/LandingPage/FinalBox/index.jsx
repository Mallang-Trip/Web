import React, { useState } from "react";
import PriceModal from "../PriceModal";

function FinalBox() {
  const [price, setPrice] = useState(1010000);
  const [showModal, setShowModal] = useState(false);
  const [modalPrice, setModalPrice] = useState(1010000);

  return (
    <>
      <div
        className="w-full h-32 my-auto bg-white rounded-r-lg cursor-pointer"
        onClick={() => {
          setModalPrice(price === "상관없이" ? 1010000 : price);
          setShowModal(true);
        }}
      >
        <p className="mt-3 mb-5 ml-3 text-gray-500 text-sm md:text-base text-gray">
          가격범위
        </p>
        <p className="text-lg md:text-xl text-center text-black">
          {price > 1000000 ? "상관없이" : `~${price / 10000}만원`}
        </p>
        {price <= 1000000 && (
          <p className="text-sm text-center text-darkgray">(1인당)</p>
        )}
      </div>
      <PriceModal
        showModal={showModal}
        setShowModal={setShowModal}
        price={modalPrice}
        setPrice={setModalPrice}
        setFilterPrice={setPrice}
      />
    </>
  );
}

export default FinalBox;
