import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { putDriverMyInfo } from "@/api/driver";
import { uploadImage } from "@/api/image";
import { DriverInfo } from "@/types";
import { Loading, ConfirmModal } from "@/components";
import ProfileImage from "./ProfileImage";
import ProfileHeader from "./ProfileHeader";
import BasicInfo from "./BasicInfo";
import Introduction from "./Introduction";
import Vehicle from "./Vehicle";
import Price from "./Price";
import PartyCourse from "./PartyCourse";
import NoData from "./NoData";

interface Props {
  driverInfo: DriverInfo;
  setDriverInfo: Dispatch<SetStateAction<DriverInfo>>;
  getMyDriverInfo: () => void;
}

function DriverProfile({ driverInfo, setDriverInfo, getMyDriverInfo }: Props) {
  const profileImageRef = useRef<HTMLInputElement | null>(null);
  const vehicleImageRef = useRef<HTMLInputElement | null>(null);
  const [modifyMode, setModifyMode] = useState(false);
  const [modifyProfileImage, setModifyProfileImage] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState<File | undefined>(
    undefined
  );
  const [newVehicleImages, setNewVehicleImages] = useState<(string | File)[]>(
    []
  );
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  const profileImageHandler = useCallback(() => {
    if (profileImageRef.current && profileImageRef.current.files) {
      const imageFile = profileImageRef.current.files[0];
      setNewProfileImage(imageFile || undefined);
    }
  }, [profileImageRef]);

  const vehicleImageHandler = useCallback(() => {
    if (vehicleImageRef.current && vehicleImageRef.current.files) {
      const imageFile = vehicleImageRef.current.files[0];
      setNewVehicleImages([...newVehicleImages, imageFile]);
    }
  }, [vehicleImageRef, newVehicleImages]);

  const modifyProfileHandler = useCallback(async () => {
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
      phoneNumber: driverInfo.phoneNumber.replaceAll("-", ""),
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
  }, [modifyMode, newProfileImage, newVehicleImages, driverInfo]);

  const autoSaveHandler = useCallback(async () => {
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
        : newVehicleImages;

    const body = {
      accountHolder: driverInfo.accountHolder,
      accountNumber: driverInfo.accountNumber,
      bank: driverInfo.bank,
      holidays: driverInfo.holidays,
      introduction: driverInfo.introduction,
      phoneNumber: driverInfo.phoneNumber.replaceAll("-", ""),
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
  }, [newProfileImage, newVehicleImages, driverInfo]);

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
    if (!driverInfo?.vehicleImgs) return;
    setNewVehicleImages(driverInfo.vehicleImgs);
  }, [driverInfo]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  if (!driverInfo) return <NoData />;
  if (!driverInfo?.userId) return <Loading full={true} />;
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

      <ConfirmModal
        showModal={showCompleteModal}
        setShowModal={setShowCompleteModal}
        message="프로필 정보 수정이 완료되었습니다."
      />
    </>
  );
}

export default memo(DriverProfile);
