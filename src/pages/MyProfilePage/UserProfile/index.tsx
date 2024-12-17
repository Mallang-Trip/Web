import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { __asyncAuth } from "@/redux/modules/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { uploadProfileImage } from "@/api/image";
import { putProfile } from "@/api/profile";
import { ConfirmModal } from "@/components";
import ProfileImage from "./ProfileImage";
import ProfileHeader from "./ProfileHeader";
import BasicInfo from "./BasicInfo";
import LoginInfo from "./LoginInfo";

function UserProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const imageRef = useRef<HTMLInputElement | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const [modifyMode, setModifyMode] = useState(false);
  const [modifyImage, setModifyImage] = useState(false);
  const [phoneNumber] = useState(user.phoneNumber);
  const [introduction, setIntroduction] = useState(user.introduction);
  const [email, setEmail] = useState(user.email);
  const [modifyProfileImage, setModifyProfileImage] = useState<
    File | undefined
  >(undefined);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  const imageHandler = useCallback(() => {
    if (imageRef.current && imageRef.current.files) {
      const imageFile = imageRef.current.files[0];
      setModifyProfileImage(imageFile || undefined);
    }
  }, [imageRef]);

  const introductionHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length <= 15) setIntroduction(e.target.value);
    },
    []
  );

  const emailHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    []
  );

  const modifyProfileHandler = useCallback(async () => {
    if (!modifyMode) return setModifyMode(true);

    const profileImageURL = modifyProfileImage
      ? await uploadProfileImage(modifyProfileImage)
      : user.profileImg;

    try {
      await putProfile({
        email: email,
        introduction: introduction,
        nickname: user.nickname,
        profileImg: profileImageURL,
      });

      setShowCompleteModal(true);
      setModifyMode(false);
      dispatch(__asyncAuth());
    } catch (e) {
      console.log(e);
    }
  }, [user, modifyMode, modifyProfileImage, email, introduction]);

  const autoSaveHandler = useCallback(async () => {
    const profileImageURL = modifyProfileImage
      ? await uploadProfileImage(modifyProfileImage)
      : user.profileImg;

    try {
      await putProfile({
        email: email,
        introduction: introduction,
        nickname: user.nickname,
        profileImg: profileImageURL,
      });
      dispatch(__asyncAuth());
    } catch (e) {
      console.log(e);
    }
  }, [user, modifyProfileImage, email, introduction]);

  useEffect(() => {
    if (!modifyMode || !autoSave) return;
    setAutoSave(false);
    setTimeout(() => setAutoSave(true), 2000);
  }, [email, introduction, modifyProfileImage]);

  useEffect(() => {
    if (!modifyMode || !autoSave) return;
    autoSaveHandler();
  }, [autoSave]);

  return (
    <>
      <ProfileImage
        modifyMode={modifyMode}
        modifyImage={modifyImage}
        setModifyImage={setModifyImage}
        modifyProfileImage={modifyProfileImage}
        imageHandler={imageHandler}
        imageRef={imageRef}
      />
      <ProfileHeader
        autoSave={autoSave}
        modifyMode={modifyMode}
        modifyProfileHandler={modifyProfileHandler}
      />
      <BasicInfo
        modifyMode={modifyMode}
        phoneNumber={phoneNumber}
        introduction={introduction}
        introductionHandler={introductionHandler}
      />
      <LoginInfo
        modifyMode={modifyMode}
        email={email}
        emailHandler={emailHandler}
      />

      <ConfirmModal
        showModal={showCompleteModal}
        setShowModal={setShowCompleteModal}
        message="프로필 정보 수정이 완료되었습니다."
      />
    </>
  );
}

export default memo(UserProfile);
