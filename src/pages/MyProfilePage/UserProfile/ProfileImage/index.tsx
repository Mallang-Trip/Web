import {
  Dispatch,
  ForwardedRef,
  memo,
  SetStateAction,
  useCallback,
} from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import InputImage from "../../../../components/InputImage";
import basicProfileImage from "../../../../assets/images/profileImage.png";

interface Props {
  modifyMode: boolean;
  modifyImage: boolean;
  setModifyImage: Dispatch<SetStateAction<boolean>>;
  modifyProfileImage: File | undefined;
  imageHandler: () => void;
  imageRef: ForwardedRef<HTMLInputElement>;
}

function ProfileImage({
  modifyMode,
  modifyImage,
  setModifyImage,
  modifyProfileImage,
  imageHandler,
  imageRef,
}: Props) {
  const user = useSelector((state: RootState) => state.user);

  const clickHandler = useCallback(() => {
    if (imageRef && "current" in imageRef && imageRef.current) {
      imageRef.current.click();
    }
  }, [imageRef]);

  return (
    <div className="flex justify-center mt-5">
      <div
        className="w-[170px] h-[170px] rounded-full relative"
        onMouseEnter={() => modifyMode && setModifyImage(true)}
        onMouseLeave={() => modifyMode && setModifyImage(false)}
      >
        <img
          src={
            modifyProfileImage instanceof File
              ? URL.createObjectURL(modifyProfileImage)
              : user.profileImg || basicProfileImage
          }
          alt={user.nickname}
          className="w-full h-full rounded-full object-cover"
        />
        {modifyImage && (
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
          inputRef={imageRef}
          className="hidden"
          id="profileImage_input"
          onChange={imageHandler}
        />
      </div>
    </div>
  );
}

export default memo(ProfileImage);
