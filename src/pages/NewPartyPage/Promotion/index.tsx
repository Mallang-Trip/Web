import { useState, useEffect } from "react";
import { POST } from "../../../utils/axios";
import clsx from "clsx";

function Promotion() {
  const [promotionCode, setPromotionCode] = useState("");
  const [isString, setIsString] = useState(false);

  const buttonAvailable = () => {
    if (promotionCode.length > 0) setIsString(true);
    else setIsString(false);
  };
  useEffect(() => {
    buttonAvailable();
  }, [promotionCode]);

  return (
    <div className="grid py-20 w-full sm:w-3/5 lg:w-2/5 mx-auto font-bold items-center gap-7 ">
      <div className="flex gap-2">
        <p className="text-lg text-black">프로모션 코드</p>
        <p className="text-lg text-[#b4b4b4]">(선택)</p>
      </div>
      <div className="flex flex-1 gap-3 ">
        <input
          className="placeholder-textgray inline-block font-light text-base w-full text-textgray bg-lightgray pl-4 py-[15px] rounded-[15px] focus:outline-none"
          placeholder="무료 프로모션 코드를 입력해주세요"
          onChange={(e) => setPromotionCode(e.target.value)}
        />
        <button>
          <span
            className={clsx(
              " text-base text-white whitespace-nowrap rounded-[15px] px-[50px] py-[15px]",
              {
                "bg-primary": isString,
                "bg-[#cde5ff]": !isString,
              }
            )}
          >
            확인
          </span>
        </button>
      </div>
    </div>
  );
}

export default Promotion;
