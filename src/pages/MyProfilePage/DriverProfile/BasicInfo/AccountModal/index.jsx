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

  const confirmHandler = (e) => {
    e.preventDefault();

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
      <form
        className="relative w-full max-w-4xl max-h-full m-auto"
        onSubmit={confirmHandler}
      >
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
            <div className="flex flex-col gap-8">
              <div>
                <div className="block mb-2 text-base font-medium text-black">
                  은행을 선택해주세요{" "}
                  <span className="text-red-600 font-bold">*</span>
                </div>
                <input
                  type="text"
                  name="bank_name"
                  className="border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5 caret-white cursor-pointer"
                  placeholder="은행을 선택해주세요"
                  value={bank}
                  onChange={() => {}}
                  onClick={() => setShowBankModal(true)}
                  autoComplete="off"
                />
              </div>
              <div>
                <div className="block mb-2 text-base font-medium text-black">
                  예금주 성함(본인)을 입력해주세요{" "}
                  <span className="text-red-600 font-bold">*</span>
                </div>
                <input
                  type="text"
                  name="accout_name"
                  className="border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5"
                  placeholder="예금주 성함(본인)을 입력해주세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div>
                <div className="block mb-2 text-base font-medium text-black">
                  계좌번호를 입력해주세요{" "}
                  <span className="text-red-600 font-bold">*</span>
                </div>
                <input
                  type="text"
                  name="accout_number"
                  className="border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5"
                  placeholder="계좌번호를 입력해주세요"
                  value={onlyNumber(accoutNumber)}
                  onChange={(e) => setAccoutNumber(e.target.value)}
                  autoComplete="off"
                />
                <p className="mt-2 text-xs text-red-600 font-medium">
                  숫자만 입력 가능합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <button
            type="button"
            className="w-full h-16 text-lg text-center text-darkgray rounded-bl-lg bg-lightgray"
            onClick={cancelHandler}
          >
            취소
          </button>
          <button
            type="submit"
            className="w-full h-16 text-lg text-center text-white rounded-br-lg bg-primary"
          >
            확인
          </button>
        </div>
      </form>

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
