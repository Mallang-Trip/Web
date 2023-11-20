import Information from "../../UserProfile/Information";
import { makePhoneNumber } from "../../../../utils";
import RegionModal from "./RegionModal";
import { useState } from "react";

function BasicInfo({ modifyMode, driverInfo, setDriverInfo }) {
  const [showRegionModal, setShowRegionModal] = useState(false);

  return (
    <>
      <p className="text-lg font-bold text-black mt-6 mb-5">기본 정보</p>
      <div className="grid grid-cols-2 gap-3">
        <Information
          title={"활동 가능 지역"}
          content={driverInfo.region}
          modifyMode={modifyMode}
          onClick={() => setShowRegionModal(true)}
        />
        <Information
          title={"정기 휴일"}
          content={"토, 일"}
          modifyMode={modifyMode}
        />
        <Information
          title={"입금 계좌"}
          content={`${driverInfo.bank} ${driverInfo.accountNumber}`}
          modifyMode={modifyMode}
        />
        <Information
          title={"전화번호"}
          content={makePhoneNumber(driverInfo.phoneNumber)}
          // modifyMode={modifyMode}
          // onChangeHandler={phoneNumberHandler}
          // 본인 인증 구현되기 전까지 수정 불가 상태로 전환
        />
      </div>

      <RegionModal
        showModal={showRegionModal}
        setShowModal={setShowRegionModal}
        driverInfo={driverInfo}
        setDriverInfo={setDriverInfo}
      />
    </>
  );
}

export default BasicInfo;
