import { useEffect, useRef, useState } from "react";
import { getDriverMyInfo } from "../../../api/driver";
import ProfileImage from "./ProfileImage";
import ProfileHeader from "./ProfileHeader";
import BasicInfo from "./BasicInfo";
import Introduction from "./Introduction";
import Vehicle from "./Vehicle";
import Price from "./Price";
import PartyCourse from "./PartyCourse";

function DriverProfile() {
  const profileImageRef = useRef();
  const [modifyMode, setModifyMode] = useState(false);
  const [modifyProfileImage, setModifyProfileImage] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState(undefined);
  const [driverInfo, setDriverInfo] = useState({
    userId: 0,
    profileImg: "",
    name: "",
    region: "",
    weeklyHoliday: [],
    bank: "",
    accountNumber: "",
    phoneNumber: "",
    introduction: "",
    vehicleModel: "",
    vehicleCapacity: 0,
    vehicleImg: "",
    prices: [],
    courses: "",
  });

  const profileImageHandler = () => {
    const imageFile = profileImageRef.current.files[0];
    setNewProfileImage(imageFile || undefined);
  };

  const modifyProfileHandler = async () => {
    if (!modifyMode) return setModifyMode(true);
    // const profileImageURL = modifyProfileImage
    //   ? await uploadProfileImage(modifyProfileImage)
    //   : user.profileImg;
    // try {
    //   await putProfile({
    //     email: email,
    //     introduction: introduction,
    //     nickname: user.nickname,
    //     profileImg: profileImageURL,
    //   });
    //   alert("프로필 정보가 성공적으로 수정되었습니다.");
    //   window.location.reload();
    // } catch (e) {
    //   console.log(e);
    // }
  };

  const getMyDriverInfo = async () => {
    try {
      const result = await getDriverMyInfo();
      setDriverInfo(result.payload);
      console.log(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMyDriverInfo();
  }, []);

  if (!driverInfo.userId) return null;
  return (
    <>
      <ProfileImage
        modifyMode={modifyMode}
        setModifyProfileImage={setModifyProfileImage}
        newProfileImage={newProfileImage}
        driverInfo={driverInfo}
        modifyProfileImage={modifyProfileImage}
        profileImageRef={profileImageRef}
        profileImageHandler={profileImageHandler}
      />
      <ProfileHeader
        driverInfo={driverInfo}
        modifyProfileHandler={modifyProfileHandler}
        modifyMode={modifyMode}
      />
      <BasicInfo
        modifyMode={modifyMode}
        driverInfo={driverInfo}
        setDriverInfo={setDriverInfo}
      />
      <Introduction
        modifyMode={modifyMode}
        driverInfo={driverInfo}
        setDriverInfo={setDriverInfo}
      />
      <Vehicle
        modifyMode={modifyMode}
        driverInfo={driverInfo}
        setDriverInfo={setDriverInfo}
      />
      <Price
        modifyMode={modifyMode}
        driverInfo={driverInfo}
        setDriverInfo={setDriverInfo}
      />
      <PartyCourse driverInfo={driverInfo} />
    </>
  );
}

export default DriverProfile;
