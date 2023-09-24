import React, { useState } from "react";
import Logo from "../../assets/images/logo.png";
import Agreement from "./Agreement";
import PersonalInfo from "./PersonalInfo";
import Account from "./Account";
import Profile from "./Profile";
import Complete from "./Complete";
import { useNavigate } from "react-router-dom";
import { uploadProfileImage } from "../../api/image";
import { signup } from "../../api/users";
import ConfirmModal from "../../components/ConfirmModal";

function SignupPage() {
  const navigation = useNavigate();
  const [step, setStep] = useState(0);
  const [activeNext, setActiveNext] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

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
      try {
        const profileImageURL = profileImage
          ? await uploadProfileImage(profileImage)
          : null;

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
          profileImg: profileImageURL,
        };

        await signup(body);

        setStep(step + 1);
      } catch {
        setShowErrorModal(true);
      }
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
    <>
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
      <ConfirmModal
        showModal={showErrorModal}
        setShowModal={setShowErrorModal}
        message={"회원가입에 실패했습니다."}
      />
    </>
  );
}

export default SignupPage;
