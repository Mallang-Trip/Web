import React, { useEffect, useState } from "react";
import PlusBtn from "../../../../assets/svg/PlusBtn.svg";

function Credit({ shakeCredit }) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (shakeCredit) setShowText(true);
  }, [shakeCredit]);

  return (
    <div className="my-20">
      <button
        className={`${
          shakeCredit && "animate-shake"
        } w-[304px] h-[196px] bg-skyblue rounded-2xl mx-auto flex flex-col justify-center items-center gap-3 focus:outline-none`}
      >
        <div className="text-lg text-primary">결제 수단 등록</div>
        <img src={PlusBtn} />
      </button>
      <p
        className={`${
          showText ? "text-[#FF0000]" : "text-white"
        } text-sm text-center mt-1`}
      >
        결제 수단을 등록해 주세요!
      </p>
    </div>
  );
}

export default Credit;
