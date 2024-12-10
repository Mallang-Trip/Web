import { memo } from "react";
import { makePhoneNumber } from "../../../../../../utils";
import Information from "../../../../../MyProfilePage/UserProfile/Information";

interface Props {
  region: string[];
  bank: string;
  accountNumber: string;
  phoneNumber: string;
}

function BasicInfo({ region, bank, accountNumber, phoneNumber }: Props) {
  return (
    <>
      <p className="text-lg font-bold text-black mt-6 mb-5">기본 정보</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Information
          title="활동 가능 지역"
          content={region}
          modifyMode={false}
        />
        <Information title="정기 휴일" content="없음" modifyMode={false} />
        <Information
          title="입금 계좌"
          content={`${bank} ${accountNumber}`}
          modifyMode={false}
        />
        <Information
          title="전화번호"
          content={makePhoneNumber(phoneNumber)}
          modifyMode={false}
        />
      </div>
    </>
  );
}

export default memo(BasicInfo);
