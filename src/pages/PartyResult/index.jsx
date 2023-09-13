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
import ReservBtn from "../../components/ReservBtn";

function PartyResult() {
  const { place } = useParams();

  return (
    <div className="w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between pl-5 mx-auto overflow-hidden text-[23px]">
        {place}
      </div>
      <div className="grid grid-cols-2 pl-5 text-sm text-gray">
        <p>김제윤 드라이버</p>
        <img src={Vector} />
      </div>
      <div className=" max-w-screen-xl h-[300px] pl-5 pt-[14px]">
        <div>
          <PartyBigBox />
        </div>
        <div className="relative hidden max-w-screen-xl pb-4 mx-auto md:block">
          <IconBox />
        </div>
        <div className=" max-w-screen-xl h-[300px] pl-5 pt-[14px]">
          <div>
            <PartyBigBox />
          </div>
          <div className="relative hidden max-w-screen-xl pb-4 mx-auto md:block">
            <IconBox />
          </div>
          <div className="">
            <Period />
            <PartyNumber />
            <ToTalCredit />
            <FirstCredit />
            <SecondCredit />
          </div>
          <div>
            <PartyPlan />
          </div>
          <div>
            <ReservBtn title="예약하기" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartyResult;
