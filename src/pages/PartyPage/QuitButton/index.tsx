import { memo, useState } from "react";
import { computeGapDay } from "../../../utils";
import BottomButton from "../../../components/BottomButton";
import QuitModal from "./QuitModal";

interface Props {
  getPartyData: (toScrollTop?: boolean) => void;
  partyStatus: string;
  startDate: string;
  paymentAmount: number;
  isDriver: boolean;
  totalPrice: number;
}

function QuitButton({
  getPartyData,
  partyStatus,
  startDate,
  paymentAmount,
  isDriver,
  totalPrice,
}: Props) {
  const [showModal, setShowModal] = useState(false);

  if (
    partyStatus === "CANCELED_BY_DRIVER_REFUSED" ||
    partyStatus === "CANCELED_BY_PROPOSER" ||
    partyStatus === "CANCELED_BY_ALL_QUIT" ||
    (partyStatus !== "RECRUITING" && computeGapDay(startDate) <= 2)
  )
    return null;
  return (
    <>
      <div className="hidden md:flex justify-center mt-20">
        <button
          className="h-14 text-white rounded-full text-lg font-bold w-64 md:w-80 bg-primary focus:outline-none"
          onClick={() => setShowModal(true)}
        >
          {partyStatus === "SEALED" ||
          partyStatus === "WAITING_COURSE_CHANGE_APPROVAL"
            ? "예약 취소하기"
            : "파티 탈퇴하기"}
        </button>
      </div>
      <BottomButton
        text={
          partyStatus === "SEALED" ||
          partyStatus === "WAITING_COURSE_CHANGE_APPROVAL"
            ? "예약 취소하기"
            : "파티 탈퇴하기"
        }
        onClick={() => setShowModal(true)}
      />
      <QuitModal
        showModal={showModal}
        setShowModal={setShowModal}
        getPartyData={getPartyData}
        partyStatus={partyStatus}
        startDate={startDate}
        paymentAmount={paymentAmount}
        isDriver={isDriver}
        totalPrice={totalPrice}
      />
    </>
  );
}

export default memo(QuitButton);
