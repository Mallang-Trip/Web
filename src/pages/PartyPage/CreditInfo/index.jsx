import { useEffect, useState } from "react";
import { priceToString, dateToKoreanDataTime } from "../../../utils";

function CreditInfo({
  totalPrice,
  capacity,
  partyStatus,
  paymentAmount,
  createdAt,
}) {
  const [middleCount, setMiddleCount] = useState([]);

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
        <p className="text-lg text-black font-bold">
          예약금 결제
          {(partyStatus === "SEALED" ||
            partyStatus === "WAITING_COURSE_CHANGE_APPROVAL") && (
            <span className="text-sm text-darkgray font-medium">
              {` (${dateToKoreanDataTime(createdAt)} 결제 완료)`}
            </span>
          )}
        </p>
        {partyStatus === "SEALED" ||
        partyStatus === "WAITING_COURSE_CHANGE_APPROVAL" ? (
          <p className="text-sm text-darkgray font-medium flex gap-8 items-center">
            <span>{`${priceToString(paymentAmount)}원`}</span>
            <button
              className="underline underline-offset-2"
              onClick={() => alert("현재는 지원하지 않습니다.")}
            >
              카드 영수증
            </button>
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
    </>
  );
}

export default CreditInfo;
