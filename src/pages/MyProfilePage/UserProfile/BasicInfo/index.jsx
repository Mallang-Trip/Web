import { useSelector } from "react-redux";
import { makePhoneNumber } from "../../../../utils";
import Information from "../Information";

function BasicInfo({
  modifyMode,
  phoneNumber,
  phoneNumberHandler,
  introduction,
  introductionHandler,
}) {
  const user = useSelector((state) => state.user);

  return (
    <>
      <p className="text-lg font-bold text-black mt-6 mb-5">기본 정보</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Information title={"이름(실명)"} content={user.name} />
        <Information
          title={"성별"}
          content={user.gender === "MALE" ? "남성" : "여성"}
        />
        <Information
          title={"생년월일"}
          content={user.birthday.replaceAll("-", ".")}
        />
        <Information
          title={"전화번호"}
          content={makePhoneNumber(phoneNumber)}
          // modifyMode={modifyMode}
          // onChangeHandler={phoneNumberHandler}
          // 본인 인증 구현되기 전까지 수정 불가 상태로 전환
        />
        <Information
          title={"한줄 소개"}
          content={introduction}
          modifyMode={modifyMode}
          onChangeHandler={introductionHandler}
        />
      </div>
    </>
  );
}

export default BasicInfo;
