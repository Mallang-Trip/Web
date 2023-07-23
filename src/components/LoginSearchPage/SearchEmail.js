import React, { useEffect, useRef, useState } from "react";

function SearchEmail(props) {
  const phoneNumberInput = useRef();
  const codeInput = useRef();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [codeTransmission, setCodeTransmission] = useState(false);
  const [limit, setLimit] = useState(-1);
  const [timer, setTimer] = useState(undefined);

  const phoneNumberHandler = (e) => setPhoneNumber(e.target.value);
  const codeHandler = (e) => setCode(e.target.value);

  const sendCode = () => {
    if (!phoneNumber) {
      alert("휴대전화번호를 입력해 주세요.");
      return phoneNumberInput.current.focus();
    }

    setCodeTransmission(true);
    setLimit(300);
    codeInput.current.focus();

    if (!timer) {
      setTimer(
        setInterval(() => {
          setLimit((prevLimit) => prevLimit - 1);
        }, 1000)
      );
    }
  };

  const codeSubmit = () => {
    if (!code) return;

    console.log(code);
    props.setCompleteSearch(true);
  };

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  return (
    <div>
      <div className="flex flex-row mb-8">
        <input
          type="text"
          placeholder="휴대전화번호를 입력해 주세요.(‘-’제외)"
          className="w-full border-b border-[#666666] focus:outline-none focus:border-primary"
          value={phoneNumber}
          onChange={phoneNumberHandler}
          ref={phoneNumberInput}
        />
        <button
          type="button"
          onClick={sendCode}
          className="w-[125px] h-[30px] text-xs text-black bg-[#D9D9D9] rounded-xl"
        >
          {codeTransmission ? "인증번호 재전송" : "인증번호 전송"}
        </button>
      </div>
      <div className="flex flex-row relative">
        <input
          type="text"
          placeholder="인증번호를 입력해 주세요."
          className="w-full border-b border-[#666666] focus:outline-none focus:border-primary"
          value={code}
          onChange={codeHandler}
          ref={codeInput}
        />
        <button
          type="button"
          onClick={codeSubmit}
          className={`w-[125px] h-[30px] text-xs rounded-xl ${
            code ? "bg-primary text-white" : "bg-[#D9D9D9] text-black"
          }`}
        >
          확인
        </button>
        <span className="absolute top-1 right-28">
          {limit >= 0 ? `${Math.floor(limit / 60)}분 ${limit % 60}초` : ""}
        </span>
      </div>
      {codeTransmission && (
        <div className="mt-10 text-xs">
          인증번호 발송에는 시간이 소요되며 하루 최대 5회까지 전송할 수
          있습니다.
          <br />
          인증번호는 입력한 휴대전화번호로 발송됩니다. 수신하지 못했다면 스팸함
          또는 휴대전화의 설정을 확인해 주세요.
        </div>
      )}
    </div>
  );
}

export default SearchEmail;
