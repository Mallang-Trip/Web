import React from "react";
import { useParams } from "react-router-dom";
import IconBox from "../PartyResult/IconBox";
import Vector from "../../assets/images/Vector.png";
import PartyBigBox from "../PartyResult/PartyBigBox";
import FirstCredit from "../PartyResult/Atoms/FirstCredit";
import Period from "../PartyResult/Atoms/Period";
import SecondCredit from "../PartyResult/Atoms/SecondCredit";
import ToTalCredit from "../PartyResult/Atoms/ToTalCredit";
import ReservBtn from "../../components/ReservBtn";
import PartyNumberBox from "./PartyNumberBox";
import TravelerBox from "./TravelerBox";
import TravelerGreet from "./Atoms/TravelerGreet";
import PlaceInfoBox from "./PlaceInfoBox";
import Detailed from "./Atoms/Detailed";
import Comment from "./Atoms/Comment";
import CommentCom from "./Comment";

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
          <div className="pl-4">
            <Detailed />
            <Comment />
            <CommentCom />
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