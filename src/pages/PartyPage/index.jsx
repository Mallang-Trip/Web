import React from "react";
import { useParams } from "react-router-dom";
import PartyPlan from "../../components/PartyPlan";
import PartyIconBox from "../../components/PartyIconBox";
import Vector from "../../assets/images/Vector.png";
import PartyImageBox from "../../components/PartyImageBox";
import FirstCredit from "../../components/FirstCredit";
import Period from "./Atoms/Period";
import PartyNumber from "./Atoms/PartyNumber";
import SecondCredit from "../../components/SecondCredit";
import ToTalCredit from "./Atoms/ToTalCredit";
import ReservBtn from "./ReservBtn";

function PartyPage() {
  const { place } = useParams();

  return (
    <div className="px-2 md:px-5 mb-24">
      <div className="text-2xl text-black">{place}</div>
      <span className="text-sm text-darkgray cursor-pointer">
        <span>{`김제윤 드라이버`}</span>
        <img src={Vector} className="inline-block ml-1.5 mt-[2px]" />
      </span>

      <PartyImageBox />
      <PartyIconBox />

      <Period />
      <PartyNumber />
      <ToTalCredit />
      <FirstCredit />
      <SecondCredit />

      <PartyPlan edit={true} />
      <ReservBtn />
    </div>
  );
}

export default PartyPage;
