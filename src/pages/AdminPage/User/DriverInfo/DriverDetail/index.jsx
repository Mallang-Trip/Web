import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getDriverInfoDetail,
  putDriverInfoDetail,
} from "../../../../../api/admin";
import { uploadImage } from "../../../../../api/image";
import { MAX_SIZE_IMAGE } from "../../../../../global";
import Loading from "../../../../../components/Loading";
import ConfirmModal from "../../../../../components/ConfirmModal";
import ProfileImage from "../../../../../pages/MyProfilePage/DriverProfile/ProfileImage";
import ProfileHeader from "../../../../../pages/MyProfilePage/DriverProfile/ProfileHeader";
import BasicInfo from "../../../../../pages/MyProfilePage/DriverProfile/BasicInfo";
import Introduction from "../../../../../pages/MyProfilePage/DriverProfile/Introduction";
import Vehicle from "../../../../../pages/MyProfilePage/DriverProfile/Vehicle";
import Price from "../../../../../pages/MyProfilePage/DriverProfile/Price";
import PartyCourse from "./PartyCourse";

function DriverDetail() {
  const profileImageRef = useRef();
  const vehicleImageRef = useRef();
  const [searchParams] = useSearchParams();
  const [driverInfo, setDriverInfo] = useState({});
  const [modifyMode, setModifyMode] = useState(false);
  const [modifyProfileImage, setModifyProfileImage] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState(undefined);
  const [modifyVehicleImage, setModifyVehicleImage] = useState(false);
  const [newVehicleImage, setNewVehicleImage] = useState(undefined);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const driverId = searchParams.get("driverId");

  const profileImageHandler = () => {
    const imageFile = profileImageRef.current.files[0];
    if (imageFile.size > MAX_SIZE_IMAGE)
      return alert("이미지의 용량이 너무 커서 업로드 할 수 없습니다.");
    setNewProfileImage(imageFile || undefined);
  };
  const vehicleImageHandler = () => {
    const imageFile = vehicleImageRef.current.files[0];
    if (imageFile.size > MAX_SIZE_IMAGE)
      return alert("이미지의 용량이 너무 커서 업로드 할 수 없습니다.");
    setNewVehicleImage(imageFile || undefined);
  };

  const modifyProfileHandler = async () => {
    if (!modifyMode) return setModifyMode(true);

    const profileImageURL = newProfileImage
      ? await uploadImage(newProfileImage)
      : driverInfo.profileImg;

    const vehicleImageURL = newVehicleImage
      ? await uploadImage(newVehicleImage)
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
      vehicleImg: vehicleImageURL,
      vehicleModel: driverInfo.vehicleModel,
      vehicleNumber: driverInfo.vehicleNumber,
      weeklyHolidays: driverInfo.weeklyHoliday,
    };

    try {
      await putDriverInfoDetail(driverId, body);
      setShowCompleteModal(true);
      setModifyMode(false);
      getDriverInfoDetailFunc();
    } catch (e) {
      console.log(e);
    }
  };

  const getDriverInfoDetailFunc = async () => {
    try {
      const result = await getDriverInfoDetail(driverId);
      setDriverInfo(result.payload);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    getDriverInfoDetailFunc();
  }, [driverId]);

  if (loading) return <Loading full={true} />;
  return (
    <div className="text-base text-black font-medium">
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
        vehicleImageRef={vehicleImageRef}
        modifyVehicleImage={modifyVehicleImage}
        setModifyVehicleImage={setModifyVehicleImage}
        newVehicleImage={newVehicleImage}
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
    </div>
  );
}

export default DriverDetail;