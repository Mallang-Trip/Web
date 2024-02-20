import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { __asyncRefreshAuth } from "../../redux/modules/userSlice";
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

function DriverApplyPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [step, setStep] = useState(1);
  const [activeNext, setActiveNext] = useState(false);
  const [driverId, setDriverId] = useState(0);
  const [carImage, setCarImage] = useState(undefined);
  const [modelName, setModelName] = useState("");
  const [maxNum, setMaxNum] = useState("");
  const [region, setRegion] = useState("");
  const [bank, setBank] = useState("");
  const [name, setName] = useState("");
  const [accoutNumber, setAccoutNumber] = useState("");
  const [hour, setHour] = useState(["", "", "", "", ""]);
  const [money, setMoney] = useState(["", "", "", "", ""]);
  const [driverLicense, setDriverLicense] = useState(undefined);
  const [taxiLicense, setTaxiLicense] = useState(undefined);
  const [insurance, setInsurance] = useState(undefined);
  const [introduction, setIntroduction] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const submitHandler = async () => {
    const carImageURL = !carImage
      ? null
      : typeof carImage === "string"
      ? carImage
      : await uploadImage(carImage);
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
    for (let i = 0; i < 5; i++) {
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
        vehicleImg: carImageURL,
        vehicleModel: modelName,
        vehicleNumber: "00가0000",
      };

      driverId ? await putDriverApply(body) : await postDriverApply(body);
      setStep(step + 1);
      setShowModal(false);
    } catch (e) {
      alert("오류가 발생했습니다.");
      setShowModal(false);
    }
  };

  const getDriverApplyFunc = async () => {
    try {
      const result = await getDriverApply();
      console.log(result);
      if (result.statusCode === 200) {
        setName(result.payload.accountHolder);
        setAccoutNumber(result.payload.accountNumber);
        setBank(result.payload.bank);
        setDriverId(result.payload.driverId);
        setDriverLicense(result.payload.driverLicenceImg);
        setInsurance(result.payload.insuranceLicenceImg);
        setIntroduction(result.payload.introduction);
        setRegion(result.payload.region);
        setTaxiLicense(result.payload.taxiLicenceImg);
        setMaxNum(result.payload.vehicleCapacity.toString());
        setCarImage(result.payload.vehicleImg);
        setModelName(result.payload.vehicleModel);

        const hours = ["", "", "", "", ""];
        const moneys = ["", "", "", "", ""];
        result.payload.prices.forEach((item, index) => {
          hours[index] = item.hours.toString();
          moneys[index] = item.price.toString();
        });
        setHour(hours);
        setMoney(moneys);

        if (result.payload.status === "WAITING") setStep(6);
        else if (result.payload.status === "REFUSED") setStep(7);
        else if (result.payload.status === "ACCEPTED") {
          setStep(8);
          dispatch(__asyncRefreshAuth());
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

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

      {step === 1 && (
        <CarInfo
          setActiveNext={setActiveNext}
          carImage={carImage}
          setCarImage={setCarImage}
          modelName={modelName}
          setModelName={setModelName}
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
      />
    </PageContainer>
  );
}

export default DriverApplyPage;
