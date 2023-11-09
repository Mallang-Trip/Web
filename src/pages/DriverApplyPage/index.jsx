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

  return (
    <div className="mx-5 mb-24">
      <Title step={step} />
      <Stepper step={step} />

      {step === 1 && <CarInfo setActiveNext={setActiveNext} />}
      {step === 2 && <RegionList setActiveNext={setActiveNext} />}
      {step === 3 && <Accout setActiveNext={setActiveNext} />}
      {step === 4 && <DriverDocument setActiveNext={setActiveNext} />}
      {step === 5 && <Introduction setActiveNext={setActiveNext} />}
      {step === 6 && <Complete />}

      <StepButton
        activeNext={activeNext}
        setActiveNext={setActiveNext}
        step={step}
        setStep={setStep}
      />
    </div>
  );
}

export default DriverApplyPage;
