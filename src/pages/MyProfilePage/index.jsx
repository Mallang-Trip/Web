import React from "react";
import { useSelector } from "react-redux";
import profileImage from "../../assets/images/profileImage.png";
import EditButton from "./EditButton";
import { makePhoneNumber } from "../../utils";

function MyProfilePage() {
  const user = useSelector((state) => state.user);

  return (
    <div className="max-w-screen-xl px-5">
      <p className="my-9 text-2xl font-bold text-black">나의 프로필</p>
      <div className="flex justify-center">
        <img
          src={user.profileImg || profileImage}
          alt="profileImage"
          className="w-[170px] h-[170px] rounded-full"
        />
      </div>
      <div className="my-6 relative h-12">
        <div className="text-3xl font-bold text-black absolute top-0 left-1/2 transform -translate-x-1/2">
          {user.nickname}
        </div>
        <EditButton
          className="absolute top-0 right-0"
          onClick={() => console.log("profile")}
          title="프로필 수정"
        />
      </div>
      <p className="text-lg font-bold text-black mt-6 mb-5">기본 정보</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex justify-between py-4 px-6 rounded-xl bg-[#F4F4F4] text-sm text-darkgray">
          <span>이름(실명)</span>
          <span>{user.name}</span>
        </div>
        <div className="flex justify-between py-4 px-6 rounded-xl bg-[#F4F4F4] text-sm text-darkgray">
          <span>성별</span>
          <span>{user.gender === "MALE" ? "남성" : "여성"}</span>
        </div>
        <div className="flex justify-between py-4 px-6 rounded-xl bg-[#F4F4F4] text-sm text-darkgray">
          <span>생년월일</span>
          <span>{user.birthday.replaceAll("-", ".")}</span>
        </div>
        <div className="flex justify-between py-4 px-6 rounded-xl bg-[#F4F4F4] text-sm text-darkgray">
          <span>전화번호</span>
          <span>{makePhoneNumber(user.phoneNumber)}</span>
        </div>
        <div className="flex justify-between py-4 px-6 rounded-xl bg-[#F4F4F4] text-sm text-darkgray">
          <span>한줄 소개</span>
          <span>{user.introduction}</span>
        </div>
      </div>
      <p className="text-lg font-bold text-black mt-12 mb-5">로그인 정보</p>
      <div className="grid grid-cols-2 gap-3 mb-12">
        <div className="flex justify-between py-4 px-6 rounded-xl bg-[#F4F4F4] text-sm text-darkgray">
          <span>이메일 주소</span>
          <span>{user.email}</span>
        </div>
        <div className="flex justify-between py-4 px-6 rounded-xl bg-[#F4F4F4] text-sm text-darkgray">
          <span>아이디</span>
          <span>{user.loginId}</span>
        </div>
        <div className="flex justify-between py-4 px-6 rounded-xl bg-[#F4F4F4] text-sm text-darkgray">
          <span>비밀번호</span>
          <span>*********</span>
        </div>
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
