import { useEffect, useState } from "react";
import TelecomModal from "./TelecomModal";
import ConfirmModal from "../../../components/ConfirmModal";
import maskingIdentityNumber from "../../../assets/svg/masking_identity_number.svg";

function PersonalInfo({
  setActiveNext,
  name,
  birthDate,
  region,
  gender,
  carrier,
  setCarrier,
  setName,
  setBirthDate,
  setRegion,
  setGender,
}) {
  const [showTelecomModal, setShowTelecomModal] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);

  const nameHandler = (e) => setName(e.target.value);
  const birthDateHandler = (e) => {
    if (e.target.value.length > 6) return;
    setBirthDate(e.target.value.replace(/\D/g, ""));
  };
  const genderHander = (e) => {
    if (e.target.value.length > 1) return;
    setGender(e.target.value.replace(/[^\d]|[^1234]/g, ""));
  };
  const regionHander = (e) => setRegion(e.target.value);

  useEffect(() => {
    if (birthDate.length === 6) {
      const Today = new Date();
      const year = Today.getFullYear() - 14;
      const month = String(Today.getMonth() + 1).padStart(2, "0");
      const day = String(Today.getDate()).padStart(2, "0");

      const fullBirthDate =
        Number(birthDate.slice(0, 2)) > 20
          ? `19${birthDate}`
          : `20${birthDate}`;

      if (fullBirthDate > year + month + day) setShowValidationModal(true);
    }
  }, [birthDate]);

  useEffect(() => {
    const isValidation = () => {
      const Today = new Date();
      const year = Today.getFullYear() - 14;
      const month = String(Today.getMonth() + 1).padStart(2, "0");
      const day = String(Today.getDate()).padStart(2, "0");

      const fullBirthDate =
        Number(birthDate.slice(0, 2)) > 20
          ? `19${birthDate}`
          : `20${birthDate}`;

      if (fullBirthDate > year + month + day) return false;
      else return name && birthDate.length === 6 && gender && carrier;
    };

    if (isValidation()) setActiveNext(true);
    else setActiveNext(false);
  }, [name, birthDate, gender, carrier, setActiveNext]);

  return (
    <div className="w-full md:w-3/4 mx-auto flex flex-col gap-8 mt-20">
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
      <div className="grid w-full grid-cols-2 sm:grid-cols-4 my-5 text-center">
        <div className="text-lg font-bold leading-7">국적</div>
        <select value={region} onChange={regionHander} className="w-24">
          <option value="">선택</option>
          <option value="내국인">내국인</option>
          <option value="외국인">외국인</option>
        </select>
        <div className="text-lg font-bold leading-7">성별</div>
        <select value={gender} onChange={genderHander} className="w-24">
          <option value="">선택</option>
          <option value="남자">남자</option>
          <option value="여자">여자</option>
        </select>
      </div>

      <TelecomModal
        showModal={showTelecomModal}
        setShowModal={setShowTelecomModal}
        carrier={carrier}
        setCarrier={setCarrier}
      />
      <ConfirmModal
        showModal={showValidationModal}
        setShowModal={setShowValidationModal}
        message={"회원가입은 만 14세 이상부터\n가능합니다."}
      />
    </div>
  );
}

export default PersonalInfo;
