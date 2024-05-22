import { useSelector } from "react-redux";
import basicProfileImage from "../../../../assets/images/profileImage.png";

function ProfileImage({
  modifyMode,
  modifyImage,
  setModifyImage,
  modifyProfileImage,
  imageHandler,
  imageRef,
}) {
  const user = useSelector((state) => state.user);

  return (
    <div className="flex justify-center mt-5">
      <div
        className="w-[170px] h-[170px] rounded-full relative"
        onMouseEnter={() => modifyMode && setModifyImage(true)}
        onMouseLeave={() => modifyMode && setModifyImage(false)}
      >
        <img
          src={
            modifyProfileImage
              ? URL.createObjectURL(modifyProfileImage)
              : user.profileImg || basicProfileImage
          }
          alt="profileImage"
          className="w-full h-full rounded-full object-cover"
        />
        {modifyImage && (
          <>
            <div
              className="absolute top-0 left-0 w-full h-full rounded-full flex justify-center items-center bg-black bg-opacity-50 cursor-pointer"
              onClick={() => imageRef.current.click()}
            >
              <div className="whitespace-pre-line text-center text-sm text-white">
                {"프로필 사진\n변경하기"}
              </div>
            </div>
            <input
              ref={imageRef}
              className="hidden"
              id="profileImage_input"
              type="file"
              accept="image/*"
              onChange={imageHandler}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileImage;
