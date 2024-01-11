import { useState } from "react";
import QuitModal from "./QuitModal";

function QuitButton({ getPartyData }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex justify-center mt-20">
        <button
          className="h-14 text-white rounded-full text-lg font-bold w-64 md:w-80 bg-primary focus:outline-none"
          onClick={() => setShowModal(true)}
        >
          파티 탈퇴하기
        </button>
      </div>
      <QuitModal
        showModal={showModal}
        setShowModal={setShowModal}
        getPartyData={getPartyData}
      />
    </>
  );
}

export default QuitButton;
