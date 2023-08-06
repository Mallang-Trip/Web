import React, { useState } from "react";
import Logo from "../assets/images/logo.png";
import Agreement from "../components/SignupPage/Agreement";
import PersonalInfo from "../components/SignupPage/PersonalInfo";

function SignupPage() {
  const [step, setStep] = useState(0);
  const [activeNext, setActiveNext] = useState(false);

  const nextClick = () => {
    setStep(step + 1);
    setActiveNext(false);
  };

  return (
    <div className="h-screen">
      <div className="flex justify-center mb-12 mt-36">
        <img src={Logo} className="h-9" alt="Mallang_Trip_Logo" />
      </div>

      {step === 0 ? (
        <Agreement setActiveNext={setActiveNext} />
      ) : (
        <PersonalInfo setActiveNext={setActiveNext} />
      )}

      <div className="flex justify-center mt-16">
        <button
          type="button"
          className={`${
            activeNext
              ? "h-12 text-white rounded-full text-md w-80 bg-primary"
              : "h-12 bg-white border rounded-full text-darkgray text-md w-80 border-darkgray"
          }`}
          disabled={!activeNext}
          onClick={nextClick}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default SignupPage;
