import { useState } from "react";
import { useSelector } from "react-redux";
import ConfirmModal from "../../../../../../components/ConfirmModal";

function PartyToggle({ type, openTalkId, setRoomId }) {
  const publicRoomId = useSelector((state) => state.talkRoom.publicRoomId);
  const [showModal, setShowModal] = useState(false);

  const toggleHandler = (isPrivate) => {
    if (publicRoomId === null && isPrivate) return setShowModal(true);
    if (publicRoomId === null && !isPrivate) return;

    if (isPrivate) setRoomId(openTalkId);
    else setRoomId(publicRoomId);
  };

  if (type.slice(0, 5) !== "PARTY") return null;
  return (
    <>
      <div className="mt-4 w-72 mx-auto flex justify-between border border-primary rounded-full relative">
        <button
          className={`w-36 py-3 text-center text-sm transform duration-700 ${
            type === "PARTY_PRIVATE" ? "text-white" : "text-darkgray"
          }`}
          onClick={() => toggleHandler(true)}
        >
          파티 전용방
        </button>
        <button
          className={`w-36 py-3 text-center text-sm transform duration-700 ${
            type === "PARTY_PRIVATE" ? "text-darkgray" : "text-white"
          }`}
          onClick={() => toggleHandler(false)}
        >
          파티 공개방
        </button>
        <div
          className={`w-36 h-full absolute top-0 left-0 -z-10 bg-primary rounded-full transform duration-700 ${
            type === "PARTY_PRIVATE" ? "translate-x-0" : "translate-x-36"
          }`}
        />
      </div>

      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={
          "파티 전용방은 파티원만 접근 가능합니다.\n파티에 먼저 가입해주세요."
        }
      />
    </>
  );
}

export default PartyToggle;
