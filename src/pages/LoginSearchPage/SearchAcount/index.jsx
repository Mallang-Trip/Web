import React, { useEffect, useRef, useState } from "react";
import ConfirmModal from "../../../components/ConfirmModal";

function SearchAcount(props) {
  const phoneNumberInput = useRef();
  const codeInput = useRef();
  const [phoneNumber, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeTransmission, setCodeTransmission] = useState(false);
  const [limit, setLimit] = useState(-1);
  const [timer, setTimer] = useState(undefined);
  const [showNoInputModal, setShowNoInputModal] = useState(false);
  const [showNoUserModal, setShowNoUserModal] = useState(false);
  const [showCodeErrorModal, setShowCodeErrorModal] = useState(false);

  const phoneNumberHandler = (e) => setEmail(e.target.value.replace(/\D/g, ""));
  const codeHandler = (e) => setCode(e.target.value.replace(/\D/g, ""));

  const sendCode = () => {
    if (!phoneNumber) return setShowNoInputModal(true);
    if (phoneNumber === "010") return setShowNoUserModal(true);

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
    if (code === "0") return setShowCodeErrorModal(true);

    if (props.mode === "password") {
      console.log(code);
      props.setMode("NewPassword");
    } else {
      console.log(code);
      props.setCompleteSearch(true);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  useEffect(() => {
    if (!showNoInputModal) phoneNumberInput.current.focus();
  }, [showNoInputModal]);

  useEffect(() => {
    if (!showNoUserModal) phoneNumberInput.current.focus();
  }, [showNoUserModal]);

  useEffect(() => {
    if (!showCodeErrorModal) {
      setCode("");
      codeInput.current.focus();
    }
  }, [showCodeErrorModal]);

  useEffect(() => {
    phoneNumberInput.current.focus();
  }, []);

  return (
    <>
      <div>
        <div className="flex flex-row mb-8">
          <input
            type="text"
            name="phoneNumber"
            placeholder="휴대전화 번호를 입력해 주세요. (‘-’제외)"
            className="w-full border-b appearance-none border-darkgray focus:outline-none focus:border-primary"
            value={phoneNumber}
            onChange={phoneNumberHandler}
            ref={phoneNumberInput}
          />
          <button
            type="button"
            onClick={sendCode}
            className="w-[125px] h-[30px] text-xs text-darkgray bg-white rounded-full border border-darkgray hover:text-white hover:bg-primary hover:border-primary"
          >
            {codeTransmission ? "인증번호 재전송" : "인증번호 전송"}
          </button>
        </div>
        <div className="relative flex flex-row">
          <input
            type="text"
            name="code"
            placeholder="인증번호를 입력해 주세요."
            className="w-full border-b border-darkgray focus:outline-none focus:border-primary"
            value={code}
            onChange={codeHandler}
            ref={codeInput}
          />
          <button
            type="button"
            onClick={codeSubmit}
            className={`w-[125px] h-[30px] text-xs rounded-full border ${
              code
                ? "text-white bg-primary border-primary"
                : "text-darkgray bg-white border-darkgray"
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
            인증번호는 입력한 휴대전화번호로 발송됩니다. 수신하지 못했다면
            스팸함 또는 휴대전화의 설정을 확인해 주세요.
          </div>
        )}
      </div>

      <ConfirmModal
        showModal={showNoInputModal}
        setShowModal={setShowNoInputModal}
        message={"휴대전화 번호를 입력해 주세요."}
      />
      <ConfirmModal
        showModal={showNoUserModal}
        setShowModal={setShowNoUserModal}
        message={
          "회원 정보가 존재하지 않습니다.\n입력하신 정보를 확인해 주세요."
        }
      />
      <ConfirmModal
        showModal={showCodeErrorModal}
        setShowModal={setShowCodeErrorModal}
        message={"인증번호가 잘못되었습니다!\n다시 입력해주세요."}
      />
    </>
  );
}

export default SearchAcount;
