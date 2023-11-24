import Header from "./Header";
import UserProfile from "./UserProfile";
import DriverProfile from "./DriverProfile";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function MyProfilePage() {
  const user = useSelector((state) => state.user);
  const [category, setCategory] = useState("");

  const imageHandler = () => {
    let imageFile = document.getElementById("profileImage_input").files[0];
    setModifyProfileImage(imageFile || undefined);
    console.log(modifyProfileImage);
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
    <div className="max-w-screen-xl px-5 mb-24">
      <Header category={category} setCategory={setCategory} />
      {category === "여행자 프로필" ? <UserProfile /> : <DriverProfile />}
    </div>
  );
}

export default MyProfilePage;
