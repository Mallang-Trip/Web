import { useEffect, useState } from "react";
import ConfirmModal from "../ConfirmModal";
import passLogo from "../../assets/images/PASS-Logo.png";
import passArrow from "../../assets/svg/Pass-Mobile-Arrow.svg";

function PassCheck({ completeHandler }) {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(null);

  const clearTimer = () => {
    if (!timer) return;
    clearInterval(timer);
    setTimer(null);
    localStorage.removeItem("passResult");
    localStorage.removeItem("impUid");
  };

  const openPopup = () => {
    window.MOBILEOK.process(
      `${import.meta.env.VITE_BASE_SERVER_URL}/mobileOK`,
      "WB",
      "result"
    );
  };

  useEffect(() => {
    const getResult = () => {
      const passResult = localStorage.getItem("passResult");

      if (passResult === "200") {
        setMessage("본인 인증에 성공하였습니다.");
        setShowModal(true);
      } else if (passResult === "401") {
        setMessage("본인 인증에 10분이 경과하였습니다.\n다시 시도해주세요.");
        setShowModal(true);
      } else if (passResult === "403") {
        setMessage("19세 미만은 가입이 불가능합니다.");
        setShowModal(true);
      } else if (passResult === "409") {
        setMessage("이미 가입된 계정이 존재합니다.");
        setShowModal(true);
      } else if (passResult === "400" || passResult === "500") {
        setMessage("서버 통신 오류가 발생했습니다.\n잠시후 다시 시도해주세요.");
        setShowModal(true);
      }
    };

    const checkTimer = setInterval(getResult, 500);
    setTimer(checkTimer);

    return () => clearTimer();
  }, []);

  useEffect(() => {
    if (showModal) return;

    const passResult = localStorage.getItem("passResult");
    const impUid = localStorage.getItem("impUid");

    if (passResult === "200") completeHandler(impUid);
    clearTimer();
  }, [showModal]);

  useEffect(() => {
    const script = document.createElement("script");
    const callBackFunc = document.createTextNode(
      `
        function result(result) {
          try {
            result = JSON.parse(result);
            localStorage.setItem("passResult", result.statusCode);
            if (result.statusCode === 200) localStorage.setItem("impUid", result.payload.impUid);
          } catch (error) {
            localStorage.setItem("passResult", "500");
          }
        };
      `
    );
    script.appendChild(callBackFunc);
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <button
        className="hidden md:flex w-full max-w-[330px] mx-auto mt-14 py-9 flex-col items-center bg-lightgray rounded-[20px] border border-mediumgray"
        onClick={openPopup}
      >
        <img
          src={passLogo}
          alt="본인인증"
          className="w-20 h-20 rounded-[20px]"
        />
        <p className="text-xl text-black font-bold mt-7 mb-2">
          PASS 본인 인증하기
        </p>
        <span className="text-base text-black font-medium">
          PASS 앱이 없어도 인증이 가능합니다
        </span>
      </button>
      <button
        className="flex md:hidden w-full mx-auto p-6 justify-between items-center bg-white rounded-2xl border border-gray300"
        onClick={openPopup}
      >
        <img
          src={passLogo}
          alt="본인인증"
          className="w-[42px] h-[42px] rounded-[10px] shrink-0"
        />
        <p className="flex flex-col justify-between items-start shrink-0">
          <span className="text-base text-black font-semibold">
            PASS 본인 인증하기
          </span>
          <span className="text-xs text-gray500 font-medium">
            PASS 앱이 없어도 인증이 가능합니다.
          </span>
        </p>
        <img src={passArrow} alt="본인 인증하기" className="w-6 h-6 shrink-0" />
      </button>

      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={message}
      />
    </>
  );
}

export default PassCheck;
