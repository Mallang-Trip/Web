import basicProfileImage from "../../../../assets/images/profileImage.png";

function ProfileImage({
  modifyMode,
  setModifyProfileImage,
  newProfileImage,
  driverInfo,
  modifyProfileImage,
  profileImageRef,
  profileImageHandler,
}) {
  return (
    <div className="flex justify-center mt-5">
      <div
        className="w-[170px] h-[170px] rounded-full relative"
        onMouseEnter={() => modifyMode && setModifyProfileImage(true)}
        onMouseLeave={() => modifyMode && setModifyProfileImage(false)}
      >
        <img
          src={
            newProfileImage
              ? URL.createObjectURL(newProfileImage)
              : driverInfo.profileImg || basicProfileImage
          }
          alt="profileImage"
          className="w-full h-full rounded-full object-cover"
        />
        {modifyProfileImage && (
          <>
            <div
              className="absolute top-0 left-0 w-full h-full rounded-full flex justify-center items-center bg-black bg-opacity-50 cursor-pointer"
              onClick={() => profileImageRef.current.click()}
            >
              <div className="whitespace-pre-line text-center text-sm text-white">
                {"프로필 사진\n변경하기"}
              </div>
            </div>
            <input
              ref={profileImageRef}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={profileImageHandler}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileImage;
