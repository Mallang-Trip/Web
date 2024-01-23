import { useState } from "react";
import CancelModal from "./CancelModal";

function CancelNewPartyButton({ isDriver }) {
  const [showModal, setShowModal] = useState(false);

  if (isDriver) return null;
  return (
    <>
      <div className="flex justify-center mt-20">
        <button
          className="h-14 text-white rounded-full text-lg font-bold w-64 md:w-80 bg-primary focus:outline-none"
          onClick={() => setShowModal(true)}
        >
          가입 제안 취소하기
        </button>
      </div>
      <CancelModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}

export default CancelNewPartyButton;
