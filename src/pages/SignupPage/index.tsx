import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { uploadProfileImage } from "@/api/image";
import { signup, checkDuplication } from "@/api/users";
import { CONSTANT } from "@/utils/data";
import { isGAlive } from "@/utils/ga";
import { PageContainer, ConfirmModal, Loading } from "@/components";
import ReactGA from "react-ga4";
import Agreement from "./Agreement";
import PersonalInfo from "./PersonalInfo";
import Account from "./Account";
import Profile from "./Profile";
import Complete from "./Complete";
import clsx from "clsx";

function SignupPage() {
  const navigation = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
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
  const [profileImage, setProfileImage] = useState<File | undefined>(undefined);
  const [emailDuplication, setEmailDuplication] = useState(false);
  const [idDuplication, setIdDuplication] = useState(false);
  const [nickNameDuplication, setNickNameDuplication] = useState(false);
  const [paramImpUid, paramStatusCode] = [
    searchParams.get("impUid"),
    searchParams.get("statusCode"),
  ];

  const goSignup = useCallback(async () => {
    try {
      const profileImageURL = profileImage
        ? await uploadProfileImage(profileImage)
        : CONSTANT.BASE_PROFILE_IMAGE;

      const body = {
        email,
        id,
        impUid,
        introduction,
        password,
        nickname: nickName,
        profileImg: profileImageURL,
      };

      const result = await signup(body);
      if (result.statusCode === 200) setStep(step + 1);
      else setShowErrorModal(true);
    } catch {
      setShowErrorModal(true);
    }
  }, [profileImage, email, id, impUid, introduction, nickName, password, step]);

  const nextClick = useCallback(async () => {
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
  }, [step, email, id, nickName, goSignup]);

  useEffect(() => {
    window.scrollTo({ top: 0 });

    if (isGAlive()) {
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

  useEffect(() => {
    if (!localStorage.getItem("isPassWaiting")) {
      setLoading(false);
      navigation("/signup", { replace: true });
    } else if (!paramStatusCode) setLoading(false);
    else {
      setStep(1);
      localStorage.setItem("impUid", paramImpUid || "");
      localStorage.setItem("passResult", paramStatusCode);
      localStorage.removeItem("isPassWaiting");
      navigation("/signup", { replace: true });
    }
  }, [paramImpUid, paramStatusCode]);

  if (loading) return <Loading full={true} />;
  return (
    <PageContainer>
      <div className="flex flex-col justify-center h-real-screen absolute top-0 left-0 w-full px-2">
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
              className={clsx(
                activeNext
                  ? "h-12 text-white rounded-full text-md w-64 sm:w-80 bg-primary"
                  : "h-12 bg-white border rounded-full text-darkgray text-md w-64 sm:w-80 border-darkgray"
              )}
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
          message="회원가입에 실패했습니다."
        />
      </div>
    </PageContainer>
  );
}

export default memo(SignupPage);
