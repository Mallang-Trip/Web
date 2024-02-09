import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadBrandPay } from "@tosspayments/brandpay-sdk";
import PlusBtn from "../../assets/svg/PlusBtn.svg";

function Credit({ shakeCredit, register, setRegister, creditRef }) {
  const user = useSelector((state) => state.user);
  const [showText, setShowText] = useState(false);
  const [brandpay, setBrandpay] = useState(undefined);

  const clientKey = "test_ck_6BYq7GWPVvyRLRDOKx9w3NE5vbo1";
  const customerKey = user.customerKey;

  const toss_addPaymentMethod = async () => {
    brandpay
      .requestAgreement("카드") // 자동결제 선택 약관 동의 호출
      .then(function () {
        // 성공 처리
        brandpay
          .addPaymentMethod("카드")
          .then(function (methods) {
            console.log(methods);
          })
          .catch(function (error) {
            console.log(error);
            if (error.code === "USER_CANCEL") {
              // 사용자가 결제창을 닫은 경우 에러 처리
            }
          });
      })
      .catch(function (error) {
        console.log(error);
        if (error.code === "USER_CANCEL") {
          // 사용자가 창을 닫아 취소한 경우에 대한 처리
        }
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

    // brandpay
    //   .requestAgreement("카드") // 자동결제 선택 약관 동의 호출
    //   .then(function () {
    //     // 성공 처리
    //     brandpay
    //       .getPaymentMethods()
    //       .then(function (methods) {
    //         // 성공 처리
    //         console.log(methods);
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //         if (error.code === "USER_CANCEL") {
    //           // 사용자가 결제창을 닫은 경우 에러 처리
    //         }
    //       });
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     if (error.code === "USER_CANCEL") {
    //       // 사용자가 창을 닫아 취소한 경우에 대한 처리
    //     }
    //   });

    setBrandpay(brandpay);
  };

  useEffect(() => {
    toss_loadBrandPay();
  }, []);

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
        onClick={() => toss_addPaymentMethod()}
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
