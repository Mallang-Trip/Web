import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { __asyncAuth } from "../../../redux/modules/userSlice";
import { uploadProfileImage } from "../../../api/image";
import { putProfile } from "../../../api/profile";
import { CONSTANT } from "../../../utils/data";
import ConfirmModal from "../../../components/ConfirmModal";
import ProfileImage from "./ProfileImage";
import ProfileHeader from "./ProfileHeader";
import BasicInfo from "./BasicInfo";
import LoginInfo from "./LoginInfo";

function UserProfile() {
  const dispatch = useDispatch();
  const imageRef = useRef();
  const user = useSelector((state) => state.user);
  const [modifyMode, setModifyMode] = useState(false);
  const [modifyImage, setModifyImage] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [introduction, setIntroduction] = useState(user.introduction);
  const [email, setEmail] = useState(user.email);
  const [modifyProfileImage, setModifyProfileImage] = useState(undefined);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  const imageHandler = () => {
    const imageFile = imageRef.current.files[0];
    if (imageFile.size > CONSTANT.MAX_SIZE_IMAGE)
      return alert("이미지의 용량이 너무 커서 업로드 할 수 없습니다.");
    setModifyProfileImage(imageFile || undefined);
  };
  const introductionHandler = (e) => {
    if (e.target.value.length <= 15) setIntroduction(e.target.value);
  };
  const phoneNumberHandler = (e) => setPhoneNumber(e.target.value);
  const emailHandler = (e) => setEmail(e.target.value);

  const modifyProfileHandler = async () => {
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
  };

  const autoSaveHandler = async () => {
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
  };

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
        phoneNumberHandler={phoneNumberHandler}
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

export default UserProfile;
