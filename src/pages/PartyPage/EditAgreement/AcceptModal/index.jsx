import { useEffect, useRef, useState } from "react";
import { putProposalAccept } from "../../../../api/party";

function AcceptModal({
  showModal,
  setShowModal,
  getPartyData,
  accept,
  proposalId,
}) {
  const modalRef = useRef();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const acceptHandler = async () => {
    if (loading) return;

    try {
      setLoading(true);

      await putProposalAccept(proposalId, accept);

      if (accept) setMessage("코스 변경 제안이 승인되었습니다.");
      else setMessage("코스 변경 제안이 거절되었습니다.");
      setComplete(true);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    if (complete) getPartyData();

    setShowModal(false);
  };

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") closeModal();
  };

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    setComplete(false);

    if (accept) setMessage("코스 변경 제안을 승인하시겠습니까?");
    else
      setMessage(
        "코스 변경 제안을 거절하시겠습니까?\n\n거절할 경우 제안은 취소되고\n원래 코스대로 복구됩니다."
      );

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
          {message}
        </div>
        {!complete ? (
          <div className="flex">
            <button
              className="w-full h-16 text-lg text-center text-darkgray rounded-bl-xl bg-[#F4F4F4]"
              onClick={closeModal}
            >
              취소
            </button>
            <button
              className="w-full h-16 text-lg text-center text-white rounded-br-xl bg-primary"
              onClick={acceptHandler}
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

export default AcceptModal;
