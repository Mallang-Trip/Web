import { useState } from "react";
import { makePhoneNumber } from "../../../../utils";
import { days } from "../../../../utils/data";
import Information from "../../UserProfile/Information";
import RegionModal from "./RegionModal";
import HolidayModal from "./HolidayModal";
import AccountModal from "./AccountModal";

function BasicInfo({ driverInfo, setDriverInfo }) {
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [showHolidayModal, setShowHolidayModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  return (
    <>
      <p className="text-lg font-bold text-black mt-6 mb-5">기본 정보</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Information
          title={"활동 가능 지역"}
          content={driverInfo.region}
          modifyMode={true}
          onClick={() => setShowRegionModal(true)}
        />
        <Information
          title={"정기 휴일"}
          content={
            driverInfo.weeklyHoliday
              .map((item) => {
                const foundDay = days.find((day) => day.eng === item);
                return foundDay ? foundDay.kor : null;
              })
              .join(", ") || "없음"
          }
          modifyMode={true}
          onClick={() => setShowHolidayModal(true)}
        />
        <Information
          title={"입금 계좌"}
          content={`${driverInfo.bank} ${driverInfo.accountNumber}`}
          modifyMode={true}
          onClick={() => setShowAccountModal(true)}
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
      <HolidayModal
        showModal={showHolidayModal}
        setShowModal={setShowHolidayModal}
        driverInfo={driverInfo}
        setDriverInfo={setDriverInfo}
      />
      <AccountModal
        showModal={showAccountModal}
        setShowModal={setShowAccountModal}
        driverInfo={driverInfo}
        setDriverInfo={setDriverInfo}
      />
    </>
  );
}

export default BasicInfo;
