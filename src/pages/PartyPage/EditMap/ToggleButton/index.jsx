import { useState } from "react";
import ConfirmModal from "../../../../components/ConfirmModal";

function ToggleButton({ showSearchMap, setShowSearchMap, canToggle }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="mt-14 mb-7 w-72 mx-auto flex justify-between border border-primary rounded-full relative">
        <button
          className={`w-36 py-3 text-center text-sm transform duration-700 ${
            showSearchMap ? "text-white" : "text-darkgray"
          }`}
          onClick={() => {
            if (!canToggle) return setShowModal(true);
            setShowSearchMap(true);
          }}
        >
          여행지 검색
        </button>
        <button
          className={`w-36 py-3 text-center text-sm transform duration-700 ${
            showSearchMap ? "text-darkgray" : "text-white"
          }`}
          onClick={() => {
            if (!canToggle) return setShowModal(true);
            setShowSearchMap(false);
          }}
        >
          여행 코스
        </button>
        <div
          className={`w-36 h-full absolute top-0 left-0 -z-10 bg-primary rounded-full transform duration-700 ${
            showSearchMap ? "translate-x-0" : "translate-x-36"
          }`}
        />
      </div>
      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={"여행지를 추가해주세요."}
      />
    </>
  );
}

export default ToggleButton;
