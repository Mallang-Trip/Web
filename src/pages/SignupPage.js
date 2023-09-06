import React, { useState } from "react";
import Logo from "../assets/images/logo.png";
import Agreement from "../components/SignupPage/Agreement";
import PersonalInfo from "../components/SignupPage/PersonalInfo";
import Account from "../components/SignupPage/Account";
import Profile from "../components/SignupPage/Profile";
import Complete from "../components/SignupPage/Complete";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../api/image";
import { signup } from "../api/users";

function SignupPage() {
  const navigation = useNavigate();
  const [step, setStep] = useState(0);
  const [activeNext, setActiveNext] = useState(false);

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [region, setRegion] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [nickName, setNickName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [profileImage, setProfileImage] = useState(undefined);

  const nextClick = async () => {
    if (step === 3) {
      const body = {
        id: id,
        password: password,
        email: email,
        name: name,
        birthday: birthDate,
        country: region === "내국인" ? "local" : "foreginer",
        gender: gender === "남자" ? "male" : "female",
        phoneNumber: "010" + Math.floor(10000000 + Math.random() * 90000000),
        nickname: nickName,
        introduction: introduction,
      };

      // const result = uploadImage(profileImage);
      // console.log(result);
      const result = await signup(body);
      if (result.statusCode === 200) setStep(step + 1);
    } else {
      setStep(step + 1);
      setActiveNext(false);
    }
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
        <PersonalInfo
          setActiveNext={setActiveNext}
          name={name}
          setName={setName}
          birthDate={birthDate}
          setBirthDate={setBirthDate}
          region={region}
          setRegion={setRegion}
          gender={gender}
          setGender={setGender}
        />
      ) : step === 2 ? (
        <Account
          setActiveNext={setActiveNext}
          email={email}
          setEmail={setEmail}
          id={id}
          setId={setId}
          password={password}
          setPassword={setPassword}
          passwordAgain={passwordAgain}
          setPasswordAgain={setPasswordAgain}
        />
      ) : step === 3 ? (
        <Profile
          setActiveNext={setActiveNext}
          nickName={nickName}
          setNickName={setNickName}
          introduction={introduction}
          setIntroduction={setIntroduction}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
        />
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
