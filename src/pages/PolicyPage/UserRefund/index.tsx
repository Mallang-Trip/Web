import { memo } from "react";
import PageContainer from "../../../components/PageContainer";
import HeadTitle from "../Component/HeadTitle";
import PolicyContainer from "../Component/PolicyContainer";
import BodyContent from "../Component/BodyContent";
import FeeTable from "../../../components/BottomRefundUser/FeeTable";
import refundDiagram from "../../../assets/svg/refund-diagram.svg";

function UserRefund() {
  return (
    <PageContainer>
      <HeadTitle title={"환불 및 위약금 정책(일반회원용)"} />
      <div className="flex flex-col gap-7 text-sm text-darkgray font-medium">
        <img src={refundDiagram} alt="환불 정책" className="w-full" />
        <PolicyContainer>
          <BodyContent title={"말랑레디란?"}>
            말랑레디는 예약한 현재 인원으로 여행 확정하기를 원한다는 의사표시로,
            여행 전체 비용을 1/N로 부담하여 예약을 100% 완전히 확정하는
            단계입니다.
          </BodyContent>
          <BodyContent title={"예약 취소 가능한 경우"}>
            파티원 모두가 말랑레디 버튼을 ON으로 설정하기 전까지 또는 여행자 4명
            모두 합류하기 전까지 자유롭게 예약 및 취소가 가능합니다.
          </BodyContent>
          <BodyContent title={"말랑트립 확정 이후 예약 취소할 경우"}>
            여행자 4명 모두 예약하여 합류했거나 파티원 전원이 말랑레디를 ON으로
            설정한 이후 예약을 취소할 경우 아래와 같은 위약금이 발생할 수
            있습니다. 위약금 기간이 아닐 때 예약 취소할 경우 해당 파티는 자동
            해산됩니다.
          </BodyContent>
          <FeeTable />
          <BodyContent title={"다른 여행자가 예약 취소했을 경우"}>
            위약금 없이 자동으로 환불되며, 다시 파티 모집 상태가 됩니다. 이 때
            파티의 총 금액은 예약 취소자가 지불한 위약금 만큼 저렴해집니다.
          </BodyContent>
        </PolicyContainer>
      </div>
    </PageContainer>
  );
}

export default memo(UserRefund);
