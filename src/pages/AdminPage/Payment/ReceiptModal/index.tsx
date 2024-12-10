import {
  Dispatch,
  memo,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { CONSTANT } from "../../../../utils/data";
import { priceToString } from "../../../../utils";
import { ReceiptInfo } from "..";
import {
  driverPenaltyBefore,
  driverPenaltyComplete,
} from "../../../../api/admin";
import CheckModal from "../../../../components/CheckModal";
import clsx from "clsx";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  receiptInfo: ReceiptInfo;
  setReceiptInfo: Dispatch<SetStateAction<ReceiptInfo>>;
  getPaymentListFunc: () => void;
}

function ReceiptModal({
  showModal,
  setShowModal,
  receiptInfo,
  setReceiptInfo,
  getPaymentListFunc,
}: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [showDriverPenaltyModal, setShowDriverPenaltyModal] = useState(false);

  const driverPenaltyCompleteFunc = useCallback(async () => {
    try {
      receiptInfo.driverPenaltyStatus === "PENALTY_PAYMENT_COMPLETE"
        ? await driverPenaltyBefore(receiptInfo.partyId)
        : await driverPenaltyComplete(receiptInfo.partyId);
      setShowDriverPenaltyModal(false);
      setReceiptInfo({
        ...receiptInfo,
        driverPenaltyStatus:
          receiptInfo.driverPenaltyStatus === "PENALTY_PAYMENT_COMPLETE"
            ? "PENALTY_EXISTS"
            : "PENALTY_PAYMENT_COMPLETE",
      });
      getPaymentListFunc();
    } catch (e) {
      console.log(e);
      alert("서버 오류 발생");
    }
  }, [receiptInfo, getPaymentListFunc]);

  const closeModal = useCallback(() => setShowModal(false), []);

  const modalOutSideClick = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current === event.target) closeModal();
    },
    [modalRef]
  );

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") closeModal();
  }, []);

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
    <>
      <div
        className={clsx(
          "modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex",
          showModal && "active"
        )}
        ref={modalRef}
        onClick={modalOutSideClick}
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
              <div className="flex justify-between items-center gap-2 pr-2">
                <div className="w-60 h-14 px-3 flex items-center gap-3 border border-mediumgray rounded-lg">
                  <img
                    src={
                      receiptInfo.driverProfileImg ||
                      CONSTANT.BASE_PROFILE_IMAGE
                    }
                    alt="profile"
                    className="w-9 h-9 rounded-full"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-sm text-black font-medium">
                      {receiptInfo.driverName} 드라이버
                    </p>
                    {receiptInfo.driverPenaltyAmount && (
                      <p
                        className={clsx(
                          "text-xs font-medium",
                          receiptInfo.driverPenaltyStatus ===
                            "PENALTY_PAYMENT_COMPLETE"
                            ? "text-primary"
                            : "text-[#FF0000]"
                        )}
                      >
                        {`${priceToString(receiptInfo.driverPenaltyAmount)}원 위약금 ${receiptInfo.driverPenaltyStatus === "PENALTY_PAYMENT_COMPLETE" ? "지불 완료" : "발생"}`}
                      </p>
                    )}
                  </div>
                </div>
                {receiptInfo.driverPenaltyAmount ? (
                  <button
                    className={clsx(
                      "w-24 h-14 text-sm font-bold border rounded-lg",
                      receiptInfo.driverPenaltyStatus ===
                        "PENALTY_PAYMENT_COMPLETE"
                        ? "text-darkgray bg-white border-mediumgray"
                        : "text-[#FF0000] bg-white border-[#FF0000]"
                    )}
                    onClick={() => setShowDriverPenaltyModal(true)}
                  >
                    {receiptInfo.driverPenaltyStatus ===
                    "PENALTY_PAYMENT_COMPLETE"
                      ? "지불 완료"
                      : "지불 필요"}
                  </button>
                ) : (
                  <button
                    className="w-24 h-14 text-sm text-darkgray font-bold bg-white border border-mediumgray rounded-lg"
                    onClick={() => alert("송금증 개발 X")}
                  >
                    송금증
                  </button>
                )}
              </div>
            </div>
            <div className="mt-10">
              <p className="mb-3 text-lg text-gray500 font-semibold">
                여행자 정보
              </p>
              <div className="h-64 flex flex-col gap-2 custom-scrollbar">
                {receiptInfo.partyMembers.map((member) => (
                  <div
                    key={member.userId}
                    className="flex justify-between items-center gap-2"
                  >
                    <div className="w-60 h-14 px-3 flex items-center gap-3 border border-mediumgray rounded-lg">
                      <img
                        src={member.profileImg || CONSTANT.BASE_PROFILE_IMAGE}
                        alt="profile"
                        className="w-9 h-9 rounded-full"
                      />
                      <p className="text-sm text-black font-medium">
                        {member.nickname}
                      </p>
                    </div>
                    <button
                      className={clsx(
                        "w-24 h-14 text-sm font-bold border rounded-lg",
                        receiptInfo.status === "CANCELED_BY_ALL_QUIT" ||
                          receiptInfo.status === "CANCELED_BY_DRIVER_QUIT"
                          ? "text-primary bg-skyblue border-skyblue"
                          : member.reservationStatus === "PAYMENT_COMPLETE"
                            ? "text-darkgray bg-white border-mediumgray"
                            : "text-[#FF0000] bg-[#FFEAEA] border-[#FFEAEA]"
                      )}
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
                      {receiptInfo.status === "CANCELED_BY_ALL_QUIT" ||
                      receiptInfo.status === "CANCELED_BY_DRIVER_QUIT"
                        ? "환불 완료"
                        : member.reservationStatus === "PAYMENT_COMPLETE"
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
      </div>
      <CheckModal
        showModal={showDriverPenaltyModal}
        setShowModal={setShowDriverPenaltyModal}
        message={
          <p>
            위약금{" "}
            <span className="text-primary">
              {receiptInfo.driverPenaltyStatus === "PENALTY_PAYMENT_COMPLETE"
                ? "지불 완료 전"
                : "지불 완료"}
            </span>
            로 표시하겠습니까?
          </p>
        }
        noText="취소"
        yesText="확인"
        yesHandler={() => driverPenaltyCompleteFunc()}
      />
    </>,
    document.body
  );
}

export default memo(ReceiptModal);
