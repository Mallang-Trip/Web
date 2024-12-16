import { memo, useState } from "react";
import CancelModal from "./CancelModal";
import BottomButton from "../../../components/BottomButton";

interface Props {
  isDriver: boolean;
}

function CancelNewPartyButton({ isDriver }: Props) {
  const [showModal, setShowModal] = useState(false);

  if (isDriver) return null;
  return (
    <>
      <div className="hidden md:flex justify-center mt-20">
        <button
          className="h-14 text-white rounded-full text-lg font-bold w-64 md:w-80 bg-primary focus:outline-none"
          onClick={() => setShowModal(true)}
        >
          가입 제안 취소하기
        </button>
      </div>
      <BottomButton
        text="가입 제안 취소하기"
        onClick={() => setShowModal(true)}
      />
      <CancelModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}

export default memo(CancelNewPartyButton);
