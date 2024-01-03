import { useState } from "react";
import RegionModal from "./RegionModal";

function FirstBox({ region, setRegion }) {
  const [showModal, setShowModal] = useState(false);

  const regionClickHandler = (target) => {
    setRegion(target);
    setShowModal(false);
  };

  return (
    <>
      <div
        className="w-full h-32 my-auto bg-white rounded-l-lg cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <p className="mt-3 mb-5 ml-2 text-gray-500 text-xs md:text-base text-gray">
          목적지
        </p>
        <p className="text-base md:text-xl text-black text-center">{region}</p>
      </div>
      <RegionModal
        showModal={showModal}
        setShowModal={setShowModal}
        regionClickHandler={regionClickHandler}
      />
    </>
  );
}

export default FirstBox;
