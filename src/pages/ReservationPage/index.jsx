import React, { useState } from "react";
import Vector from "../../assets/images/Vector.png";
import { useParams } from "react-router-dom";
import PartyBigBox from "../PartyPage/PartyBigBox";
import PartyNumberBox from "../CourseSuggestPage/PartyNumberBox";
import ToTalCredit from "../PartyPage/Atoms/ToTalCredit";
import FirstCredit from "../PartyPage/Atoms/FirstCredit";
import SecondCredit from "../PartyPage/Atoms/SecondCredit";
import TravelerBox from "../CourseSuggestPage/TravelerBox";
import TravelerGreet from "../CourseSuggestPage/Atoms/TravelerGreet";
import PartyPlan from "../PartyPage/PartyPlan";
import Credit from "../../components/Credit";
import Agreement from "../CourseSuggestPage/AddAgree";
import ReservationButton from "./ReservationButton";
import BottomRefund from "../../components/BottomRefund";

function ReservationPage() {
  const { place } = useParams();
  const [shakeCredit, setShakeCredit] = useState(false);
  const suggestHandler = () => {
    setShakeCredit(true);
    setTimeout(() => setShakeCredit(false), 1000);
  };

  return (
    <div className="px-2 md:px-5">
      <div className="text-2xl text-black font-bold mb-2">예약하기</div>
      <div className="text-2xl text-black">{place}</div>
      <div className="text-sm text-darkgray cursor-pointer">
        <span>{`김제윤 드라이버`}</span>
        <img src={Vector} className="inline-block ml-1.5 mt-[2px]" />
      </div>
      <div className="text-sm text-darkgray mt-1">2023년 4월 1일~2일</div>

      <PartyBigBox />
      <div className="mt-7">
        <PartyNumberBox />
      </div>
      <ToTalCredit />
      <FirstCredit />
      <SecondCredit />

      <TravelerBox />
      <TravelerGreet />
      <PartyPlan edit={false} />
      <Credit shakeCredit={shakeCredit} />
      <Agreement />
      <ReservationButton suggestHandler={suggestHandler} />
      <BottomRefund />
    </div>
  );
}

export default ReservationPage;
