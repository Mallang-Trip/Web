import { useState } from "react";
import Plus from "../../../../assets/svg/plus.svg";
import NewTalkModal from "./NewTalkModal";

function NewTalkButton({ getChatListFunc, setOpenTalkId }) {
  const [showNewTalkModal, setShowNewTalkModal] = useState(false);

  return (
    <>
      <button
        type="button"
        className="animate-bounce flex items-center justify-center absolute bottom-40 md:bottom-28 right-8 bg-primary rounded-full w-14 h-14 focus:outline-none"
        onClick={() => setShowNewTalkModal(true)}
      >
        <img src={Plus} alt="new_party" className="w-9 h-9" />
      </button>

      <NewTalkModal
        showModal={showNewTalkModal}
        setShowModal={setShowNewTalkModal}
        getChatListFunc={getChatListFunc}
        setOpenTalkId={setOpenTalkId}
      />
    </>
  );
}

export default NewTalkButton;
