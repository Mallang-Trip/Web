import { useEffect, useState } from "react";
import PlusBtn from "../../assets/svg/PlusBtn.svg";

function Credit({ shakeCredit, register, setRegister, creditRef }) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (shakeCredit) setShowText(true);
  }, [shakeCredit]);

  useEffect(() => {
    if (register) setShowText(false);
  }, [register]);

  return (
    <div className="mt-20 mb-7" ref={creditRef}>
      <button
        className={`${shakeCredit && "animate-shake"} ${
          register && "cursor-default"
        } w-[304px] h-[196px] bg-skyblue text-primary rounded-2xl mx-auto flex flex-col justify-center items-center gap-3 focus:outline-none`}
        onClick={() => setRegister(true)}
      >
        {register ? (
          <div className="text-left">
            <div className="text-lg font-bold">
              카드 뒷자리 1121
              <br />
              유효기간 03/04
            </div>
            <span
              className="text-xs underline underline-offset-4 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setRegister(false);
              }}
            >
              결제 수단 변경하기
            </span>
          </div>
        ) : (
          <>
            <div className="text-lg">결제 수단 등록</div>
            <img src={PlusBtn} />
          </>
        )}
      </button>
      <p
        className={`${
          showText ? "text-red-600" : "text-white"
        } text-sm text-center mt-1`}
      >
        결제 수단을 등록해 주세요!
      </p>
    </div>
  );
}

export default Credit;
