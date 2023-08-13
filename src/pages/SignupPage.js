import React, { useState } from "react";
import Logo from "../assets/images/logo.png";
import Agreement from "../components/SignupPage/Agreement";
import PersonalInfo from "../components/SignupPage/PersonalInfo";
import Account from "../components/SignupPage/Account";
import Profile from "../components/SignupPage/Profile";
import Complete from "../components/SignupPage/Complete";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigation = useNavigate();
  const [step, setStep] = useState(0);
  const [activeNext, setActiveNext] = useState(false);

  const nextClick = () => {
    setStep(step + 1);
    setActiveNext(false);
  };

  const logoClickHandler = () => {
    if (step !== 4) return;
    navigation("/");
  };

  return (
    <div className="h-screen">
      <div className="flex justify-center mb-12 mt-36">
        <img
          src={Logo}
          className={`${step === 4 ? "h-12 cursor-pointer" : "h-9"}`}
          alt="Mallang_Trip_Logo"
          onClick={logoClickHandler}
        />
      </div>

      {step === 0 ? (
        <Agreement setActiveNext={setActiveNext} />
      ) : step === 1 ? (
        <PersonalInfo setActiveNext={setActiveNext} />
      ) : step === 2 ? (
        <Account setActiveNext={setActiveNext} />
      ) : step === 3 ? (
        <Profile setActiveNext={setActiveNext} />
      ) : (
        <Complete />
      )}
      {step !== 4 && (
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
      )}
    </div>
  );
}

export default SignupPage;
