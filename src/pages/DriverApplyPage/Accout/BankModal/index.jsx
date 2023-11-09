import { useEffect } from "react";
import BankButton from "./BankButton";

const bankList = [
  "KB국민",
  "전북",
  "대구",
  "케이뱅크",
  "신한",
  "신협",
  "수협",
  "경남",
  "우리",
  "IBK기업",
  "제주",
  "부산",
  "토스뱅크",
  "시티",
  "SBI저축",
  "우체국",
  "광주",
  "카카오뱅크",
  "NH농협",
  "새마을금고",
  "KDB산업",
  "하나",
  "SC제일",
  "저축",
];

function BankModal({ showModal, setShowModal, bank, setBank }) {
  useEffect(() => {
    if (showModal) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [showModal]);

  return (
    <div
      className={`modal-container fixed top-0 left-0 z-50 w-screen h-screen bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal ? "active" : ""
      }`}
    >
      <div className="m-auto shadow w-96 rounded-xl">
        <div className="grid grid-cols-4 gap-2 h-96 bg-white rounded-t-xl p-4">
          {bankList.map((item) => (
            <BankButton key={item} name={item} bank={bank} setBank={setBank} />
          ))}
        </div>
        <button
          className="w-full h-16 text-lg text-center text-white rounded-b-xl bg-primary"
          onClick={() => setShowModal(false)}
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default BankModal;
