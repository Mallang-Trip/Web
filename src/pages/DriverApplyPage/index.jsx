import { useState } from "react";
import { applyDriver } from "../../api/driver";
import { uploadImage } from "../../api/image";
import Title from "./Title";
import Stepper from "./Stepper";
import CarInfo from "./CarInfo";
import StepButton from "./StepButton";
import RegionList from "./RegionList";
import Accout from "./Accout";
import DriverDocument from "./DriverDocument";
import Introduction from "./Introduction";
import Complete from "./Complete";

function DriverApplyPage() {
  const [step, setStep] = useState(1);
  const [activeNext, setActiveNext] = useState(false);
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

  const submitHandler = async () => {
    const carImageURL = carImage ? await uploadImage(carImage) : null;
    const driverLicenseURL = driverLicense
      ? await uploadImage(driverLicense)
      : null;
    const taxiLicenseURL = taxiLicense ? await uploadImage(taxiLicense) : null;
    const insuranceURL = insurance ? await uploadImage(insurance) : null;
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

      await applyDriver(body);
      setStep(step + 1);
      setShowModal(false);
    } catch (e) {
      alert("이미 제출된 내용을 심사중이거나, 오류가 발생했습니다.");
      setShowModal(false);
    }
  };

  return (
    <div className="mx-5 mb-24">
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
      {step === 6 && <Complete />}

      <StepButton
        activeNext={activeNext}
        setActiveNext={setActiveNext}
        step={step}
        setStep={setStep}
        showModal={showModal}
        setShowModal={setShowModal}
        submitHandler={submitHandler}
      />
    </div>
  );
}

export default DriverApplyPage;
