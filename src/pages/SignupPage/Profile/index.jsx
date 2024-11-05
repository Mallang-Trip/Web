import { useEffect, useRef } from "react";
import { CONSTANT } from "../../../utils/data";
import InputImage from "../../../components/InputImage";

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
    const imageFile = imageRef.current.files[0];
    if (imageFile.size > CONSTANT.MAX_SIZE_IMAGE)
      return alert("이미지의 용량이 너무 커서 업로드 할 수 없습니다.");
    setProfileImage(imageFile || undefined);
  };

  useEffect(() => {
    if (nickName) setActiveNext(true);
    else setActiveNext(false);
  }, [nickName]);

  return (
    <div className="w-full sm:w-3/4 mx-auto flex flex-col gap-6 mt-12">
      <div>
        <div className="block mb-2 text-base font-medium text-black">
          닉네임을 입력해 주세요. (최대 10자){" "}
          <span className="text-red-600 font-bold">*</span>
        </div>
        <input
          type="text"
          name="nickName"
          className="border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5"
          placeholder="닉네임을 입력해 주세요."
          value={nickName}
          onChange={nickNameHandler}
        />
        <p
          className={`mt-2 text-xs font-medium ${
            nickNameDuplication ? "text-red-600" : "text-white"
          }`}
        >
          이미 사용중인 닉네임입니다.
        </p>
      </div>
      <div>
        <div className="block mb-2 text-base font-medium text-black">
          (선택 사항) 15자 이내로 한줄소개를 적어주세요.
        </div>
        <input
          type="text"
          name="introduction"
          className="border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5"
          placeholder="한줄소개를 적어주세요."
          value={introduction}
          onChange={introductionHandler}
        />
      </div>
      <div className="mt-4">
        <div className="block mb-2 text-base font-medium text-black">
          (선택 사항) 프로필 사진을 업로드해주세요
        </div>
        <div className="flex justify-center h-[200px] mt-8 relative mb-12 lg:mb-0">
          <div
            className="w-[200px] h-[200px] bg-skyblue border border-dashed border-primary rounded-2xl cursor-pointer"
            onClick={() => imageRef.current.click()}
          >
            {profileImage && (
              <img
                className="object-cover w-full h-full rounded-2xl"
                src={URL.createObjectURL(profileImage)}
                alt="Profile_Image"
              />
            )}
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-12 lg:translate-x-[120px] lg:translate-y-0">
            <label htmlFor="profileImage_input">
              <button
                className="px-5 py-1 text-sm bg-white border rounded-full border-darkgray text-darkgray"
                onClick={() => imageRef.current.click()}
              >
                사진 업로드
              </button>
            </label>
            <InputImage
              id="profileImage_input"
              inputRef={imageRef}
              className="hidden"
              onChange={imageHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
