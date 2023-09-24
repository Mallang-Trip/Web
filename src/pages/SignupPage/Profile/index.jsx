import React, { useEffect, useRef, useState } from "react";

function Profile({
  setActiveNext,
  nickName,
  introduction,
  profileImage,
  setNickName,
  setIntroduction,
  setProfileImage,
  nickNameDuplication,
  setNickNameDuplication,
}) {
  const imageRef = useRef();
  const nickNameHandler = (e) => {
    if (e.target.value.length <= 10) setNickName(e.target.value);
    setNickNameDuplication(false);
  };
  const introductionHandler = (e) => {
    if (e.target.value.length <= 15) setIntroduction(e.target.value);
  };
  const imageHandler = () => {
    let imageFile = document.getElementById("profileImage_input").files[0];
    setProfileImage(imageFile || undefined);
  };

  useEffect(() => {
    if (nickName) setActiveNext(true);
    else setActiveNext(false);
  }, [nickName]);

  return (
    <div className="w-[614px] flex flex-col items-center gap-3 mt-12 mx-auto text-sm">
      <div className="relative flex flex-row w-full my-4">
        <input
          type="text"
          name="nickName"
          placeholder="닉네임을 입력해 주세요. (최대 10자)"
          className="w-full border-b border-darkgray focus:outline-none focus:border-primary"
          value={nickName}
          onChange={nickNameHandler}
        />
        <span
          className={`absolute left-0 text-xs text-red-500 top-6 ${
            nickNameDuplication ? "inline" : "hidden"
          }`}
        >
          이미 사용중인 닉네임입니다.
        </span>
      </div>
      <div className="relative flex flex-row w-full my-4">
        <input
          type="text"
          name="introduction"
          placeholder="(선택 사항) 15자 이내로 한줄소개를 적어주세요."
          className="w-full border-b border-darkgray focus:outline-none focus:border-primary"
          value={introduction}
          onChange={introductionHandler}
        />
      </div>
      <div className="relative w-full my-4">
        <p className="text-sm font-medium text-primary">
          (선택 사항) 프로필 사진을 업로드해주세요
        </p>
        <div className="flex justify-center h-[200px] mt-8 relative">
          <div className="w-[200px] h-[200px] bg-[#EAF4FF] border border-dashed border-primary rounded-2xl">
            {profileImage && (
              <img
                className="object-cover w-full h-full rounded-2xl"
                src={URL.createObjectURL(profileImage)}
                alt="Profile_Image"
              />
            )}
          </div>
          <div className="absolute bottom-0 left-1/2 translate-x-[120px]">
            <label htmlFor="profileImage_input">
              <button
                className="px-5 py-1 text-sm font-medium bg-white border rounded-full border-gray text-gray"
                onClick={() => imageRef.current.click()}
              >
                사진 업로드
              </button>
            </label>
            <input
              ref={imageRef}
              className="hidden"
              id="profileImage_input"
              type="file"
              accept="image/*"
              onChange={imageHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
