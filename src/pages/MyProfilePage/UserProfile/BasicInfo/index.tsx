import { ChangeEvent, memo } from "react";
import { useSelector } from "react-redux";
import { makePhoneNumber } from "@/utils";
import { RootState } from "@/redux/store";
import Information from "@/pages/MyProfilePage/UserProfile/Information";

interface Props {
  modifyMode: boolean;
  phoneNumber: string;
  introduction: string;
  introductionHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

function BasicInfo({
  modifyMode,
  phoneNumber,
  introduction,
  introductionHandler,
}: Props) {
  const user = useSelector((state: RootState) => state.user);

  return (
    <>
      <p className="text-lg font-bold text-black mt-6 mb-5">기본 정보</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Information
          title="이름(실명)"
          content={user.name}
          modifyMode={false}
        />
        <Information
          title="성별"
          content={user.gender === "MALE" ? "남성" : "여성"}
          modifyMode={false}
        />
        <Information
          title="생년월일"
          content={user.birthday.replaceAll("-", ".")}
          modifyMode={false}
        />
        <Information
          title="전화번호"
          content={makePhoneNumber(phoneNumber)}
          modifyMode={false}
        />
        <Information
          title="한줄 소개"
          content={introduction}
          modifyMode={modifyMode}
          onChangeHandler={introductionHandler}
        />
      </div>
    </>
  );
}

export default memo(BasicInfo);
