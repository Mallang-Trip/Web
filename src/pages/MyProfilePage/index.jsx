import React, { useState } from "react";
import { useSelector } from "react-redux";
import profileImage from "../../assets/images/profileImage.png";
import EditButton from "../../components/EditButton";
import { makePhoneNumber } from "../../utils";
import Information from "./Information";

function MyProfilePage() {
  const user = useSelector((state) => state.user);
  const [modifyMode, setModifyMode] = useState(false);
  const [modifyImage, setModifyImage] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [introduction, setIntroduction] = useState(user.introduction);
  const [email, setEmail] = useState(user.email);

  const introductionHandler = (e) => {
    if (e.target.value.length <= 15) setIntroduction(e.target.value);
  };
  const phoneNumberHandler = (e) => setPhoneNumber(e.target.value);
  const emailHandler = (e) => setEmail(e.target.value);

  return (
    <div className="max-w-screen-xl px-5">
      <p className="my-9 text-2xl font-bold text-black">나의 프로필</p>
      <div className="flex justify-center">
        <div
          className="w-[170px] h-[170px] rounded-full relative"
          onMouseEnter={() => modifyMode && setModifyImage(true)}
          onMouseLeave={() => modifyMode && setModifyImage(false)}
        >
          <img
            src={user.profileImg || profileImage}
            alt="profileImage"
            className="w-full h-full rounded-full"
          />
          {modifyImage && (
            <div className="absolute top-0 left-0 w-full h-full rounded-full flex justify-center items-center bg-black bg-opacity-50 cursor-pointer">
              <div className="whitespace-pre-line text-center text-sm text-white">
                {"프로필 사진\n변경하기"}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="my-6 relative h-12">
        <div className="text-3xl font-bold text-black absolute top-0 left-1/2 transform -translate-x-1/2">
          {user.nickname}
        </div>
        <EditButton
          className="absolute top-0 right-0"
          onClick={() => setModifyMode((modifyMode) => !modifyMode)}
          title={modifyMode ? "저장" : "프로필 수정"}
        />
      </div>
      <p className="text-lg font-bold text-black mt-6 mb-5">기본 정보</p>
      <div className="grid grid-cols-2 gap-3">
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
          modifyMode={modifyMode}
          onChangeHandler={phoneNumberHandler}
        />
        <Information
          title={"한줄 소개"}
          content={introduction}
          modifyMode={modifyMode}
          onChangeHandler={introductionHandler}
        />
      </div>
      <p className="text-lg font-bold text-black mt-12 mb-5">로그인 정보</p>
      <div className="grid grid-cols-2 gap-3 mb-12">
        <Information
          title={"이메일 주소"}
          content={email}
          modifyMode={modifyMode}
          onChangeHandler={emailHandler}
        />
        <Information title={"아이디"} content={user.loginId} />
        <Information title={"비밀번호"} content={"*********"} />
        <EditButton
          className="w-36"
          onClick={() => console.log("profile")}
          title="비밀번호 변경"
        />
      </div>
    </div>
  );
}

export default MyProfilePage;
