import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";

function DriverAccept({ step, setStep }) {
  const navigation = useNavigate();

  const clickHandler = () => {
    if (step === 7) setStep(1);
    else navigation("/", { replace: true });
  };

  return (
    <>
      <div className="w-full max-w-md mt-24 mx-auto py-10 bg-skyblue rounded-lg shadow-lg">
        <p className="w-full text-center text-black text-lg whitespace-pre">
          {step === 7
            ? "말랑트립 드라이버에\n관심을 가져주셔서 감사합니다.\n\n드라이버 등록 심사가 완료되었으며,\n아쉽게도 등록이 거절되었습니다.\n\n드라이버 재지원을 원하실 경우,\n꼼꼼하게 지원서를 한번 더 확인해보시고\n지원서를 다시 제출해주시기 바랍니다.\n\n언제든지, 드라이버 재지원이 가능합니다.\n감사합니다."
            : "축하드립니다!\n\n드라이버 등록 심사가 완료되었으며,\n정상적으로 등록이 승인되었습니다.\n\n이제 말랑트립의 드라이버로 활동이 가능합니다.\n\n말랑트립 드라이버에 관심을 갖고\n지원해주셔서 감사합니다."}
        </p>
        <img
          src={logo}
          alt="mallangtrip"
          className="w-32 ml-auto mt-16 mr-10"
        />
      </div>

      <div className="flex justify-center mt-16 mx-auto">
        <button
          type="button"
          className="h-12 bg-skyblue border rounded-full text-primary text-sm w-64 border-primary"
          onClick={clickHandler}
        >
          {step === 7 ? "지원서 작성하기" : "홈으로 돌아가기"}
        </button>
      </div>
    </>
  );
}

export default DriverAccept;
