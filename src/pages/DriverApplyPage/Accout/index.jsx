import { useEffect, useState } from "react";
import { onlyNumber } from "../../../utils";
import BankModal from "./BankModal";

function Accout({ setActiveNext }) {
  const [bank, setBank] = useState("");
  const [name, setName] = useState("");
  const [accoutNumber, setAccoutNumber] = useState("");
  const [hour, setHour] = useState("");
  const [money, setMoney] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (
      bank &&
      name &&
      onlyNumber(accoutNumber) &&
      onlyNumber(hour) &&
      onlyNumber(money)
    )
      setActiveNext(true);
    else setActiveNext(false);
  }, [bank, name, accoutNumber, hour, money]);

  return (
    <div className="w-3/4 mx-auto">
      <p className="mb-6 text-lg text-black">입금 받을 계좌 정보</p>
      <div className="mx-auto">
        <input
          type="text"
          name="bank_name"
          placeholder="은행을 선택해주세요"
          className="w-full border-b border-darkgray focus:outline-none focus:border-primary"
          value={bank}
          onChange={() => {}}
          onClick={() => setShowModal(true)}
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

      <p className="mt-16 mb-6 text-lg text-black">가격 설정</p>
      <div className="flex gap-1 justify-center items-center">
        <input
          type="text"
          name="hour"
          className="w-8 border-b border-darkgray focus:outline-none focus:border-primary text-center"
          value={onlyNumber(hour)}
          onChange={(e) => setHour(e.target.value)}
          autoComplete="off"
        />
        <span className="text-sm text-darkgray">시간당</span>
        <input
          type="text"
          name="money"
          className="w-20 border-b border-darkgray focus:outline-none focus:border-primary text-center"
          value={onlyNumber(money).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          onChange={(e) => setMoney(e.target.value)}
          autoComplete="off"
        />
        <span className="text-sm text-darkgray">원</span>
      </div>

      <BankModal
        showModal={showModal}
        setShowModal={setShowModal}
        bank={bank}
        setBank={setBank}
      />
    </div>
  );
}

export default Accout;
