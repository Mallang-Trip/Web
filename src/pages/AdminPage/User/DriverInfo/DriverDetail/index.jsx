import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getDriverInfoDetail,
  putDriverInfoDetail,
} from "../../../../../api/admin";
import { uploadImage } from "../../../../../api/image";
import { CONSTANT } from "../../../../../utils/data";
import Loading from "../../../../../components/Loading";
import ConfirmModal from "../../../../../components/ConfirmModal";
import ProfileImage from "../../../../../pages/MyProfilePage/DriverProfile/ProfileImage";
import ProfileHeader from "../../../../../pages/MyProfilePage/DriverProfile/ProfileHeader";
import BasicInfo from "../../../../../pages/MyProfilePage/DriverProfile/BasicInfo";
import Introduction from "../../../../../pages/MyProfilePage/DriverProfile/Introduction";
import Vehicle from "../../../../../pages/MyProfilePage/DriverProfile/Vehicle";
import Price from "../../../../../pages/MyProfilePage/DriverProfile/Price";
import PartyCourse from "./PartyCourse";
import License from "../../../../MyProfilePage/DriverProfile/License";

function DriverDetail() {
  const profileImageRef = useRef();
  const vehicleImageRef = useRef();
  const licenseImgRef = useRef();
  const [searchParams] = useSearchParams();
  const [driverInfo, setDriverInfo] = useState({});
  const [modifyMode, setModifyMode] = useState(false);
  const [modifyProfileImage, setModifyProfileImage] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState(undefined);
  const [newVehicleImages, setNewVehicleImages] = useState([]);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [loading, setLoading] = useState(true);
  const newLicenseImage = [
    "driverLicenseImg",
    "taxiLicenseImg",
    "insuranceLicenseImg",
  ];
  const driverId = searchParams.get("driverId");
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
    setNewVehicleImages((prevImgs) => [...prevImgs, imageFile]);
  };

  const modifyLicenseHandler = async (index) => {
    const imageFile = licenseImgRef.current.files[0];
    if (imageFile.size > CONSTANT.MAX_SIZE_IMAGE)
      return alert("이미지의 용량이 너무 커서 업로드 할 수 없습니다.");
    const licenseImageURL = await uploadImage(imageFile);

    setDriverInfo((prevDriverInfo) => ({
      ...prevDriverInfo,
      [newLicenseImage[index]]: licenseImageURL,
    }));
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
      phoneNumber: driverInfo.phoneNumber.replace("-", ""),
      prices: driverInfo.prices,
      profileImg: profileImageURL,
      region: driverInfo.region,
      vehicleCapacity: driverInfo.vehicleCapacity,
      vehicleImgs: vehicleImageURL,
      vehicleModel: driverInfo.vehicleModel,
      vehicleNumber: driverInfo.vehicleNumber,
      weeklyHolidays: driverInfo.weeklyHoliday,
      driverLicenseImg: driverInfo.driverLicenseImg,
      taxiLicenseImg: driverInfo.taxiLicenseImg,
      insuranceLicenseImg: driverInfo.insuranceLicenseImg,
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
      setNewVehicleImages(result.payload.vehicleImgs || []);
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const autoSaveHandler = async () => {
    const profileImageURL = newProfileImage
      ? await uploadImage(newProfileImage)
      : driverInfo.profileImg;

    const vehicleImageURLs =
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
      phoneNumber: driverInfo.phoneNumber.replace("-", ""),
      prices: driverInfo.prices,
      profileImg: profileImageURL,
      region: driverInfo.region,
      vehicleCapacity: driverInfo.vehicleCapacity,
      vehicleImgs: vehicleImageURLs,
      vehicleModel: driverInfo.vehicleModel,
      vehicleNumber: driverInfo.vehicleNumber,
      weeklyHolidays: driverInfo.weeklyHoliday,
      driverLicenseImg: driverInfo.driverLicenseImg,
      taxiLicenseImg: driverInfo.taxiLicenseImg,
      insuranceLicenseImg: driverInfo.insuranceLicenseImg,
    };

    try {
      await putDriverInfoDetail(driverId, body);
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
    window.scrollTo({ top: 0 });
    getDriverInfoDetailFunc();
  }, [driverId]);

  const licenseImgs = useMemo(() => {
    const driverLicenseImg = driverInfo.driverLicenseImg;
    const taxiLicenseImg = driverInfo.taxiLicenseImg;
    const insuranceLicenseImg = driverInfo.insuranceLicenseImg;
    return [driverLicenseImg, taxiLicenseImg, insuranceLicenseImg];
  }, [driverInfo]);

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
        newVehicleImages={newVehicleImages}
        vehicleImageHandler={vehicleImageHandler}
        setNewVehicleImages={setNewVehicleImages}
      />
      <Price
        modifyMode={modifyMode}
        driverInfo={driverInfo}
        setDriverInfo={setDriverInfo}
      />
      <PartyCourse driverInfo={driverInfo} />
      <License
        modifyMode={modifyMode}
        driverInfo={driverInfo}
        setDriverInfo={setDriverInfo}
        licenseImgs={licenseImgs}
        licenseImgRef={licenseImgRef}
        modifyLicenseHandler={modifyLicenseHandler}
      />
      <ConfirmModal
        showModal={showCompleteModal}
        setShowModal={setShowCompleteModal}
        message="프로필 정보 수정이 완료되었습니다."
      />
    </div>
  );
}

export default DriverDetail;
