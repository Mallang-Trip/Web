import {
  memo,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import { uploadImage } from "@/api/image";
import { getDriverInfoDetail, putDriverInfoDetail } from "@/api/admin";
import { DriverInfo } from "@/types";
import { Loading, ConfirmModal } from "@/components";
import ProfileImage from "@/pages/MyProfilePage/DriverProfile/ProfileImage";
import ProfileHeader from "@/pages/MyProfilePage/DriverProfile/ProfileHeader";
import BasicInfo from "@/pages/MyProfilePage/DriverProfile/BasicInfo";
import Introduction from "@/pages/MyProfilePage/DriverProfile/Introduction";
import Vehicle from "@/pages/MyProfilePage/DriverProfile/Vehicle";
import Price from "@/pages/MyProfilePage/DriverProfile/Price";
import License from "@/pages/MyProfilePage/DriverProfile/License";
import PartyCourse from "./PartyCourse";

function DriverDetail() {
  const profileImageRef = useRef<HTMLInputElement | null>(null);
  const vehicleImageRef = useRef<HTMLInputElement | null>(null);
  const driverLicenseImgRef = useRef<HTMLInputElement | null>(null);
  const insuranceLicenseImgRef = useRef<HTMLInputElement | null>(null);
  const taxiLicenseImgRef = useRef<HTMLInputElement | null>(null);
  const [searchParams] = useSearchParams();
  const driverId = searchParams.get("driverId");
  const [modifyMode, setModifyMode] = useState(false);
  const [modifyProfileImage, setModifyProfileImage] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState<File | undefined>(
    undefined
  );
  const [newVehicleImages, setNewVehicleImages] = useState<(File | string)[]>(
    []
  );
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [loading, setLoading] = useState(true);
  const [driverInfo, setDriverInfo] = useState<DriverInfo>({
    accountHolder: "",
    accountNumber: "",
    bank: "",
    courses: [],
    driverLicenseImg: "",
    holidays: [],
    insuranceLicenseImg: "",
    introduction: "",
    name: "",
    phoneNumber: "",
    prices: [],
    profileImg: null,
    region: [],
    status: "",
    taxiLicenseImg: "",
    userId: 0,
    vehicleCapacity: 0,
    vehicleImgs: [],
    vehicleModel: "",
    vehicleNumber: "",
    weeklyHoliday: [],
  });

  const profileImageHandler = useCallback(() => {
    if (profileImageRef.current && profileImageRef.current.files) {
      const imageFile = profileImageRef.current.files[0];
      setNewProfileImage(imageFile || undefined);
    }
  }, [profileImageRef]);

  const vehicleImageHandler = useCallback(() => {
    if (vehicleImageRef.current && vehicleImageRef.current.files) {
      const imageFile = vehicleImageRef.current.files[0];
      setNewVehicleImages((prevImgs) => [...prevImgs, imageFile]);
    }
  }, [vehicleImageRef]);

  const modifyLicenceHandler = useCallback(
    async (key: string, licenceImgRef: RefObject<HTMLInputElement>) => {
      if (licenceImgRef.current && licenceImgRef.current.files) {
        const imageFile = licenceImgRef.current.files[0];
        const licenceImageURL = await uploadImage(imageFile);
        setDriverInfo((prevDriverInfo) => ({
          ...prevDriverInfo,
          [key]: licenceImageURL,
        }));
      }
    },
    []
  );

  const modifyProfileHandler = useCallback(async () => {
    if (!driverId) return;
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
  }, [modifyMode, newProfileImage, driverInfo, newVehicleImages, driverId]);

  const getDriverInfoDetailFunc = useCallback(async () => {
    if (!driverId) return;
    try {
      const result = await getDriverInfoDetail(driverId);
      setDriverInfo(result.payload);
      setNewVehicleImages(result.payload.vehicleImgs || []);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [driverId]);

  const autoSaveHandler = useCallback(async () => {
    if (!driverId) return;

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
      phoneNumber: driverInfo.phoneNumber.replaceAll("-", ""),
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
  }, [driverInfo, driverId, newProfileImage, newVehicleImages]);

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

    return [
      {
        key: "driverLicenseImg",
        value: driverLicenseImg ?? "",
        name: "운전 면허증",
        ref: driverLicenseImgRef,
      },
      {
        key: "taxiLicenseImg",
        value: taxiLicenseImg ?? "",
        name: "택시 운전 면허증",
        ref: taxiLicenseImgRef,
      },
      {
        key: "insuranceLicenseImg",
        value: insuranceLicenseImg ?? "",
        name: "보험증서",
        ref: insuranceLicenseImgRef,
      },
    ];
  }, [
    driverInfo,
    driverLicenseImgRef,
    insuranceLicenseImgRef,
    taxiLicenseImgRef,
  ]);

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
        licenseImgs={licenseImgs}
        modifyLicenseHandler={modifyLicenceHandler}
      />
      <ConfirmModal
        showModal={showCompleteModal}
        setShowModal={setShowCompleteModal}
        message="프로필 정보 수정이 완료되었습니다."
      />
    </div>
  );
}

export default memo(DriverDetail);
