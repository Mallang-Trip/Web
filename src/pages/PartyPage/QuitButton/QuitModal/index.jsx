import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteQuitParty } from "../../../../api/party";
import Loading from "../../../../components/Loading";

function QuitModal({ showModal, setShowModal, getPartyData }) {
  const modalRef = useRef();
  const { partyId } = useParams();
  const [message, setMessage] = useState("파티를 탈퇴하시겠습니까?");
  const [loading, setLoading] = useState(false);
  const isBeforeQuit = message === "파티를 탈퇴하시겠습니까?";

  const quitParty = async () => {
    if (loading) return;

    try {
      setLoading(true);

      await deleteQuitParty(partyId);

      setTimeout(() => {
        setMessage("파티를 탈퇴하였습니다.");
        setLoading(false);
      }, 3000);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const closeModal = () => {
    if (loading) return;
    if (!isBeforeQuit) getPartyData(true);
    setShowModal(false);
  };

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") closeModal();
    else if (event.key === "Enter") {
      if (isBeforeQuit) quitParty();
      else closeModal();
    }
  };

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    setMessage("파티를 탈퇴하시겠습니까?");
    setLoading(false);

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal]);

  return (
    <div
      className={`modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal ? "active" : ""
      }`}
      ref={modalRef}
      onClick={(e) => modalOutSideClick(e)}
    >
      <div className="m-auto shadow w-96 rounded-xl">
        <div className="flex flex-col justify-center h-64 text-center text-black whitespace-pre bg-white rounded-t-xl">
          {loading ? <Loading /> : message}
        </div>
        {isBeforeQuit ? (
          <div className="flex">
            <button
              className="w-full h-16 text-lg text-center text-darkgray rounded-bl-xl bg-[#F4F4F4]"
              onClick={closeModal}
            >
              취소
            </button>
            <button
              className="w-full h-16 text-lg text-center text-white rounded-br-xl bg-primary"
              onClick={quitParty}
            >
              확인
            </button>
          </div>
        ) : (
          <button
            className="w-full h-16 text-lg text-center text-white rounded-b-xl bg-primary"
            onClick={closeModal}
          >
            확인
          </button>
        )}
      </div>
    </div>
  );
}

export default QuitModal;
