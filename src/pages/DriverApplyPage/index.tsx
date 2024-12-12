import { memo, useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { __asyncRefreshAuth } from "../../redux/modules/userSlice";
import { AppDispatch, RootState } from "../../redux/store";
import {
  postDriverApply,
  getDriverApply,
  putDriverApply,
} from "../../api/driver";
import { uploadImage } from "../../api/image";
import PageContainer from "../../components/PageContainer";
import Loading from "../../components/Loading";
import Title from "./Title";
import Stepper from "./Stepper";
import CarInfo from "./CarInfo";
import StepButton from "./StepButton";
import RegionList from "./RegionList";
import Accout from "./Accout";
import DriverDocument from "./DriverDocument";
import Introduction from "./Introduction";
import Complete from "./Complete";
import DriverAccept from "./DriverAccept";
import Agreement from "./Agreement";

function DriverApplyPage() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const [step, setStep] = useState(0);
  const [activeNext, setActiveNext] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [driverId, setDriverId] = useState(0);
  const [allChecked, setAllChecked] = useState(false);
  const [checked, setChecked] = useState([false, false, false]);
  const [carImages, setCarImages] = useState<string[] | null>([]);
  const [modelName, setModelName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [maxNum, setMaxNum] = useState("");
  const [region, setRegion] = useState<string[]>([]);
  const [bank, setBank] = useState("");
  const [name, setName] = useState("");
  const [accoutNumber, setAccoutNumber] = useState("");
  const [hour, setHour] = useState(["", "", "", "", "", "", "", "", "", ""]);
  const [money, setMoney] = useState(["", "", "", "", "", "", "", "", "", ""]);
  const [driverLicense, setDriverLicense] = useState<string | undefined>(
    undefined
  );
  const [taxiLicense, setTaxiLicense] = useState<string | undefined>(undefined);
  const [insurance, setInsurance] = useState<string | undefined>(undefined);
  const [introduction, setIntroduction] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const submitHandler = useCallback(async () => {
    if (submitLoading) return;

    setSubmitLoading(true);

    const carImageURLs =
      carImages && carImages.length > 0
        ? await Promise.all(
            carImages.map((image) =>
              typeof image === "string" ? image : uploadImage(image)
            )
          )
        : null;

    const driverLicenseURL = !driverLicense
      ? null
      : typeof driverLicense === "string"
        ? driverLicense
        : await uploadImage(driverLicense);
    const taxiLicenseURL = !taxiLicense
      ? null
      : typeof taxiLicense === "string"
        ? taxiLicense
        : await uploadImage(taxiLicense);
    const insuranceURL = !insurance
      ? null
      : typeof insurance === "string"
        ? insurance
        : await uploadImage(insurance);

    const prices = [];
    for (let i = 0; i < 10; i++) {
      if (hour[i] && money[i])
        prices.push({
          hours: Number(hour[i]),
          price: parseFloat(money[i].replace(/,/g, "")),
        });
    }

    try {
      const body = {
        accountHolder: name,
        accountNumber: accoutNumber,
        bank: bank,
        driverLicenceImg: driverLicenseURL,
        insuranceLicenceImg: insuranceURL,
        introduction: introduction,
        prices: prices,
        region: region,
        taxiLicenceImg: taxiLicenseURL,
        vehicleCapacity: Number(maxNum),
        vehicleImgs: carImageURLs,
        vehicleModel: modelName,
        vehicleNumber: vehicleNumber,
      };

      driverId ? await putDriverApply(body) : await postDriverApply(body);
      setStep(step + 1);
      setShowModal(false);
      localStorage.removeItem("driverApplyBackup");
    } catch (e) {
      alert("오류가 발생했습니다.");
      setShowModal(false);
    } finally {
      setSubmitLoading(false);
    }
  }, [
    driverId,
    submitLoading,
    step,
    carImages,
    driverLicense,
    taxiLicense,
    insurance,
    hour,
    money,
    name,
    accoutNumber,
    bank,
    introduction,
    region,
    maxNum,
    modelName,
    vehicleNumber,
  ]);

  const getDriverApplyFunc = useCallback(async () => {
    try {
      const result = await getDriverApply();

      if (result.statusCode === 200) {
        const backupData = JSON.parse(
          localStorage.getItem("driverApplyBackup") || ""
        );

        setStep(backupData?.step || 0);
        setChecked(backupData?.checked || [false, false, false]);
        setCarImages(backupData?.carImages || result.payload.vehicleImgs);
        setModelName(backupData?.modelName || result.payload.vehicleModel);
        setVehicleNumber(
          backupData?.vehicleNumber || result.payload.vehicleNumber
        );
        setMaxNum(
          backupData?.maxNum || result.payload.vehicleCapacity.toString()
        );
        setRegion(backupData?.region || result.payload.region);
        setBank(backupData?.bank || result.payload.bank);
        setName(backupData?.name || result.payload.accountHolder);
        setAccoutNumber(
          backupData?.accoutNumber || result.payload.accountNumber
        );
        setDriverLicense(
          backupData?.driverLicense || result.payload.driverLicenceImg
        );
        setTaxiLicense(
          backupData?.taxiLicense || result.payload.taxiLicenceImg
        );
        setInsurance(
          backupData?.insurance || result.payload.insuranceLicenceImg
        );
        setIntroduction(
          backupData?.introduction || result.payload.introduction
        );
        setDriverId(result.payload.driverId || 0);

        const hours = ["", "", "", "", "", "", "", "", "", ""];
        const moneys = ["", "", "", "", "", "", "", "", "", ""];
        result.payload.prices.forEach(
          (item: { hours: number; price: number }, index: number) => {
            hours[index] = item.hours.toString();
            moneys[index] = item.price.toString();
          }
        );
        setHour(backupData?.hour || hours);
        setMoney(backupData?.money || moneys);

        if (result.payload.status === "WAITING") setStep(6);
        else if (result.payload.status === "REFUSED") setStep(7);
        else if (result.payload.status === "ACCEPTED") {
          setStep(8);
          dispatch(__asyncRefreshAuth());
        }
      } else {
        const backupData = JSON.parse(
          localStorage.getItem("driverApplyBackup") || ""
        );
        if (!backupData) return;

        setStep(backupData.step);
        setChecked(backupData.checked);
        setCarImages(backupData.carImages);
        setModelName(backupData.modelName);
        setVehicleNumber(backupData.vehicleNumber);
        setMaxNum(backupData.maxNum);
        setRegion(backupData.region);
        setBank(backupData.bank);
        setName(backupData.name);
        setAccoutNumber(backupData.accoutNumber);
        setHour(backupData.hour);
        setMoney(backupData.money);
        setDriverLicense(backupData.driverLicense);
        setTaxiLicense(backupData.taxiLicense);
        setInsurance(backupData.insurance);
        setIntroduction(backupData.introduction);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (loading || step > 5) return;

    const data = {
      step: step,
      checked: checked,
      carImages: carImages,
      modelName: modelName,
      vehicleNumber: vehicleNumber,
      maxNum: maxNum,
      region: region,
      bank: bank,
      name: name,
      accoutNumber: accoutNumber,
      hour: hour,
      money: money,
      driverLicense: driverLicense,
      taxiLicense: taxiLicense,
      insurance: insurance,
      introduction: introduction,
    };
    localStorage.setItem("driverApplyBackup", JSON.stringify(data));

    if (autoSave) setAutoSave(false);
  }, [
    step,
    checked,
    carImages,
    modelName,
    vehicleNumber,
    maxNum,
    region,
    bank,
    name,
    accoutNumber,
    hour,
    money,
    driverLicense,
    taxiLicense,
    insurance,
    introduction,
  ]);

  useEffect(() => {
    if (user.role === "ROLE_DRIVER") {
      setStep(8);
      setLoading(false);
    } else getDriverApplyFunc();
  }, []);

  useEffect(() => window.scrollTo({ top: 0 }), [step]);

  if (loading) return <Loading full={true} />;
  return (
    <PageContainer>
      <Title step={step} />
      <Stepper step={step} />

      {step === 0 && (
        <Agreement
          setActiveNext={setActiveNext}
          allChecked={allChecked}
          setAllChecked={setAllChecked}
          checked={checked}
          setChecked={setChecked}
        />
      )}
      {step === 1 && (
        <CarInfo
          setActiveNext={setActiveNext}
          carImages={carImages}
          setCarImages={setCarImages}
          modelName={modelName}
          setModelName={setModelName}
          vehicleNumber={vehicleNumber}
          setVehicleNumber={setVehicleNumber}
          maxNum={maxNum}
          setMaxNum={setMaxNum}
        />
      )}
      {step === 2 && (
        <RegionList
          setActiveNext={setActiveNext}
          region={region}
          setRegion={setRegion}
        />
      )}
      {step === 3 && (
        <Accout
          setActiveNext={setActiveNext}
          bank={bank}
          setBank={setBank}
          name={name}
          setName={setName}
          accoutNumber={accoutNumber}
          setAccoutNumber={setAccoutNumber}
          hour={hour}
          setHour={setHour}
          money={money}
          setMoney={setMoney}
        />
      )}
      {step === 4 && (
        <DriverDocument
          setActiveNext={setActiveNext}
          driverLicense={driverLicense}
          setDriverLicense={setDriverLicense}
          taxiLicense={taxiLicense}
          setTaxiLicense={setTaxiLicense}
          insurance={insurance}
          setInsurance={setInsurance}
        />
      )}
      {step === 5 && (
        <Introduction
          setActiveNext={setActiveNext}
          introduction={introduction}
          setIntroduction={setIntroduction}
        />
      )}
      {step === 6 && <Complete setStep={setStep} />}
      {step >= 7 && <DriverAccept step={step} setStep={setStep} />}

      <StepButton
        activeNext={activeNext}
        setActiveNext={setActiveNext}
        step={step}
        setStep={setStep}
        showModal={showModal}
        setShowModal={setShowModal}
        submitHandler={submitHandler}
        submitLoading={submitLoading}
        autoSave={autoSave}
        setAutoSave={setAutoSave}
      />
    </PageContainer>
  );
}

export default memo(DriverApplyPage);
