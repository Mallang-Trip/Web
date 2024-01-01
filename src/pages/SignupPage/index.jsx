import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadProfileImage } from "../../api/image";
import { signup, checkDuplication } from "../../api/users";
import PageContainer from "../../components/PageContainer";
import Logo from "../../assets/images/logo.png";
import Agreement from "./Agreement";
import PersonalInfo from "./PersonalInfo";
import Account from "./Account";
import Profile from "./Profile";
import Complete from "./Complete";
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

  const [emailDuplication, setEmailDuplication] = useState(false);
  const [idDuplication, setIdDuplication] = useState(false);
  const [nickNameDuplication, setNickNameDuplication] = useState(false);

  const nextClick = async () => {
    if (step === 2) {
      checkDuplication("email", email)
        .then((res) => {
          if (res.statusCode === 409) return setEmailDuplication(true);
          checkDuplication("loginId", id)
            .then((res) => {
              if (res.statusCode === 409) return setIdDuplication(true);
              setStep(step + 1);
            })
            .catch(() => setIdDuplication(true));
        })
        .catch(() => setEmailDuplication(true));
    } else if (step === 3) {
      checkDuplication("nickname", nickName)
        .then((res) => {
          if (res.statusCode === 409) return setNickNameDuplication(true);
          goSignup();
        })
        .catch(() => setNickNameDuplication(true));
    } else {
      setStep(step + 1);
      setActiveNext(false);
    }
  };

  const logoClickHandler = () => {
    if (step !== 4) return;
    navigation("/");
  };

  const goSignup = async () => {
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
  };

  return (
    <PageContainer>
      <div className="flex flex-col justify-center h-real-screen">
        <div className="flex justify-center">
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
            emailDuplication={emailDuplication}
            setEmailDuplication={setEmailDuplication}
            idDuplication={idDuplication}
            setIdDuplication={setIdDuplication}
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
            nickNameDuplication={nickNameDuplication}
            setNickNameDuplication={setNickNameDuplication}
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
                  ? "h-12 text-white rounded-full text-md w-64 md:w-80 bg-primary"
                  : "h-12 bg-white border rounded-full text-darkgray text-md w-64 md:w-80 border-darkgray"
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
      </div>
    </PageContainer>
  );
}

export default SignupPage;
