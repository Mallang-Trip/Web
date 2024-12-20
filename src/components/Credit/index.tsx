import {
  Dispatch,
  ForwardedRef,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getCard, postCard, deleteCard } from "@/api/card";
import { CheckModal, ConfirmModal } from "@/components";
import PlusBtn from "@/assets/svg/PlusBtn.svg";
import Logo from "@/assets/images/logo.png";
import clsx from "clsx";

declare global {
  interface Window {
    PaypleCpayAuthCheck: any;
  }
}

interface Props {
  shakeCredit: boolean;
  register: boolean;
  setRegister: Dispatch<SetStateAction<boolean>>;
  creditRef: ForwardedRef<HTMLDivElement>;
}

function Credit({ shakeCredit, register, setRegister, creditRef }: Props) {
  const PaypleCpayAuthCheck = window.PaypleCpayAuthCheck;
  const user = useSelector((state: RootState) => state.user);
  const [cardInfo, setCardInfo] = useState({
    cardId: 0,
    cardName: "",
    cardNumber: "",
  });
  const [showText, setShowText] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showPaymentCompleteModal, setShowPaymentCompleteModal] =
    useState(false);

  const registerCard = useCallback(
    (type: "new" | "change") => {
      if (type === "new" && register) return;

      const paypleResult = async (params: any) => {
        if (params.PCD_PAY_RST === "success") {
          try {
            const body = {
              billingKey: params.PCD_PAYER_ID,
              cardName: params.PCD_PAY_CARDNAME,
              cardNumber: params.PCD_PAY_CARDNUM,
              userId: user.userId,
            };
            const result = await postCard(body);
            if (result.statusCode !== 200) return setShowErrorModal(true);
            setCardInfo(result.payload);
            setShowPaymentCompleteModal(true);
            setRegister(true);
          } catch (e) {
            console.log(e);
            setShowErrorModal(true);
          }
        } else {
          setShowErrorModal(true);
        }
      };

      const paypleObj = {
        clientKey: "945491C72C67EE1682010C472F92F433",
        PCD_PAY_TYPE: "card",
        PCD_PAY_WORK: "AUTH",
        PCD_CARD_VER: "01",
        PCD_PAY_GOODS: "[말랑트립] 결제 수단 등록",
        PCD_PAY_TOTAL: 0,
        PCD_RST_URL: "/",
        callbackFunction: paypleResult,
      };

      PaypleCpayAuthCheck(paypleObj);
    },
    [PaypleCpayAuthCheck, register, user.userId]
  );

  const deleteCardData = useCallback(async () => {
    try {
      await deleteCard();
      setCardInfo({ cardId: 0, cardName: "", cardNumber: "" });
      setRegister(false);
      setShowDeleteModal(false);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const getCardData = useCallback(async () => {
    try {
      const result = await getCard();
      if (result.statusCode === 404) return setRegister(false);
      setCardInfo(result.payload);
      setRegister(true);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getCardData();
  }, []);

  useEffect(() => {
    if (shakeCredit) setShowText(true);
  }, [shakeCredit]);

  useEffect(() => {
    if (register) setShowText(false);
  }, [register]);

  return (
    <>
      <div className="mt-20 mb-7" ref={creditRef}>
        <button
          className={clsx(
            "w-[304px] h-[196px] bg-skyblue text-primary rounded-2xl mx-auto block focus:outline-none",
            {
              "animate-shake": shakeCredit,
              "cursor-default": register,
            }
          )}
          onClick={() => registerCard("new")}
        >
          {register && cardInfo.cardId ? (
            <div className="w-full h-full flex flex-col justify-between items-start p-4">
              <div className="w-full flex justify-between items-center">
                <img src={Logo} alt="말랑트립" className="w-20 pt-1 pl-1" />
                <div
                  className="text-xs underline underline-offset-4 cursor-pointer"
                  onClick={() => registerCard("change")}
                >
                  결제 수단 변경
                </div>
              </div>
              <div className="w-full flex flex-col gap-1 items-start text-lg font-bold">
                <div className="text-lg font-bold">{cardInfo.cardName}카드</div>
                <div className="w-full flex justify-between items-center">
                  <div className="text-base font-medium">
                    {cardInfo.cardNumber.replaceAll("-", " ")}
                  </div>
                  <div
                    className="text-xs text-[#E30000] font-medium underline underline-offset-4 cursor-pointer"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    결제 수단 삭제
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-3">
              <div className="text-lg">결제 수단 등록</div>
              <img src={PlusBtn} />
            </div>
          )}
        </button>
        <p className="text-darkgray font-medium text-sm text-center mt-7">
          계좌 내에 잔액이 없을 시 카드 등록이 안 될 수 있습니다.
        </p>
        <p
          className={clsx(
            "text-sm text-center mt-1",
            showText ? "text-red-600" : "text-white"
          )}
        >
          결제 수단을 등록해 주세요!
        </p>
      </div>

      <CheckModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        message="결제 수단을 삭제하시겠습니까?"
        noText="취소"
        yesText="확인"
        yesHandler={() => deleteCardData()}
      />
      <ConfirmModal
        showModal={showErrorModal}
        setShowModal={setShowErrorModal}
        message="결제 수단 등록에 실패했습니다."
      />
      <ConfirmModal
        showModal={showPaymentCompleteModal}
        setShowModal={setShowPaymentCompleteModal}
        message="결제 수단 등록이 완료되었습니다."
      />
    </>
  );
}

export default memo(Credit);
