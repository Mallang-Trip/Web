import { useState } from "react";
import ConfirmModal from "../../../components/ConfirmModal";

function RoundBtn({ name, onClick }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="text-white bg-primary h-8 text-sm md:w-48 md:text-lg md:h-10 rounded-3xl hover:bg-sky-700"
        onClick={() => onClick()}
      >
        {name}
      </button>
      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={"no"}
      />
    </>
  );
}

export default RoundBtn;
