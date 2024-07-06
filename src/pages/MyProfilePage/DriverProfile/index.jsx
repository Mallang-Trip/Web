import { useEffect, useRef, useState } from "react";
import { putDriverMyInfo } from "../../../api/driver";
import { uploadImage } from "../../../api/image";
import { CONSTANT } from "../../../utils/data";
import ProfileImage from "./ProfileImage";
import ProfileHeader from "./ProfileHeader";
import BasicInfo from "./BasicInfo";
import Introduction from "./Introduction";
import Vehicle from "./Vehicle";
import Price from "./Price";
import PartyCourse from "./PartyCourse";
import Loading from "../../../components/Loading";
import ConfirmModal from "../../../components/ConfirmModal";

function DriverProfile({ driverInfo, setDriverInfo, getMyDriverInfo }) {
  const profileImageRef = useRef();
  const vehicleImageRef = useRef();
  const [modifyMode, setModifyMode] = useState(false);
  const [modifyProfileImage, setModifyProfileImage] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState(undefined);
  const [modifyVehicleImage, setModifyVehicleImage] = useState(false);
  const [newVehicleImages, setNewVehicleImages] = useState([]);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  const profileImageHandler = () => {
    const imageFile = profileImageRef.current.files[0];
    if (imageFile.size > CONSTANT.MAX_SIZE_IMAGE)
      return alert("이미지의 용량이 너무 커서 업로드 할 수 없습니다.");
    setNewProfileImage(imageFile || undefined);
  };
  const vehicleImageHandler = () => {
    const imageFile = vehicleImageRef.current.files[0];
    if (imageFile.size > CONSTANT.MAX_SIZE_IMAGE)
      return alert("이미지의 용량이 너무 커서 업로드 할 수 없습니다.");
    setNewVehicleImages([...driverInfo.vehicleImgs, imageFile]);
  };

  const modifyProfileHandler = async () => {
    if (!modifyMode) return setModifyMode(true);

    const profileImageURL = newProfileImage
      ? await uploadImage(newProfileImage)
      : driverInfo.profileImg;

    const vehicleImageURL =
      newVehicleImages.length > 0
        ? await Promise.all(
            newVehicleImages.map((image) =>
              typeof image === "string" ? image : uploadImage(image)
            )
          )
        : driverInfo.vehicleImgs;

    const body = {
      accountHolder: driverInfo.accountHolder,
      accountNumber: driverInfo.accountNumber,
      bank: driverInfo.bank,
      holidays: driverInfo.holidays,
      introduction: driverInfo.introduction,
      phoneNumber: driverInfo.phoneNumber,
      prices: driverInfo.prices,
      profileImg: profileImageURL,
      region: driverInfo.region,
      vehicleCapacity: driverInfo.vehicleCapacity,
      vehicleImgs: vehicleImageURL,
      vehicleModel: driverInfo.vehicleModel,
      vehicleNumber: driverInfo.vehicleNumber,
      weeklyHolidays: driverInfo.weeklyHoliday,
    };

    try {
      await putDriverMyInfo(body);

      setShowCompleteModal(true);
      setModifyMode(false);
      getMyDriverInfo();
    } catch (e) {
      console.log(e);
    }
  };

  const autoSaveHandler = async () => {
    const profileImageURL = newProfileImage
      ? await uploadImage(newProfileImage)
      : driverInfo.profileImg;

    const vehicleImageURL =
      newVehicleImages.length > 0
        ? await Promise.all(newVehicleImages.map((image) => uploadImage(image)))
        : driverInfo.vehicleImg;

    const body = {
      accountHolder: driverInfo.accountHolder,
      accountNumber: driverInfo.accountNumber,
      bank: driverInfo.bank,
      holidays: driverInfo.holidays,
      introduction: driverInfo.introduction,
      phoneNumber: driverInfo.phoneNumber,
      prices: driverInfo.prices,
      profileImg: profileImageURL,
      region: driverInfo.region,
      vehicleCapacity: driverInfo.vehicleCapacity,
      vehicleImgs: vehicleImageURL,
      vehicleModel: driverInfo.vehicleModel,
      vehicleNumber: driverInfo.vehicleNumber,
      weeklyHolidays: driverInfo.weeklyHoliday,
    };

    try {
      await putDriverMyInfo(body);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!modifyMode || !autoSave) return;
    setAutoSave(false);
    setTimeout(() => setAutoSave(true), 2000);
  }, [newProfileImage, newVehicleImages, driverInfo]);

  useEffect(() => {
    if (!modifyMode || !autoSave) return;
    autoSaveHandler();
  }, [autoSave]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  if (!driverInfo.userId) return <Loading full={true} />;
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
        autoSave={autoSave}
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
        vehicleImageRef={vehicleImageRef}
        modifyVehicleImage={modifyVehicleImage}
        setModifyVehicleImage={setModifyVehicleImage}
        newVehicleImages={newVehicleImages}
        vehicleImageHandler={vehicleImageHandler}
      />
      <Price
        modifyMode={modifyMode}
        driverInfo={driverInfo}
        setDriverInfo={setDriverInfo}
      />
      <PartyCourse driverInfo={driverInfo} />

      <ConfirmModal
        showModal={showCompleteModal}
        setShowModal={setShowCompleteModal}
        message="프로필 정보 수정이 완료되었습니다."
      />
    </>
  );
}

export default DriverProfile;
