import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { POST } from "../../../utils/axios";
import clsx from "clsx";
import ConfirmModal from "../../../components/ConfirmModal";

interface Props {
  promotionId: number;
  price: number;
  setPromotionId: Dispatch<SetStateAction<number>>;
}

function Promotion({ price, setPromotionId }: Props) {
  const [promotionCode, setPromotionCode] = useState("");
  const [isString, setIsString] = useState(false);
  const [isApply, setIsApply] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState("");

  const handlePromotion = async () => {
    try {
      const body = {
        code: promotionCode,
        price: price,
      };
      await POST("/promotion/check", body, true).then((response) => {
        setConfirmMsg(response.payload ?? response.message);
        setShowConfirmModal(true);
        if (response.payload.length > 0) setIsApply(true);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleApply = async () => {
    try {
      const result = await POST(
        "/promotion/use",
        {
          code: promotionCode,
        },
        true
      ).then((response) => {
        setConfirmMsg("프로모션 코드 적용이 실패했습니다");

        if (response.statusCode === 200) {
          setPromotionId(response.payload.id);
          setConfirmMsg("프로모션 코드가 적용됐습니다");
        }
        setShowConfirmModal(true);
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

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
        <button onClick={() => handlePromotion()} disabled={!isString}>
          <span
            className={clsx(
              " text-base text-white whitespace-nowrap rounded-[15px] px-5 py-[15px]",
              {
                "bg-primary": isString,
                "bg-[#cde5ff]": !isString,
              }
            )}
          >
            확인
          </span>
        </button>
        <button onClick={() => handleApply()} disabled={!isApply}>
          <span
            className={clsx(
              " text-base text-white whitespace-nowrap rounded-[15px] px-5 py-[15px]",
              {
                "bg-[#FE472E]": isApply,
                "bg-[#FFD3CD]": !isApply,
              }
            )}
          >
            적용
          </span>
        </button>
      </div>
      <ConfirmModal
        showModal={showConfirmModal}
        setShowModal={setShowConfirmModal}
        message={confirmMsg}
      />
    </div>
  );
}

export default Promotion;
