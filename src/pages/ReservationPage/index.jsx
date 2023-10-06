import React, { useState } from "react";
import Vector from "../../assets/images/Vector.png";
import { useParams } from "react-router-dom";
import PartyImageBox from "../../components/PartyImageBox";
import PartyNumberBox from "../CourseSuggestPage/PartyNumberBox";
import ToTalCredit from "../PartyPage/Atoms/ToTalCredit";
import FirstCredit from "../../components/FirstCredit";
import SecondCredit from "../../components/SecondCredit";
import TravelerBox from "../CourseSuggestPage/TravelerBox";
import TravelerGreet from "../CourseSuggestPage/Atoms/TravelerGreet";
import PartyPlan from "../../components/PartyPlan";
import Credit from "../../components/Credit";
import Agreement from "../CourseSuggestPage/AddAgree";
import ReservationButton from "./ReservationButton";
import BottomRefund from "../../components/BottomRefund";
import CheckModal from "../../components/CheckModal";

function ReservationPage() {
  const { place } = useParams();
  const [register, setRegister] = useState(false);
  const [shakeCredit, setShakeCredit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const suggestHandler = () => {
    if (register) return setShowModal(true);

    setShakeCredit(true);
    setTimeout(() => setShakeCredit(false), 1000);
  };

  return (
    <div className="px-2 md:px-5 mb-24">
      <div className="text-2xl text-black font-bold mb-2">예약하기</div>
      <div className="text-2xl text-black">{place}</div>
      <div className="text-sm text-darkgray cursor-pointer">
        <span>{`김제윤 드라이버`}</span>
        <img src={Vector} className="inline-block ml-1.5 mt-[2px]" />
      </div>
      <div className="text-sm text-darkgray mt-1">2023년 4월 1일~2일</div>

      <PartyImageBox />
      <div className="mt-7">
        <PartyNumberBox />
      </div>
      <ToTalCredit />
      <FirstCredit />
      <SecondCredit />

      <TravelerBox />
      <TravelerGreet />
      <PartyPlan edit={false} />
      <Credit
        shakeCredit={shakeCredit}
        register={register}
        setRegister={setRegister}
      />
      <Agreement />
      <ReservationButton suggestHandler={suggestHandler} />
      <BottomRefund />

      <CheckModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={
          "예약을 확정하기 위해\n24시간 내로 드라이버와 여행자들의 동의를 구합니다.\n\n전원 동의 즉시 1차 자동결제가 이루어집니다.\n1차 결제금은 [N]원 입니다.\n\n예약하시겠습니까?"
        }
        noText="취소"
        yesText="확인"
        yesHandler={() => alert("예약")}
      />
    </div>
  );
}

export default ReservationPage;
