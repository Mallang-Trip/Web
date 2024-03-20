import { useEffect, useRef, useState } from "react";
import {
  postIdentification,
  postIdentificationConfirm,
} from "../../../api/users";
import TelecomModal from "./TelecomModal";
import CompleteModal from "./CompleteModal";
import ConfirmModal from "../../../components/ConfirmModal";
import maskingIdentityNumber from "../../../assets/svg/masking_identity_number.svg";

function PersonalInfo({
  setStep,
  impUid,
  setImpUid,
  name,
  setName,
  phoneNumber,
  setPhoneNumber,
}) {
  const phoneNumberInput = useRef();
  const codeInput = useRef();
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [carrier, setCarrier] = useState("");
  const [code, setCode] = useState("");
  const [limit, setLimit] = useState(-1);
  const [timer, setTimer] = useState(undefined);
  const [codeTransmission, setCodeTransmission] = useState(false);
  const [showTelecomModal, setShowTelecomModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const nameHandler = (e) => setName(e.target.value);
  const birthDateHandler = (e) => {
    if (e.target.value.length > 6) return;
    setBirthDate(e.target.value.replace(/\D/g, ""));
  };
  const genderHander = (e) => {
    if (e.target.value.length > 1) return;
    setGender(e.target.value.replace(/[^\d]|[^1234]/g, ""));
  };
  const phoneNumberHandler = (e) => {
    if (e.target.value.length > 11) return;
    setPhoneNumber(e.target.value.replace(/\D/g, ""));
  };
  const codeHandler = (e) => {
    if (e.target.value.length > 6) return;
    setCode(e.target.value.replace(/\D/g, ""));
  };

  const isValidation = () => {
    const Today = new Date();
    const year = Today.getFullYear() - 14;
    const month = String(Today.getMonth() + 1).padStart(2, "0");
    const day = String(Today.getDate()).padStart(2, "0");

    const fullBirthDate =
      Number(birthDate.slice(0, 2)) > 20 ? `19${birthDate}` : `20${birthDate}`;

    if (fullBirthDate > year + month + day) return false;
    else
      return name && birthDate.length === 6 && gender && carrier && phoneNumber;
  };

  const sendCode = async (e) => {
    e.preventDefault();

    if (!/^010\d{8}$/.test(phoneNumber) || !isValidation()) {
      setErrorMessage(
        "성함, 주민등록번호, 통신사, 휴대폰 번호를\n 모두 정확하게 입력해 주세요."
      );
      setShowErrorModal(true);
      return;
    }

    try {
      const body = {
        birthday: birthDate,
        carrier: carrier.slice(0, 4) === "Mvno" ? carrier.slice(4) : carrier,
        genderDigit: gender,
        isMvno: carrier.slice(0, 4) === "Mvno",
        name: name,
        phoneNumber: phoneNumber,
      };
      const result = await postIdentification(body);

      if (result.statusCode === 409) {
        setErrorMessage("이미 가입된 번호입니다.");
        setShowErrorModal(true);
        return;
      }
      if (result.statusCode !== 200) {
        setErrorMessage("인증번호 전송에 실패했습니다.");
        setShowErrorModal(true);
        return;
      }

      setImpUid(result.payload.impUid);
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
    if (limit <= 0) {
      setErrorMessage(
        "인증 유효기간이 만료되었습니다.\n인증번호를 다시 요청해주세요."
      );
      setShowErrorModal(true);
      return;
    }

    try {
      const result = await postIdentificationConfirm(impUid, code);
      if (result.statusCode !== 200) {
        setErrorMessage("인증번호가 잘못되었습니다.\n다시 입력해주세요.");
        setShowErrorModal(true);
        return;
      }
      setShowCompleteModal(true);
      if (timer) clearInterval(timer);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (birthDate.length !== 6) return;

    const Today = new Date();
    const year = Today.getFullYear() - 14;
    const month = String(Today.getMonth() + 1).padStart(2, "0");
    const day = String(Today.getDate()).padStart(2, "0");

    const fullBirthDate =
      Number(birthDate.slice(0, 2)) > 20 ? `19${birthDate}` : `20${birthDate}`;

    if (fullBirthDate > year + month + day) {
      setErrorMessage("회원가입은 만 14세 이상부터\n가능합니다.");
      setShowErrorModal(true);
    }
  }, [birthDate]);

  useEffect(() => {
    return () => {
      timer && clearInterval(timer);
    };
  }, []);

  return (
    <div className="w-full sm:w-3/4 mx-auto flex flex-col gap-8 mt-20">
      <div>
        <div className="block mb-2 text-base font-medium text-black">
          성함을 입력해주세요. <span className="text-red-600 font-bold">*</span>
        </div>
        <input
          type="text"
          name="name"
          className="border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5"
          placeholder="홍길동"
          value={name}
          onChange={nameHandler}
        />
        <p className="mt-2 text-xs text-red-600 font-medium">
          성함은 추후 수정 불가능하니 신중하게 입력해주세요.
        </p>
      </div>
      <div>
        <div className="block mb-2 text-base font-medium text-black">
          주민등록번호 앞 7자리를 입력해주세요.{" "}
          <span className="text-red-600 font-bold">*</span>
        </div>
        <div className="w-full flex items-center gap-2">
          <input
            type="text"
            name="birthDate"
            className="border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-40 p-2.5"
            placeholder="990101"
            value={birthDate}
            onChange={birthDateHandler}
          />
          <span>-</span>
          <input
            type="text"
            name="birthDate_gender"
            className="border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-10 p-2.5 text-center"
            placeholder="1"
            value={gender}
            onChange={genderHander}
          />
          <img src={maskingIdentityNumber} />
        </div>
        <p className="mt-2 text-xs text-red-600 font-medium">
          숫자만 입력 가능합니다.
        </p>
      </div>
      <div>
        <div className="block mb-5 text-base font-medium text-black">
          통신사를 선택해주세요.{" "}
          <span className="text-red-600 font-bold">*</span>
        </div>
        <div className="w-full flex h-12 text-sm text-darkgray bg-lightgray rounded-lg">
          <button
            className={`w-full border rounded-l-lg ${
              carrier === "SKT"
                ? "bg-skyblue text-primary border-primary"
                : carrier === "KT"
                  ? "border-l-darkgray border-y-darkgray border-r-primary"
                  : "border-darkgray"
            }`}
            onClick={() => setCarrier("SKT")}
          >
            SKT
          </button>
          <button
            className={`w-full border-y ${
              carrier === "KT"
                ? "bg-skyblue text-primary border-primary"
                : "border-darkgray"
            }`}
            onClick={() => setCarrier("KT")}
          >
            KT
          </button>
          <button
            className={`w-full border ${
              carrier === "LGT"
                ? "bg-skyblue text-primary border-primary"
                : carrier === "KT"
                  ? "border-r-darkgray border-y-darkgray border-l-primary"
                  : carrier.slice(0, 4) === "Mvno"
                    ? "border-l-darkgray border-y-darkgray border-r-primary"
                    : "border-darkgray"
            }`}
            onClick={() => setCarrier("LGT")}
          >
            LG U+
          </button>
          <button
            className={`w-full border-y border-r rounded-r-lg ${
              carrier.slice(0, 4) === "Mvno"
                ? "bg-skyblue text-primary border-primary"
                : "border-darkgray"
            }`}
            onClick={() => setShowTelecomModal(true)}
          >
            알뜰폰
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <form onSubmit={sendCode}>
          <div className="block mb-2 text-base font-medium text-black">
            휴대폰 번호를 입력해 주세요.{" "}
            <span className="text-red-600 font-bold">*</span>
          </div>
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              name="phoneNumber"
              placeholder="01000000000"
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
              readOnly={!codeTransmission}
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
            입력하신 휴대폰 번호로 인증번호가 발송되었습니다.
            <br />
            인증번호 발송에는 일정 시간이 소요될 수 있으며, 만약 수신하지
            못했다면 스팸함 또는 휴대폰의 설정을 확인해 주세요.
          </div>
        )}
      </div>

      <TelecomModal
        showModal={showTelecomModal}
        setShowModal={setShowTelecomModal}
        carrier={carrier}
        setCarrier={setCarrier}
      />
      <ConfirmModal
        showModal={showErrorModal}
        setShowModal={setShowErrorModal}
        message={errorMessage}
      />
      <CompleteModal
        showModal={showCompleteModal}
        setShowModal={setShowCompleteModal}
        setStep={setStep}
      />
    </div>
  );
}

export default PersonalInfo;
