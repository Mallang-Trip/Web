import React from "react";
import { useParams } from "react-router-dom";
import PartyPlan from "../components/PartyResult/Components/PartyPlan";
import IconBox from "../components/PartyResult/Components/IconBox";
import Vector from "../../src/assets/images/Vector.png";
import PartyBigBox from "../components/PartyResult/Components/PartyBigBox";
import FirstCredit from "../components/PartyResult/Atoms/FirstCredit";
import Period from "../components/PartyResult/Atoms/Period";
import SecondCredit from "../components/PartyResult/Atoms/SecondCredit";
import ToTalCredit from "../components/PartyResult/Atoms/ToTalCredit";
import PlanBox from "../components/PartyResult/Atoms/PlanBox";
import ReservBtn from "../components/Common/ReservBtn";
import PartyNumberBox from "../components/H003EdtPage/Components/PartyNumberBox";
import TravelerBox from "../components/H003EdtPage/Components/TravelerBox";
import TravelerGreet from "../components/H003EdtPage/Atoms/TravelerGreet";
import PlaceInfoBox from "../components/H003EdtPage/Components/PlaceInfoBox";
function H003Edt() {
  const { place } = useParams();

  return (
    <React.Fragment>
      <div className="w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between pl-5 mx-auto overflow-hidden text-[23px] font-bold">
          {place}
        </div>
        <div className="text-gray text-sm pl-5 grid grid-cols-2">
          <p>김제윤 드라이버</p>
          <img src={Vector} />
        </div>
        <div className=" max-w-screen-xl h-[300px] pl-5 pt-[14px]">
          <div>
            <PartyBigBox />
          </div>
          <div className="relative max-w-screen-xl mx-auto pb-4 hidden md:block">
            <IconBox />
          </div>
          <div className="">
            <Period />
            <PartyNumberBox />
            <ToTalCredit />
            <FirstCredit />
            <SecondCredit />
            <TravelerBox />
            <TravelerGreet />
          </div>
          <div>
            <PlaceInfoBox />
          </div>

          <div>
            <ReservBtn title="제안 보내기" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default H003Edt;
