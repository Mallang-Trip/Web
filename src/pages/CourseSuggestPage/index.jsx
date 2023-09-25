import React from "react";
import { useParams } from "react-router-dom";
import IconBox from "../PartyPage/IconBox";
import Vector from "../../assets/images/Vector.png";
import PartyBigBox from "../PartyPage/PartyBigBox";
import FirstCredit from "../PartyPage/Atoms/FirstCredit";
import Period from "../PartyPage/Atoms/Period";
import SecondCredit from "../PartyPage/Atoms/SecondCredit";
import ToTalCredit from "../PartyPage/Atoms/ToTalCredit";
import ReservBtn from "../../components/ReservBtn";
import PartyNumberBox from "./PartyNumberBox";
import TravelerBox from "./TravelerBox";
import TravelerGreet from "./Atoms/TravelerGreet";
import PlaceInfoBox from "./PlaceInfoBox";
import Detailed from "./Atoms/Detailed";
import Comment from "./Atoms/Comment";
import CommentCom from "./Comment";
import AddComment from "./Atoms/AddComment";
import Credit from "./Atoms/Credit";
import Refund from "../../components/BottomRefund";
import Agreement from "./AddAgree";

function CourseSuggestPage() {
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
        <div className=" max-w-screen-xl h-[300px] pl-5 pt-3">
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
            <AddComment />
          </div>
          <div>
            <Credit />
          </div>
          <div className="">
            <Agreement />
          </div>
          <div>
            <Refund />
          </div>
          <div>
            <ReservBtn title="제안 보내기" />
          </div>
          <div></div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CourseSuggestPage;
