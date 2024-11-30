import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadProfileImage } from "../../api/image";
import { signup, checkDuplication } from "../../api/users";
import { CONSTANT } from "../../utils/data";
import ReactGA from "react-ga4";
import PageContainer from "../../components/PageContainer";
import Logo from "../../assets/images/logo.png";
import Agreement from "./Agreement";
import PersonalInfo from "./PersonalInfo";
import Account from "./Account";
import Profile from "./Profile";
import Complete from "./Complete";
import ConfirmModal from "../../components/ConfirmModal";
import Title from "../../components/Title";

function SignupPage() {
  const navigation = useNavigate();
  const [step, setStep] = useState(0);
  const [activeNext, setActiveNext] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [impUid, setImpUid] = useState("");
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

  const goSignup = async () => {
    try {
      const profileImageURL = profileImage
        ? await uploadProfileImage(profileImage)
        : CONSTANT.BASE_PROFILE_IMAGE;

      const body = {
        email: email,
        id: id,
        impUid: impUid,
        introduction: introduction,
        nickname: nickName,
        password: password,
        profileImg: profileImageURL,
      };

      const result = await signup(body);
      if (result.statusCode === 200) setStep(step + 1);
      else setShowErrorModal(true);
    } catch {
      setShowErrorModal(true);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });

    const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;
    const META_PIXEL_TRACKING_ID = import.meta.env.VITE_META_PIXEL_TRACKING_ID;

    if (!GA_TRACKING_ID || !META_PIXEL_TRACKING_ID) return;
    if (!window.location.href.includes("localhost")) {
      const eventName = [
        "01_register",
        "02_certification",
        "03_mail_ID_password",
        "04_nickname_intro_profile",
        "05_registered",
      ];
      ReactGA.event({
        category: "회원가입",
        action: eventName[step],
      });
    }
  }, [step]);

  return (
    <PageContainer>
      <div className="flex flex-col justify-center h-real-screen absolute top-0 left-0 w-full px-2">
        <Title title="말랑트립 회원가입" />
        {step === 0 ? (
          <Agreement setActiveNext={setActiveNext} />
        ) : step === 1 ? (
          <PersonalInfo setStep={setStep} setImpUid={setImpUid} />
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
        {step !== 1 && step !== 4 && (
          <div className="flex justify-center mt-16">
            <button
              type="button"
              className={`${
                activeNext
                  ? "h-12 text-white rounded-full text-md w-64 sm:w-80 bg-primary"
                  : "h-12 bg-white border rounded-full text-darkgray text-md w-64 sm:w-80 border-darkgray"
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
