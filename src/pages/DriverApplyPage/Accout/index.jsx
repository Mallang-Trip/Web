import { useEffect, useState } from "react";
import { onlyNumber } from "../../../utils";
import BankModal from "./BankModal";
import HourPrice from "./HourPrice";

function Accout({
  setActiveNext,
  bank,
  setBank,
  name,
  setName,
  accoutNumber,
  setAccoutNumber,
  hour,
  setHour,
  money,
  setMoney,
}) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (
      bank &&
      name &&
      onlyNumber(accoutNumber) &&
      onlyNumber(hour[0]) &&
      onlyNumber(money[0]) &&
      onlyNumber(accoutNumber).length >= 10 &&
      onlyNumber(accoutNumber).length <= 14
    )
      setActiveNext(true);
    else setActiveNext(false);
  }, [bank, name, accoutNumber, hour, money]);

  return (
    <div className="w-full md:w-3/4 mx-auto flex flex-col gap-8">
      <p className="text-xl text-black font-bold">입금 계좌 정보</p>
      <div>
        <div className="block mb-2 text-base font-medium text-black">
          은행을 선택해주세요 <span className="text-red-600 font-bold">*</span>
        </div>
        <input
          type="text"
          className="border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5 caret-white cursor-pointer"
          placeholder="은행을 선택해주세요"
          value={bank}
          onChange={() => {}}
          onClick={() => setShowModal(true)}
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
          className="border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5"
          placeholder="계좌번호를 입력해주세요"
          value={onlyNumber(accoutNumber)}
          onChange={(e) => setAccoutNumber(e.target.value)}
          autoComplete="off"
        />
        <p
          className={`mt-2 text-xs font-medium ${
            onlyNumber(accoutNumber).length >= 10 &&
            onlyNumber(accoutNumber).length <= 14
              ? "text-white"
              : "text-red-600"
          }`}
        >
          {onlyNumber(accoutNumber).length === 0
            ? "숫자만 입력 가능합니다."
            : "계좌번호를 정확하게 입력해주세요."}
        </p>
      </div>
      <div>
        <p className="mt-16 text-xl text-black font-bold">운행 가격 설정</p>
        <div className="block mt-8 text-base font-medium text-black">
          시간당 운행 가격을 설정해주세요. (최대 5개){" "}
          <span className="text-red-600 font-bold">*</span>
        </div>
      </div>
      <div>
        {Array.from({ length: 5 }, (_, index) => index).map((i) => (
          <HourPrice
            key={i}
            hour={hour}
            setHour={setHour}
            money={money}
            setMoney={setMoney}
            index={i}
            isShow={i === 0 || hour[i]}
          />
        ))}
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
