import { useState } from "react";
import Title from "./Title";
import Stepper from "./Stepper";

function DriverApplyPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="mx-5 mb-96">
      <Title step={step} />
      <Stepper step={step} />
    </div>
  );
}

export default DriverApplyPage;
