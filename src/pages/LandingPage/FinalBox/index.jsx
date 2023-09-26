import React, { useState } from "react";
import PriceModal from "../PriceModal";

function FinalBox() {
  const [showModal, setShowModal] = useState(false);
  const [price, setPrice] = useState(500000);

  return (
    <>
      <div
        className="w-full h-32 my-auto bg-white rounded-r-lg cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <p className="mt-3 mb-5 ml-3 text-gray-500 text-sm md:text-base text-gray">
          가격범위
        </p>
        <p className="text-lg md:text-xl text-center text-black">상관없이</p>
      </div>
      <PriceModal
        showModal={showModal}
        setShowModal={setShowModal}
        price={price}
        setPrice={setPrice}
      />
    </>
  );
}

export default FinalBox;
