import { memo, useCallback, useEffect, useState } from "react";
import { priceToString, dateToKoreanDataTime } from "../../../utils";
import { postPaymentAgain } from "../../../api/card";
import CheckModal from "../../../components/CheckModal";
import ConfirmModal from "../../../components/ConfirmModal";

interface Props {
  totalPrice: number;
  capacity: number;
  partyStatus?: string;
  paymentAmount?: number;
  createdAt?: string;
  receiptUrl?: string | null;
  status?: string;
  reservationId?: number;
  getPartyData?: () => void;
}

function CreditInfo({
  totalPrice,
  capacity,
  partyStatus,
  paymentAmount,
  createdAt,
  receiptUrl,
  status,
  reservationId,
  getPartyData,
}: Props) {
  const [middleCount, setMiddleCount] = useState<number[]>([]);
  const [showRepaymentModal, setShowRepaymentModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState("");

  const repaymentHandler = useCallback(async () => {
    if (!reservationId || !paymentAmount) return;
    try {
      const result = await postPaymentAgain(reservationId);
      if (result.statusCode === 200)
        setMessage(`${priceToString(paymentAmount)}원 결제가 완료되었습니다.`);
      else setMessage(`${priceToString(paymentAmount)}원 결제에 실패했습니다.`);
    } catch (e) {
      console.log(e);
      setMessage(`${priceToString(paymentAmount)}원 결제에 실패했습니다.`);
    } finally {
      setShowRepaymentModal(false);
      setShowMessageModal(true);
      if (getPartyData) getPartyData();
    }
  }, [reservationId, paymentAmount]);

  useEffect(() => {
    const middle = [];
    for (let i = capacity - 1; i > 1; i--) {
      middle.push(i);
    }
    setMiddleCount(middle);
  }, [capacity]);

  return (
    <>
      <div className="flex flex-col gap-1 mt-7 mb-5">
        <p className="text-lg text-black font-bold flex items-center gap-2">
          예약금 결제
          {(partyStatus === "SEALED" ||
            partyStatus === "WAITING_COURSE_CHANGE_APPROVAL") &&
            (status === "PAYMENT_COMPLETE" ? (
              <span className="text-sm text-darkgray font-medium">
                {`(${dateToKoreanDataTime(createdAt || "")} 결제 완료)`}
              </span>
            ) : (
              <span className="text-sm text-red-500 font-medium">
                결제 실패
              </span>
            ))}
        </p>
        {partyStatus === "SEALED" ||
        partyStatus === "WAITING_COURSE_CHANGE_APPROVAL" ? (
          <p className="text-sm text-darkgray font-medium flex gap-8 items-center">
            <span>{`${priceToString(paymentAmount || 0)}원`}</span>
            {status === "PAYMENT_COMPLETE" && (
              <button
                className="underline underline-offset-2"
                onClick={() => {
                  if (!receiptUrl) return;
                  const newWindow = window.open(
                    receiptUrl,
                    "_blank",
                    "noopener,noreferrer"
                  );
                  if (newWindow) newWindow.opener = null;
                }}
              >
                카드 영수증
              </button>
            )}
            {status === "PAYMENT_FAILED" && (
              <button
                className="underline underline-offset-2 text-red-500"
                onClick={() => setShowRepaymentModal(true)}
              >
                결제 재시도
              </button>
            )}
          </p>
        ) : (
          <p className="text-sm text-darkgray font-medium">{`여행자 ${capacity}명 가입 즉시 또는 파티원 전원 말랑레디 완료 즉시 자동결제`}</p>
        )}
      </div>
      {partyStatus !== "SEALED" &&
        partyStatus !== "WAITING_COURSE_CHANGE_APPROVAL" && (
          <div className="text-sm text-black font-medium">
            <p>
              여행자 <span className="text-primary">{`${capacity}명`}</span>{" "}
              가입 즉시 인당{" "}
              <span className="text-primary">{`${priceToString(
                Math.floor(totalPrice / capacity)
              )}원`}</span>
            </p>
            {middleCount.map((count) => (
              <p key={count}>
                드라이버 + 여행자{" "}
                <span className="text-primary">{`${count}명`}</span> 전원
                말랑레디 완료 즉시 인당{" "}
                <span className="text-primary">{`${priceToString(
                  Math.floor(totalPrice / count)
                )}원`}</span>
              </p>
            ))}
            <p>
              <span className="text-darkgray">독점 예약</span> 또는 드라이버 +
              여행자 <span className="text-primary">1명</span> 전원 말랑레디
              완료 시{" "}
              <span className="text-primary">{`${priceToString(
                totalPrice
              )}원`}</span>
            </p>
          </div>
        )}
      <div className="flex flex-col gap-1 my-7">
        <p className="text-lg text-black font-bold">
          기한 상관 없이 타인이 예약 취소 시
        </p>
        <p className="text-sm text-primary font-medium">
          결제금이 전액 환불되고 다시 파티원 모집 상태로 되돌아갑니다.
        </p>
      </div>
      {status === "PAYMENT_FAILED" && (
        <>
          <CheckModal
            showModal={showRepaymentModal}
            setShowModal={setShowRepaymentModal}
            message={`${priceToString(paymentAmount || 0)}원을 다시 결제 하시겠습니까?`}
            noText="취소"
            yesText="확인"
            yesHandler={() => repaymentHandler()}
          />
          <ConfirmModal
            showModal={showMessageModal}
            setShowModal={setShowMessageModal}
            message={message}
          />
        </>
      )}
    </>
  );
}

export default memo(CreditInfo);
