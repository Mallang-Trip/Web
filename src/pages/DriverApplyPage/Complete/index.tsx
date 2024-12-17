import { Dispatch, memo, SetStateAction, useState } from "react";
import CancelModal from "./CancelModal";
import logo from "@/assets/images/logo.png";

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
}

function Complete({ setStep }: Props) {
  const [showCancelModal, setShowCancelModal] = useState(false);

  return (
    <>
      <div className="w-full max-w-md mt-24 mx-auto py-10 bg-skyblue rounded-lg shadow-lg">
        <p className="w-full text-center text-black text-lg whitespace-pre">
          {
            "제출이 완료되었습니다!\n\n드라이버 심사를 진행 중이며,\n추후 말랑트립에서 연락드리겠습니다.\n\n말랑트립 드라이버에 관심을 갖고\n지원해주셔서 감사드립니다."
          }
        </p>
        <img
          src={logo}
          alt="mallangtrip"
          className="w-32 ml-auto mt-16 mr-10"
        />
      </div>

      <div className="w-full flex justify-center gap-7 mt-16 mx-auto px-4">
        <button
          type="button"
          className="h-12 bg-[#FFEAEA] border rounded-full text-[#E30000] text-sm w-64 border-[#E30000]"
          onClick={() => setShowCancelModal(true)}
        >
          제출 취소하기
        </button>
        <button
          type="button"
          className="h-12 bg-skyblue border rounded-full text-primary text-sm w-64 border-primary"
          onClick={() => setStep(1)}
        >
          제출 내용 수정하기
        </button>
      </div>

      <CancelModal
        showModal={showCancelModal}
        setShowModal={setShowCancelModal}
      />
    </>
  );
}

export default memo(Complete);
