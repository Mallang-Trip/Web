import { memo, useCallback, useEffect, useState } from "react";
import { ConfirmModal } from "@/components";
import passLogo from "@/assets/images/PASS-Logo.png";
import passArrow from "@/assets/svg/Pass-Mobile-Arrow.svg";
import { getInicisFormData } from "@/api/users";

declare global {
  interface Window {
    MOBILEOK: any;
  }
}

interface Props {
  completeHandler: (impUid: string | null) => void;
}

function PassCheck({ completeHandler }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [popup, setPopup] = useState<Window | null>(null);
  const [result, setResult] = useState({
    statusCode: "",
    impUid: "",
  });

  // 팝업 창을 가운데 정렬로 열기
  const popupCenter = useCallback(() => {
    const _width = 400;
    const _height = 640;
    const xPos = document.body.offsetWidth / 2 - _width / 2 + window.screenLeft;

    return window.open(
      "",
      "sa_popup",
      `width=${_width}, height=${_height}, left=${xPos}, menubar=yes, status=yes, titlebar=yes, resizable=yes`
    );
  }, []);

  // 메시지 윈도우 리스너 - 새창에서 인증 완료 시 메시지 수신
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { type, statusCode, impUid } = event.data;

      if (type === "PASS_AUTH_COMPLETE") {
        setIsWaiting(false);

        // 팝업 창 닫기
        if (popup) {
          popup.close();
          setPopup(null);
        }

        // 결과에 따른 메시지 설정
        let resultMessage = "";
        if (statusCode === "200") {
          resultMessage = "본인 인증에 성공하였습니다.";
        } else if (statusCode === "401") {
          resultMessage =
            "본인 인증에 10분이 경과하였습니다.\n다시 시도해주세요.";
        } else if (statusCode === "403") {
          resultMessage = "19세 미만은 가입이 불가능합니다.";
        } else if (statusCode === "409") {
          resultMessage = "이미 가입된 계정이 존재합니다.";
        } else if (statusCode === "400" || statusCode === "500") {
          resultMessage =
            "서버 통신 오류가 발생했습니다.\n잠시후 다시 시도해주세요.";
        }

        setMessage(resultMessage);
        setShowModal(true);
        setResult({ statusCode, impUid });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [popup, completeHandler]);

  useEffect(() => {
    if (!showModal && result.statusCode && result.impUid) {
      completeHandler(result.impUid);
      localStorage.removeItem("impUid");
      localStorage.removeItem("passResult");
      localStorage.removeItem("isPassWaiting");
    }
  }, [showModal]);

  // 팝업 창 닫힘 감지
  useEffect(() => {
    if (!popup || !isWaiting) return;

    const checkClosed = setInterval(() => {
      if (popup.closed) {
        setIsWaiting(false);
        setPopup(null);
        clearInterval(checkClosed);
      }
    }, 1000);

    return () => clearInterval(checkClosed);
  }, [popup, isWaiting]);

  // 이니시스 인증 요청 함수
  const callSa = useCallback(
    async (inicisFormData: any) => {
      const newPopup = popupCenter();

      if (newPopup != undefined && newPopup != null) {
        setPopup(newPopup);

        // 동적으로 form 생성
        const form = document.createElement("form");
        form.setAttribute("target", "sa_popup");
        form.setAttribute("method", "POST");
        form.setAttribute("action", "https://sa.inicis.com/auth");
        form.style.display = "none";

        // 폼 데이터 추가
        Object.keys(inicisFormData).forEach((key) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = inicisFormData[key];
          form.appendChild(input);
        });

        // body에 form 추가 후 submit
        document.body.appendChild(form);
        form.submit();

        // form 제거
        document.body.removeChild(form);
      }
    },
    [popupCenter]
  );

  const openPopup = useCallback(async () => {
    // 기존 결과 초기화
    localStorage.removeItem("passResult");
    localStorage.removeItem("impUid");
    localStorage.setItem("isPassWaiting", "true");

    setIsWaiting(true);

    try {
      const inicisFormData = await getInicisFormData();
      await callSa(inicisFormData);
    } catch (e) {
      console.log(e);
      setIsWaiting(false);
      localStorage.removeItem("isPassWaiting");
    }
  }, [callSa]);

  return (
    <>
      <button
        className="hidden md:flex w-full max-w-[330px] mx-auto mt-14 py-9 flex-col items-center bg-lightgray rounded-[20px] border border-mediumgray"
        onClick={openPopup}
        disabled={isWaiting}
      >
        <img
          src={passLogo}
          alt="본인인증"
          className="w-20 h-20 rounded-[20px]"
        />
        <p className="text-xl text-black font-bold mt-7 mb-2">
          {isWaiting ? "인증 진행 중..." : "PASS 본인 인증하기"}
        </p>
        <span className="text-base text-black font-medium">
          {isWaiting
            ? "팝업 창에서 인증을 완료해주세요"
            : "PASS 앱이 없어도 인증이 가능합니다"}
        </span>
      </button>
      <button
        className="flex md:hidden w-full mx-auto p-6 justify-between items-center bg-white rounded-2xl border border-gray300"
        onClick={openPopup}
        disabled={isWaiting}
      >
        <img
          src={passLogo}
          alt="본인인증"
          className="w-[42px] h-[42px] rounded-[10px] shrink-0"
        />
        <p className="flex flex-col justify-between items-start shrink-0">
          <span className="text-base text-black font-semibold">
            {isWaiting ? "인증 진행 중..." : "PASS 본인 인증하기"}
          </span>
          <span className="text-xs text-gray500 font-medium">
            {isWaiting
              ? "팝업 창에서 인증을 완료해주세요"
              : "PASS 앱이 없어도 인증이 가능합니다."}
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

export default memo(PassCheck);
