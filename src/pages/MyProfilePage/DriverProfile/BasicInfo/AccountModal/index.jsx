import { useEffect, useState } from "react";
import { onlyNumber } from "../../../../../utils";
import BankModal from "../../../../DriverApplyPage/Accout/BankModal";

function AccountModal({ showModal, setShowModal, driverInfo, setDriverInfo }) {
  const [bank, setBank] = useState("");
  const [name, setName] = useState("");
  const [accoutNumber, setAccoutNumber] = useState("");
  const [showBankModal, setShowBankModal] = useState(false);

  const cancelHandler = () => {
    setShowModal(false);
  };

  const confirmHandler = () => {
    setDriverInfo({
      ...driverInfo,
      bank: bank,
      accountHolder: name,
      accountNumber: accoutNumber,
    });
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-hidden");
      setBank(driverInfo.bank);
      setName(driverInfo.accountHolder);
      setAccoutNumber(driverInfo.accountNumber);
    } else document.body.classList.remove("overflow-hidden");
  }, [showModal]);

  return (
    <div
      className={`modal-container fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal && "active"
      }`}
    >
      <div className="relative w-full max-w-4xl max-h-full m-auto">
        <div className="relative bg-white rounded-t-lg">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={() => {
              setShowModal(false);
            }}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-bold text-gray-900">
              입금 계좌 수정하기
            </h3>

            <div className="my-9 mx-auto px-2 lg:px-24">
              <div className="mb-5 text-lg font-bold text-black">
                입금 받을 계좌 정보
              </div>
              <input
                type="text"
                name="bank_name"
                placeholder="은행을 선택해주세요"
                className="w-full border-b border-darkgray focus:outline-none focus:border-primary"
                value={bank}
                onChange={() => {}}
                onClick={() => setShowBankModal(true)}
                autoComplete="off"
              />
              <input
                type="text"
                name="accout_name"
                placeholder="예금주 성함(본인)을 입력해주세요"
                className="w-full my-12 border-b border-darkgray focus:outline-none focus:border-primary"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
              />
              <input
                type="text"
                name="accout_number"
                placeholder="계좌번호를 숫자로만 입력해주세요"
                className="w-full border-b border-darkgray focus:outline-none focus:border-primary"
                value={onlyNumber(accoutNumber)}
                onChange={(e) => setAccoutNumber(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>
        </div>
        <div className="flex">
          <button
            className="w-full h-16 text-lg text-center text-darkgray rounded-bl-lg bg-[#F4F4F4]"
            onClick={cancelHandler}
          >
            취소
          </button>
          <button
            className="w-full h-16 text-lg text-center text-white rounded-br-lg bg-primary"
            onClick={confirmHandler}
          >
            확인
          </button>
        </div>
      </div>

      <BankModal
        showModal={showBankModal}
        setShowModal={setShowBankModal}
        bank={bank}
        setBank={setBank}
      />
    </div>
  );
}

export default AccountModal;
