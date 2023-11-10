import { useState } from "react";
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
  const [hour, setHour] = useState("");
  const [money, setMoney] = useState("");
  const [driverLicense, setDriverLicense] = useState(undefined);
  const [taxiLicense, setTaxiLicense] = useState(undefined);
  const [insurance, setInsurance] = useState(undefined);
  const [introduction, setIntroduction] = useState("");
  const [showModal, setShowModal] = useState(false);

  const submitHandler = () => {
    setStep(step + 1);
    setShowModal(false);
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
