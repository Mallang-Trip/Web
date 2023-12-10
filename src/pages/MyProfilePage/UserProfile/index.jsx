import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { uploadProfileImage } from "../../../api/image";
import { putProfile } from "../../../api/profile";
import ProfileImage from "./ProfileImage";
import ProfileHeader from "./ProfileHeader";
import BasicInfo from "./BasicInfo";
import LoginInfo from "./LoginInfo";

function UserProfile() {
  const imageRef = useRef();
  const user = useSelector((state) => state.user);
  const [modifyMode, setModifyMode] = useState(false);
  const [modifyImage, setModifyImage] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [introduction, setIntroduction] = useState(user.introduction);
  const [email, setEmail] = useState(user.email);
  const [modifyProfileImage, setModifyProfileImage] = useState(undefined);

  const imageHandler = () => {
    const imageFile = imageRef.current.files[0];
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

      alert("프로필 정보가 성공적으로 수정되었습니다.");
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

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
    </>
  );
}

export default UserProfile;
