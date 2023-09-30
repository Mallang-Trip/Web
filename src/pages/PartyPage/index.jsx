import React from "react";
import { useParams } from "react-router-dom";
import PartyPlan from "./PartyPlan";
import IconBox from "./IconBox";
import Vector from "../../assets/images/Vector.png";
import PartyBigBox from "./PartyBigBox";
import FirstCredit from "./Atoms/FirstCredit";
import Period from "./Atoms/Period";
import PartyNumber from "./Atoms/PartyNumber";
import SecondCredit from "./Atoms/SecondCredit";
import ToTalCredit from "./Atoms/ToTalCredit";
import ReservBtn from "./ReservBtn";

function PartyPage() {
  const { place } = useParams();

  return (
    <div className="px-2 md:px-5">
      <div className="text-2xl text-black">{place}</div>
      <span className="text-sm text-darkgray cursor-pointer">
        <span>{`김제윤 드라이버`}</span>
        <img src={Vector} className="inline-block ml-1.5 mt-[2px]" />
      </span>

      <PartyBigBox />
      <IconBox />

      <Period />
      <PartyNumber />
      <ToTalCredit />
      <FirstCredit />
      <SecondCredit />

      <PartyPlan />
      <ReservBtn />
    </div>
  );
}

export default PartyPage;
