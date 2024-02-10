import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadBrandPay } from "@tosspayments/brandpay-sdk";
import PlusBtn from "../../assets/svg/PlusBtn.svg";

const cardCompanyCode = {
  "3K": "기업 BC",
  46: "광주은행",
  71: "롯데카드",
  30: "KDB산업은행",
  31: "BC카드",
  51: "삼성카드",
  38: "새마을금고",
  41: "신한카드",
  62: "신협",
  36: "씨티카드",
  33: "우리BC카드",
  W1: "우리카드",
  37: "우체국예금보험",
  39: "저축은행중앙회",
  35: "전북은행",
  42: "제주은행",
  15: "카카오뱅크",
  "3A": "케이뱅크",
  24: "토스뱅크",
  21: "하나카드",
  61: "현대카드",
  11: "KB국민카드",
  91: "NH농협카드",
  34: "Sh수협은행",
  "6D": "다이너스 클럽",
  "4M": "마스터카드",
  "3C": "유니온페이",
  "7A": "아메리칸 익스프레스",
  "4J": "JCB",
  "4V": "VISA",
};

function Credit({ shakeCredit, register, setRegister, creditRef }) {
  const user = useSelector((state) => state.user);
  const [showText, setShowText] = useState(false);
  const [brandpay, setBrandpay] = useState(null);
  const [selectedCard, setSelectedCard] = useState({});

  const clientKey = "test_ck_6BYq7GWPVvyRLRDOKx9w3NE5vbo1";
  const customerKey = user.customerKey;

  const toss_openSettings = (e) => {
    e.stopPropagation();

    brandpay.openSettings().catch((error) => {
      console.log(error);
      if (error.code === "USER_CANCEL") toss_getPaymentMethods();
    });
  };

  const toss_addPaymentMethod = () => {
    if (register) return;

    brandpay
      .addPaymentMethod("카드")
      .then(({ selectedMethodId, cards }) => {
        if (!selectedMethodId) return setRegister(false);

        setSelectedCard(
          cards.filter((card) => card.id === selectedMethodId)[0]
        );

        setRegister(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toss_getPaymentMethods = () => {
    brandpay
      .getPaymentMethods()
      .then(({ selectedMethodId, cards }) => {
        if (!selectedMethodId) return setRegister(false);

        setSelectedCard(
          cards.filter((card) => card.id === selectedMethodId)[0]
        );

        setRegister(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toss_loadBrandPay = async () => {
    const brandpay = await loadBrandPay(clientKey, customerKey, {
      redirectUrl: "https://mallangtrip-server.com/api/payment",
      ui: {
        highlightColor: "#3182f6",
        buttonStyle: "default",
        labels: {
          oneTouchPay: "말랑트립 원터치결제",
        },
      },
      windowTarget: "iframe",
    });

    setBrandpay(brandpay);
  };

  useEffect(() => {
    if (!brandpay) toss_loadBrandPay();
    else toss_getPaymentMethods();
  }, [brandpay]);

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
        } w-[304px] h-[196px] bg-skyblue text-primary rounded-2xl mx-auto block focus:outline-none`}
        onClick={toss_addPaymentMethod}
      >
        {register ? (
          <div className="w-full h-full flex flex-col justify-between items-start p-4">
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap-1 text-sm">
                <img
                  src={selectedCard.icons.normal.url}
                  alt={cardCompanyCode[selectedCard.issuerCode]}
                  className="w-6"
                />
                <span>{cardCompanyCode[selectedCard.issuerCode]}</span>
              </div>
              <div
                className="text-xs underline underline-offset-4 cursor-pointer"
                onClick={toss_openSettings}
              >
                결제 수단 관리
              </div>
            </div>
            <div className="flex flex-col gap-1 items-start text-lg font-bold">
              <div className="text-lg font-bold">{`${selectedCard.cardName} ${
                selectedCard.alias && `(${selectedCard.alias})`
              }`}</div>
              <div className="text-base font-medium">
                {selectedCard.cardNumber.match(/.{1,4}/g).join(" ")}
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
