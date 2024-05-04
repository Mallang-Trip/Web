import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { basicProfileImage } from "../../../../global";

function ReceiptModal({ showModal, setShowModal, receiptInfo }) {
  const modalRef = useRef();

  const closeModal = () => setShowModal(false);

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") closeModal();
  };

  useEffect(() => {
    if (!showModal) {
      return document.body.classList.remove("overflow-hidden");
    }
    document.body.classList.add("overflow-hidden");

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal]);

  return createPortal(
    <div
      className={`modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal ? "active" : ""
      }`}
      ref={modalRef}
      onClick={(e) => modalOutSideClick(e)}
    >
      <div className="mx-auto w-96 h-full rounded-xl flex flex-col justify-center items-center">
        <div className="w-full flex flex-col h-3/5 px-6 bg-white rounded-t-xl">
          <div className="my-8 text-xl text-gray900 font-bold text-center">
            영수증 목록
          </div>
          <div>
            <p className="mb-3 text-lg text-gray500 font-semibold">
              드라이버 정보
            </p>
            <div className="flex justify-between items-center gap-2">
              <div className="w-60 h-14 px-3 flex items-center gap-3 border border-mediumgray rounded-lg">
                <img
                  src={basicProfileImage}
                  alt="profile"
                  className="w-9 h-9 rounded-full"
                />
                <p className="text-sm text-black font-medium">
                  {receiptInfo.driverName} 드라이버
                </p>
              </div>
              <button
                className="w-24 h-14 text-sm text-darkgray font-bold bg-white border border-mediumgray rounded-lg"
                onClick={() => alert("송금증 개발 X")}
              >
                송금증
              </button>
            </div>
          </div>
          <div className="mt-10">
            <p className="mb-3 text-lg text-gray500 font-semibold">
              여행자 정보
            </p>
            <div className="h-64 flex flex-col gap-2 overflow-auto noScrollBar">
              {receiptInfo.partyMembers.map((member) => (
                <div
                  key={member.userId}
                  className="flex justify-between items-center gap-2"
                >
                  <div className="w-60 h-14 px-3 flex items-center gap-3 border border-mediumgray rounded-lg">
                    <img
                      src={basicProfileImage}
                      alt="profile"
                      className="w-9 h-9 rounded-full"
                    />
                    <p className="text-sm text-black font-medium">
                      {member.nickname}
                    </p>
                  </div>
                  <button
                    className={`w-24 h-14 text-sm font-bold border rounded-lg ${member.reservationStatus === "PAYMENT_COMPLETE" ? "text-darkgray bg-white border-mediumgray" : "text-[#FF0000] bg-[#FFEAEA] border-[#FFEAEA]"}`}
                    disabled={member.reservationStatus !== "PAYMENT_COMPLETE"}
                    onClick={() => {
                      const newWindow = window.open(
                        member.receiptUrl,
                        "_blank",
                        "noopener,noreferrer"
                      );
                      if (newWindow) newWindow.opener = null;
                    }}
                  >
                    {member.reservationStatus === "PAYMENT_COMPLETE"
                      ? "영수증"
                      : "결제 실패"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          className="w-full h-16 text-lg text-center text-white rounded-b-xl bg-primary"
          onClick={closeModal}
        >
          닫기
        </button>
      </div>
    </div>,
    document.body
  );
}

export default ReceiptModal;
