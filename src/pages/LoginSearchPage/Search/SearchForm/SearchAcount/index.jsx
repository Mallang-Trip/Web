import { useEffect, useRef, useState } from "react";
import {
  getCertificationCode,
  searchId,
  searchPassword,
} from "../../../../../api/users";
import ConfirmModal from "../../../../../components/ConfirmModal";

function SearchAcount({
  mode,
  setMode,
  setCompleteSearch,
  setLoginId,
  phoneNumber,
  setPhoneNumber,
  code,
  setCode,
}) {
  const phoneNumberInput = useRef();
  const codeInput = useRef();
  const [codeTransmission, setCodeTransmission] = useState(false);
  const [limit, setLimit] = useState(-1);
  const [timer, setTimer] = useState(undefined);
  const [showNoInputModal, setShowNoInputModal] = useState(false);
  const [showNoUserModal, setShowNoUserModal] = useState(false);
  const [showCodeInvalidModal, setShowCodeInvalidModal] = useState(false);
  const [showCodeErrorModal, setShowCodeErrorModal] = useState(false);

  const phoneNumberHandler = (e) =>
    setPhoneNumber(e.target.value.replace(/\D/g, ""));
  const codeHandler = (e) => setCode(e.target.value.replace(/\D/g, ""));

  const sendCode = async (e) => {
    e.preventDefault();

    if (!phoneNumber) return setShowNoInputModal(true);
    if (!/^010\d{8}$/.test(phoneNumber)) return setShowNoInputModal(true);

    try {
      const result = await getCertificationCode(phoneNumber);
      if (result.statusCode === 20000) return setShowNoUserModal(true);

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
    } catch (e) {
      console.log(e);
    }
  };

  const codeSubmit = async (e) => {
    e.preventDefault();

    if (!code) return;
    if (limit <= 0) return setShowCodeInvalidModal(true);

    if (mode === "password") {
      try {
        const result = await searchPassword(phoneNumber, code);
        if (result.statusCode === 401) return setShowCodeErrorModal(true);
        setMode("NewPassword");
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const result = await searchId(phoneNumber, code);
        if (result.statusCode === 401) return setShowCodeErrorModal(true);
        setLoginId(result.payload.loginId);
        setCompleteSearch(true);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (!showNoInputModal) phoneNumberInput.current.focus();
  }, [showNoInputModal]);

  useEffect(() => {
    if (!showNoUserModal) phoneNumberInput.current.focus();
  }, [showNoUserModal]);

  useEffect(() => {
    if (!showCodeInvalidModal) {
      setCode("");
      phoneNumberInput.current.focus();
    }
  }, [showCodeInvalidModal]);

  useEffect(() => {
    if (!showCodeErrorModal) codeInput.current.focus();
  }, [showCodeErrorModal]);

  useEffect(() => {
    phoneNumberInput.current.focus();
    setPhoneNumber("");
    setCode("");
    setCodeTransmission(false);
    setLimit(-1);
    timer && clearInterval(timer);

    return () => {
      timer && clearInterval(timer);
    };
  }, [mode]);

  return (
    <>
      <div className="flex flex-col gap-8">
        <form onSubmit={sendCode}>
          <div className="block mb-2 text-base font-medium text-black">
            휴대전화 번호를 입력해 주세요.{" "}
            <span className="text-red-600 font-bold">*</span>
          </div>
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              name="phoneNumber"
              placeholder="휴대전화 번호를 입력해 주세요."
              className="border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5"
              value={phoneNumber}
              onChange={phoneNumberHandler}
              ref={phoneNumberInput}
            />
            <button
              type="submit"
              className={`w-[125px] h-10 text-xs rounded-lg border ${
                phoneNumber
                  ? "text-white bg-primary border-primary"
                  : "text-darkgray bg-white border-darkgray"
              }`}
            >
              {codeTransmission ? "인증번호 재전송" : "인증번호 전송"}
            </button>
          </div>
          <p className="mt-2 text-xs text-red-600 font-medium">
            숫자만 입력 가능합니다.
          </p>
        </form>

        <form onSubmit={codeSubmit}>
          <div className="block mb-2 text-base font-medium text-black">
            인증번호를 입력해 주세요.{" "}
            <span className="text-red-600 font-bold">*</span>
          </div>
          <div className="flex items-center gap-1.5 relative">
            <input
              type="text"
              name="code"
              placeholder="인증번호를 입력해 주세요."
              className="border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5"
              value={code}
              onChange={codeHandler}
              ref={codeInput}
            />
            <button
              type="submit"
              className={`w-[125px] h-10 text-xs rounded-lg border ${
                code
                  ? "text-white bg-primary border-primary"
                  : "text-darkgray bg-white border-darkgray"
              }`}
            >
              확인
            </button>
            <span className="absolute top-1/2 right-28 transform -translate-y-1/2 mr-2 text-sm">
              {limit >= 0 ? `${Math.floor(limit / 60)}분 ${limit % 60}초` : ""}
            </span>
          </div>
          <p className="mt-2 text-xs text-red-600 font-medium">
            숫자만 입력 가능합니다.
          </p>
        </form>
        {codeTransmission && (
          <div className="text-xs">
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
        message={"휴대전화 번호를 정확하게 입력해 주세요."}
      />
      <ConfirmModal
        showModal={showNoUserModal}
        setShowModal={setShowNoUserModal}
        message={
          "회원 정보가 존재하지 않습니다.\n입력하신 정보를 확인해 주세요."
        }
      />
      <ConfirmModal
        showModal={showCodeInvalidModal}
        setShowModal={setShowCodeInvalidModal}
        message={
          "인증 유효기간이 만료되었습니다.\n인증번호를 다시 요청해주세요."
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
