import {
  Dispatch,
  ForwardedRef,
  memo,
  SetStateAction,
  useCallback,
} from "react";
import { DriverInfo } from "@/types";
import { InputImage } from "@/components";
import basicProfileImage from "@/assets/images/profileImage.png";

interface Props {
  modifyMode: boolean;
  setModifyProfileImage: Dispatch<SetStateAction<boolean>>;
  newProfileImage: string | File | undefined;
  driverInfo: DriverInfo;
  modifyProfileImage: boolean;
  profileImageRef: ForwardedRef<HTMLInputElement>;
  profileImageHandler: () => void;
}

function ProfileImage({
  modifyMode,
  setModifyProfileImage,
  newProfileImage,
  driverInfo,
  modifyProfileImage,
  profileImageRef,
  profileImageHandler,
}: Props) {
  const clickHandler = useCallback(() => {
    if (
      profileImageRef &&
      "current" in profileImageRef &&
      profileImageRef.current
    ) {
      profileImageRef.current.click();
    }
  }, [profileImageRef]);

  return (
    <div className="flex justify-center mt-5">
      <div
        className="w-[170px] h-[170px] rounded-full relative"
        onMouseEnter={() => modifyMode && setModifyProfileImage(true)}
        onMouseLeave={() => modifyMode && setModifyProfileImage(false)}
      >
        <img
          src={
            newProfileImage instanceof File
              ? URL.createObjectURL(newProfileImage)
              : driverInfo.profileImg || basicProfileImage
          }
          alt={driverInfo.name}
          className="w-full h-full rounded-full object-cover"
        />
        {modifyProfileImage && (
          <>
            <div
              className="absolute top-0 left-0 w-full h-full rounded-full flex justify-center items-center bg-black bg-opacity-50 cursor-pointer"
              onClick={clickHandler}
            >
              <div className="whitespace-pre-line text-center text-sm text-white">
                {"프로필 사진\n변경하기"}
              </div>
            </div>
          </>
        )}
        <InputImage
          inputRef={profileImageRef}
          className="hidden"
          id="profileImage_Input_Driver"
          onChange={profileImageHandler}
        />
      </div>
    </div>
  );
}

export default memo(ProfileImage);
