import { useEffect, useState } from "react";
import ConfirmModal from "../../../components/ConfirmModal";

function PersonalInfo({
  setActiveNext,
  name,
  birthDate,
  region,
  gender,
  setName,
  setBirthDate,
  setRegion,
  setGender,
}) {
  const [showValidationModal, setShowValidationModal] = useState(false);

  const nameHandler = (e) => setName(e.target.value);
  const birthDateHandler = (e) => {
    if (e.target.value.length <= 8)
      setBirthDate(e.target.value.replace(/\D/g, ""));
  };
  const regionHander = (e) => setRegion(e.target.value);
  const genderHander = (e) => setGender(e.target.value);

  useEffect(() => {
    if (birthDate.length === 8) {
      const Today = new Date();
      const year = Today.getFullYear() - 14;
      const month = String(Today.getMonth() + 1).padStart(2, "0");
      const day = String(Today.getDate()).padStart(2, "0");

      if (birthDate > year + month + day) setShowValidationModal(true);
    }
  }, [birthDate]);

  useEffect(() => {
    const isValidation = () => {
      const Today = new Date();
      const year = Today.getFullYear() - 14;
      const month = String(Today.getMonth() + 1).padStart(2, "0");
      const day = String(Today.getDate()).padStart(2, "0");

      if (birthDate > year + month + day) return false;
      else return name && birthDate.length === 8 && region && gender;
    };

    if (isValidation()) setActiveNext(true);
    else setActiveNext(false);
  }, [name, birthDate, region, gender, setActiveNext]);

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
          placeholder="성함을 입력해주세요."
          value={name}
          onChange={nameHandler}
        />
        <p className="mt-2 text-xs text-red-600 font-medium">
          성함은 추후 수정 불가능하니 신중하게 입력해주세요.
        </p>
      </div>
      <div>
        <div className="block mb-2 text-base font-medium text-black">
          생년월일 8자리를 입력해주세요.{" "}
          <span className="text-red-600 font-bold">*</span>
        </div>
        <input
          type="text"
          name="birthDate"
          className="border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5"
          placeholder="생년월일 8자리를 입력해주세요."
          value={birthDate}
          onChange={birthDateHandler}
        />
        <p className="mt-2 text-xs text-red-600 font-medium">
          숫자만 입력 가능합니다.
        </p>
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
      <ConfirmModal
        showModal={showValidationModal}
        setShowModal={setShowValidationModal}
        message={"회원가입은 만 14세 이상부터\n가능합니다."}
      />
    </div>
  );
}

export default PersonalInfo;
