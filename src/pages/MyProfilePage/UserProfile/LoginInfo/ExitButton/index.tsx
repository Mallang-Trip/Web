import { memo, useState } from "react";
import ExitModal from "./ExitModal";

function ExitButton() {
  const [showExitModal, setShowExitModal] = useState(false);

  return (
    <>
      <button
        className="w-36 px-4 py-3 text-sm text-[#ff0000] bg-[#FFEAEA] rounded-xl border border-[#ff0000] focus:outline-none"
        onClick={() => setShowExitModal(true)}
      >
        회원 탈퇴
      </button>
      <ExitModal showModal={showExitModal} setShowModal={setShowExitModal} />
    </>
  );
}

export default memo(ExitButton);
