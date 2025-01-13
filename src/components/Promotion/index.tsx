import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  memo,
} from "react";
import { POST } from "@/utils/axios";
import { CheckModal, ConfirmModal } from "@/components";
import clsx from "clsx";

interface Props {
  price: number;
  setPromotionId: Dispatch<SetStateAction<number>>;
}

function Promotion({ price, setPromotionId }: Props) {
  const [promotionCode, setPromotionCode] = useState("");
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [checkMsg, setCheckMsg] = useState("");
  const [confirmMsg, setConfirmMsg] = useState("");

  const disable = useMemo(() => promotionCode.length === 0, [promotionCode]);

  const handlePromotion = useCallback(async () => {
    try {
      const body = {
        code: promotionCode,
        price: price,
      };
      const response = await POST("/promotion/check", body, true);
      if (response.payload) {
        setCheckMsg(
          `'${promotionCode}' 코드를 사용할 수 있어요. \n 프로모션 코드를 적용하시겠어요?`
        );
        setShowCheckModal(true);
      } else {
        setConfirmMsg(response.message);
        setShowConfirmModal(true);
      }
    } catch (e) {
      console.log(e);
    }
  }, [promotionCode, price]);

  const handleApply = useCallback(async () => {
    try {
      const response = await POST(
        "/promotion/use",
        { code: promotionCode },
        true
      );
      if (response.statusCode === 200) {
        setPromotionId(response.payload.id);
        setConfirmMsg("프로모션 코드가 적용되었습니다.");
      } else {
        setConfirmMsg("프로모션 코드 적용에 실패했습니다.");
      }
      setShowConfirmModal(true);
    } catch (e) {
      console.log(e);
    }
  }, [promotionCode]);

  return (
    <div className="grid py-20 w-full md:w-3/4 px-5 mx-auto font-bold items-center gap-7">
      <div className="flex gap-2">
        <p className="text-lg text-black">프로모션 코드</p>
        <p className="text-lg text-[#b4b4b4]">(선택)</p>
      </div>
      <div className="flex flex-1 gap-3">
        <input
          className="placeholder-textgray inline-block font-light text-base w-full text-textgray bg-lightgray pl-4 py-[15px] rounded-[15px] focus:outline-none"
          placeholder="무료 프로모션 코드를 입력해주세요"
          onChange={(e) => setPromotionCode(e.target.value)}
        />
        <button onClick={handlePromotion} disabled={disable}>
          <span
            className={clsx(
              "text-base text-white whitespace-nowrap rounded-[15px] px-5 py-[15px]",
              disable ? "bg-[#cde5ff]" : "bg-primary"
            )}
          >
            적용하기
          </span>
        </button>
      </div>
      <CheckModal
        showModal={showCheckModal}
        setShowModal={setShowCheckModal}
        message={checkMsg}
        noText="취소"
        yesText="적용하기"
        yesHandler={() => {
          setShowCheckModal(false);
          handleApply();
        }}
      />
      <ConfirmModal
        showModal={showConfirmModal}
        setShowModal={setShowConfirmModal}
        message={confirmMsg}
      />
    </div>
  );
}

export default memo(Promotion);
