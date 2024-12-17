import { memo, useState } from "react";
import clsx from "clsx";
import FeeTable from "./FeeTable";
import info from "@/assets/svg/more-info-black.svg";
import refundDiagram from "@/assets/svg/refund-diagram.svg";

function BottomRefundUser() {
  const [showRefund, setShowRefund] = useState(false);

  return (
    <div className="w-full sm:w-3/5 mx-auto mt-14">
      <button
        className="flex gap-2 items-center mb-5"
        onClick={() => setShowRefund(!showRefund)}
      >
        <span className="text-lg text-black font-bold">환불 정책</span>
        <img
          src={info}
          alt="자세히 보기"
          className={clsx("transition-transform duration-500", {
            "rotate-180": showRefund,
            "rotate-0": !showRefund,
          })}
        />
      </button>
      <div
        className={clsx(
          "flex flex-col gap-7 text-sm text-darkgray font-medium overflow-hidden transition-all duration-500",
          {
            "max-h-[2000px] opacity-100": showRefund,
            "max-h-0 opacity-0": !showRefund,
          }
        )}
      >
        <img src={refundDiagram} alt="환불 정책" className="w-full" />
        <div>
          <div className="text-primary font-bold mb-1">말랑레디란?</div>
          <div>
            말랑레디는 예약한 현재 인원으로 여행 확정하기를 원한다는 의사표시로,
            <br />
            여행 전체 비용을 1/N로 부담하여 예약을 100% 완전히 확정하는
            단계입니다.
          </div>
        </div>
        <div>
          <div className="text-primary font-bold mb-1">
            무료로 파티 탈퇴 가능할 경우:
          </div>
          <div>
            파티원 모두가 말랑레디 버튼을 ON으로 설정하기 전까지
            <br />
            또는 여행자 4명 모두 합류하기 전까지 자유롭게 예약 및 취소가
            가능합니다.
          </div>
        </div>
        <div>
          <div className="text-primary font-bold mb-1">
            말랑트립 확정 이후 예약 취소할 경우:
          </div>
          <div>
            여행자 4명 모두 예약하여 합류했거나 파티원 전원이 말랑레디를 ON으로
            설정한 이후
            <br />
            예약을 취소할 경우 아래와 같은 위약금이 발생할 수 있습니다.
            <br />
            위약금 기간이 아닐 때 예약 취소할 경우 해당 파티는 자동 해산됩니다.
          </div>
        </div>
        <FeeTable />
        <div>
          <div className="text-primary font-bold mb-1">
            다른 여행자가 예약 취소했을 경우:
          </div>
          <div>
            위약금 없이 자동으로 환불되며, 다시 파티 모집 상태가 됩니다.
            <br />이 때 파티의 총 금액은 예약 취소자가 지불한 위약금 만큼
            저렴해집니다.
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(BottomRefundUser);
